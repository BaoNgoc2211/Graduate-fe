"use client"

import { IChatRoom, IMessage } from "@/interface/chat.interface"
import { io, type Socket } from "socket.io-client"
import { useEffect, useState } from "react"
import { useSendMessage, useStartChat } from "./useChat"

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

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8888", {
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

    socketInstance.on("newMessage", (message: IMessage) => {
      setMessages((prev) => [...prev, message])
      onNewMessage?.(message)
    })

    socketInstance.on("roomCreated", (room: IChatRoom) => {
      setCurrentRoom(room)
      onRoomCreated?.(room)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [onNewMessage, onRoomCreated])

  // Join room when room is set
  useEffect(() => {
    if (socket && currentRoom?._id) {
      socket.emit("joinRoom", currentRoom._id)
    }
  }, [socket, currentRoom])

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
