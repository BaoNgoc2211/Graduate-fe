// "use client";

// import { useEffect, useState, useCallback, useRef } from "react";
// import { io, type Socket } from "socket.io-client";
// import type { IMessage, IChatRoom } from "@/interface/auth/chat.interface";
// import { useSendMessage, useStartChat, useChatMessages } from "./useChat.hooks";

// interface UseChatSocketProps {
//   userId?: string;
//   onNewMessage?: (message: IMessage) => void;
//   onRoomCreated?: (room: IChatRoom) => void;
// }

// export const useChatSocket = ({
//   userId,
//   onNewMessage,
//   onRoomCreated,
// }: UseChatSocketProps = {}) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoom, setCurrentRoom] = useState<IChatRoom | null>(null);
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   // Ref để theo dõi polling interval
//   const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   const startChatMutation = useStartChat();
//   const sendMessageMutation = useSendMessage();

//   // Sử dụng API query để get messages với polling
//   const { data: messagesData, refetch: refetchMessages } = useChatMessages(
//     currentRoom?._id || ""
//   );

//   // Initialize socket connection
//   useEffect(() => {
//     const socketInstance = io(
//       process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8888",
//       {
//         transports: ["websocket"],
//         reconnection: true,
//         reconnectionDelay: 1000,
//         reconnectionAttempts: 5,
//         timeout: 20000,
//       }
//     );

//     socketInstance.on("connect", () => {
//       setIsConnected(true);
//       console.log("Connected to chat server");
//     });

//     socketInstance.on("disconnect", () => {
//       setIsConnected(false);
//       console.log("Disconnected from chat server");
//     });

//     socketInstance.on("newMessage", (message: IMessage) => {
//       setMessages((prev) => {
//         // Tránh duplicate messages
//         const exists = prev.find((msg) => msg._id === message._id);
//         if (exists) return prev;
//         return [...prev, message];
//       });
//       onNewMessage?.(message);
//     });

//     socketInstance.on("roomCreated", (room: IChatRoom) => {
//       setCurrentRoom(room);
//       onRoomCreated?.(room);
//     });

//     // Handle reconnection
//     socketInstance.on("reconnect", () => {
//       console.log("Reconnected to chat server");
//       if (currentRoom?._id) {
//         socketInstance.emit("joinRoom", currentRoom._id);
//       }
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   // Update messages from API data
//   useEffect(() => {
//     if (messagesData?.data) {
//       setMessages(messagesData.data);
//     }
//   }, [messagesData]);

//   // Setup polling cho messages khi có room
//   useEffect(() => {
//     if (currentRoom?._id && isConnected) {
//       // Clear existing interval
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current);
//       }

//       // Setup new polling interval
//       pollingIntervalRef.current = setInterval(() => {
//         refetchMessages();
//       }, 3000); // Poll every 3 seconds
//     } else {
//       // Clear polling when no room or disconnected
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current);
//         pollingIntervalRef.current = null;
//       }
//     }

//     return () => {
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current);
//       }
//     };
//   }, [currentRoom?._id, isConnected, refetchMessages]);

//   // Join room when room is set
//   useEffect(() => {
//     if (socket && currentRoom?._id) {
//       socket.emit("joinRoom", currentRoom._id);
//     }
//   }, [socket, currentRoom]);

//   // Start chat (create room)
//   const startChat = useCallback(
//     async (message: string) => {
//       if (!message.trim()) return;

//       setIsLoading(true);
//       try {
//         const response = await startChatMutation.mutateAsync({ message });
//         const { room, newMessage } = response.data;

//         setCurrentRoom(room);
//         setMessages([newMessage]);

//         // Join the new room via socket
//         if (socket) {
//           socket.emit("joinRoom", room._id);
//         }

//         return response;
//       } catch (error) {
//         console.error("Failed to start chat:", error);
//         throw error;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [startChatMutation, socket]
//   );

//   // Send message
//   const sendMessage = useCallback(
//     async (content: string) => {
//       if (!content.trim() || !currentRoom || !userId) return;

//       setIsSending(true);
//       try {
//         const payload = {
//           roomId: currentRoom._id,
//           content,
//           senderId: userId,
//         };

//         // Optimistically add message to UI
//         const tempMessage: IMessage = {
//           _id: `temp-${Date.now()}`,
//           room: currentRoom._id,
//           content,
//           sender: userId,
//           senderType: "user" as const,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         };

//         setMessages((prev) => [...prev, tempMessage]);

//         // Send via socket for real-time
//         if (socket && isConnected) {
//           socket.emit("sendMessage", payload);
//         }

//         // Also send via API for persistence
//         const result = await sendMessageMutation.mutateAsync(payload);

//         // Remove temp message and add real one
//         setMessages((prev) =>
//           prev.filter((msg) => !msg._id.startsWith("temp-")).concat(result.data)
//         );

//         return result;
//       } catch (error) {
//         console.error("Failed to send message:", error);
//         // Remove optimistic message on error
//         setMessages((prev) =>
//           prev.filter((msg) => !msg._id.startsWith("temp-"))
//         );
//         throw error;
//       } finally {
//         setIsSending(false);
//       }
//     },
//     [currentRoom, userId, socket, isConnected, sendMessageMutation]
//   );

//   // Load more messages (cho pagination)
//   const loadMoreMessages = useCallback(
//     async (before?: string) => {
//       if (!currentRoom?._id) return;

//       try {
//         // Implement pagination API call here if needed
//         // const olderMessages = await getMessagesWithPagination(currentRoom._id, { before })
//         // setMessages(prev => [...olderMessages.data, ...prev])
//       } catch (error) {
//         console.error("Failed to load more messages:", error);
//       }
//     },
//     [currentRoom]
//   );

//   // Manual refresh messages
//   const refreshMessages = useCallback(() => {
//     if (currentRoom?._id) {
//       refetchMessages();
//     }
//   }, [currentRoom, refetchMessages]);

//   return {
//     socket,
//     isConnected,
//     currentRoom,
//     messages,
//     isLoading,
//     isSending,
//     startChat,
//     sendMessage,
//     loadMoreMessages,
//     refreshMessages,
//     setCurrentRoom,
//     setMessages,
//   };
// };
"use client"

import { useEffect, useState, useCallback } from "react"
import { io, type Socket } from "socket.io-client"
import { useStartChat, useSendMessage }from "./useChat.hooks"
import type { IMessage, IChatRoom } from "@/interface/auth/chat.interface"

interface UseChatSocketProps {
  userId?: string
  onNewMessage?: (message: IMessage) => void
  onRoomCreated?: (room: IChatRoom) => void
}

export const useChatSocket = ({ userId, onNewMessage, onRoomCreated }: UseChatSocketProps = {}) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [currentRoom, setCurrentRoom] = useState<IChatRoom | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const startChatMutation = useStartChat()
  const sendMessageMutation = useSendMessage()

  const handleNewMessage = useCallback(
    (message: IMessage) => {
      setMessages((prev) => [...prev, message])
      onNewMessage?.(message)
    },
    [onNewMessage],
  )

  const handleRoomCreated = useCallback(
    (room: IChatRoom) => {
      setCurrentRoom(room)
      onRoomCreated?.(room)
    },
    [onRoomCreated],
  )

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      transports: ["websocket"],
    })

    socketInstance.on("connect", () => {
      setIsConnected(true)
      console.log("Connected to chat server")
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from chat server")
    })

    socketInstance.on("newMessage", handleNewMessage)
    socketInstance.on("roomCreated", handleRoomCreated)

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [handleNewMessage, handleRoomCreated]) // Added proper dependencies

  // Join room when room is set
  useEffect(() => {
    if (socket && currentRoom?._id) {
      socket.emit("joinRoom", currentRoom._id)
    }
  }, [socket, currentRoom?._id]) // Added currentRoom._id dependency

  // Start chat (create room)
  const startChat = async (message: string) => {
    if (!message.trim()) return

    setIsLoading(true)
    try {
      const response = await startChatMutation.mutateAsync({ message })
      const { room, newMessage } = response.data

      setCurrentRoom(room)
      setMessages([newMessage])

      // Join the new room via socket
      if (socket) {
        socket.emit("joinRoom", room._id)
      }
    } catch (error) {
      console.error("Failed to start chat:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim() || !currentRoom || !userId) return

    setIsSending(true)
    try {
      const payload = {
        roomId: currentRoom._id,
        content,
        senderId: userId,
      }

      // Optimistically add message to UI
      const tempMessage: IMessage = {
        _id: `temp-${Date.now()}`,
        room: currentRoom._id,
        content,
        sender: userId,
        senderType: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, tempMessage])

      // Send via socket for real-time
      if (socket) {
        socket.emit("sendMessage", payload)
      }

      // Also send via API for persistence
      await sendMessageMutation.mutateAsync(payload)
    } catch (error) {
      console.error("Failed to send message:", error)
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => !msg._id.startsWith("temp-")))
    } finally {
      setIsSending(false)
    }
  }

  return {
    socket,
    isConnected,
    currentRoom,
    messages,
    isLoading,
    isSending,
    startChat,
    sendMessage,
    setCurrentRoom,
    setMessages,
  }
}
