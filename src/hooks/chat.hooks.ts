"use client";

import { IChatRoom, IMessage } from "@/interface/chat.interface";
import { io, type Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useSendMessage, useStartChat, useChatMessages } from "./useChat";

interface UseChatSocketProps {
  userId?: string;
  userRole?: "user" | "staff" | "admin";
  onNewMessage?: (message: IMessage) => void;
  onRoomCreated?: (room: IChatRoom) => void;
}

export const useChatSocket = ({
  userId,
  userRole = "user",
  onNewMessage,
  onRoomCreated,
}: UseChatSocketProps = {}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<IChatRoom | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const startChatMutation = useStartChat();
  const sendMessageMutation = useSendMessage();
  
  // ✅ SỬA: Sử dụng useChatMessages để fetch tin nhắn
  const { 
    data: messagesResponse, 
    isLoading: messagesLoading,
    refetch: refetchMessages 
  } = useChatMessages(currentRoom?._id || "", !!currentRoom);

  // ✅ SỬA: Cập nhật messages khi có dữ liệu mới từ API
  useEffect(() => {
    if (messagesResponse?.data) {
      setMessages(messagesResponse.data);
    }
  }, [messagesResponse]);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8888",
      {
        transports: ["websocket"],
      }
    );

    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to chat server");
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from chat server");
    });

    socketInstance.on("newMessage", (message: IMessage) => {
      setMessages((prev) => {
        // Tránh duplicate messages
        const exists = prev.find(m => m._id === message._id);
        if (exists) return prev;
        return [...prev, message];
      });
      onNewMessage?.(message);
      
      // ✅ SỬA: Refetch messages sau khi nhận tin nhắn mới
      refetchMessages();
    });

    socketInstance.on("roomCreated", (room: IChatRoom) => {
      setCurrentRoom(room);
      onRoomCreated?.(room);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [onNewMessage, onRoomCreated, refetchMessages]);

  // ✅ SỬA: Kiểm tra existing room khi component mount
  useEffect(() => {
    const checkExistingRoom = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        // Thử lấy room hiện tại của user
        const response = await fetch("/api/chat/user/current-room", {
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setCurrentRoom(data.data);
            console.log("Found existing room:", data.data._id);
          }
        }
      } catch  {
        console.log("No existing room found");
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingRoom();
  }, [userId]);

  // Join room when room is set
  useEffect(() => {
    if (socket && currentRoom?._id) {
      socket.emit("joinRoom", currentRoom._id);
      console.log("Joined room:", currentRoom._id);
    }
  }, [socket, currentRoom]);

  // Start chat (create room)
  const startChat = async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const response = await startChatMutation.mutateAsync({ message });
      const { room, newMessage } = response.data;

      setCurrentRoom(room);
      setMessages([newMessage]);

      // Join the new room via socket
      if (socket) {
        socket.emit("joinRoom", room._id);
      }
      
      // ✅ SỬA: Lưu room ID vào localStorage để persistent
      localStorage.setItem("currentChatRoom", room._id);
      
    } catch (error) {
      console.error("Failed to start chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim() || !currentRoom) return;
    
    setIsSending(true);
    try {
      const payload = {
        roomId: currentRoom._id,
        content,
      };

      // Optimistic update
      const tempMessage: IMessage = {
        _id: `temp-${Date.now()}`,
        room: currentRoom._id,
        content,
        sender: userId || "unknown",
        senderType: userRole === 'user' ? 'user' : 'staff',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, tempMessage]);

      // Send via socket for real-time
      if (socket) {
        socket.emit("sendMessage", payload);
      }

      // Send via API for persistence
      await sendMessageMutation.mutateAsync(payload);
      
      // ✅ SỬA: Refetch messages sau khi gửi
      setTimeout(() => {
        refetchMessages();
      }, 1000);
      
    } catch (error) {
      console.error("Failed to send message:", error);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => !msg._id.startsWith("temp-")));
    } finally {
      setIsSending(false);
    }
  };

  return {
    socket,
    isConnected,
    currentRoom,
    messages,
    isLoading: isLoading || messagesLoading,
    isSending,
    startChat,
    sendMessage,
    setCurrentRoom,
    setMessages,
    refetchMessages,
  };
};