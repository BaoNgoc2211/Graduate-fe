// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import {
//   getUnassignedRooms,
//   getMessages,
//   startChat,
//   sendMessage,
//   sendPrescriptionWithAxios,
//   updatePrescription,
// } from "@/api/chat/chat.api"
// import type {
//   IChatRoom,
//   IMessage,
//   IStartChatPayload,
//   ISendMessagePayload,
//   IStartChatResponse,
//   ISendPrescriptionPayload,
//   IUpdatePrescriptionPayload,
//   IPrescriptionResponse,
// } from "@/interface/auth/chat.interface"
// import { toast } from "sonner"

// // Lấy danh sách phòng chưa gán staff
// export const useUnassignedChatRooms = () => {
//   return useQuery<{ data: IChatRoom[] }>({
//     queryKey: ["chat-rooms-unassigned"],
//     queryFn: getUnassignedRooms,
//     refetchInterval: 30000, // Refetch every 30 seconds
//   })
// }

// // Lấy tin nhắn trong room
// export const useChatMessages = (roomId: string) => {
//   return useQuery<{ data: IMessage[] }>({
//     queryKey: ["chat-messages", roomId],
//     queryFn: () => getMessages(roomId),
//     enabled: !!roomId,
//     refetchInterval: 5000, // Optional: polling mỗi 5s
//   })
// }

// // Bắt đầu cuộc trò chuyện (user)
// export const useStartChat = () => {
//   const queryClient = useQueryClient()

//   return useMutation<{ data: IStartChatResponse }, Error, IStartChatPayload>({
//     mutationFn: (payload: IStartChatPayload) => startChat(payload),
//     onSuccess: (response) => {
//       // Invalidate unassigned rooms to refresh the list
//       queryClient.invalidateQueries({
//         queryKey: ["chat-rooms-unassigned"],
//       })

//       // Set the new messages in cache
//       queryClient.setQueryData(["chat-messages", response.data.room._id], { 
//         data: [response.data.newMessage] 
//       })
//     },
//     onError: (error) => {
//       console.error("Start chat error:", error)
//       toast.error("Failed to start chat")
//     },
//   })
// }

// // Gửi tin nhắn (admin hoặc staff)
// export const useSendMessage = () => {
//   const queryClient = useQueryClient()

//   return useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
//     mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
//     onSuccess: (response: { data: IMessage }, variables: ISendMessagePayload) => {
//       // Refetch tin nhắn khi gửi thành công
//       queryClient.invalidateQueries({
//         queryKey: ["chat-messages", variables.roomId],
//       })

//       // Also invalidate unassigned rooms to update lastMessage
//       queryClient.invalidateQueries({
//         queryKey: ["chat-rooms-unassigned"],
//       })
//     },
//     onError: (error) => {
//       console.error("Send message error:", error)
//       toast.error("Failed to send message")
//     },
//   })
// }

// // Hook for prescription upload
// export const useSendPrescription = () => {
//   const queryClient = useQueryClient()

//   return useMutation<{ data: IPrescriptionResponse }, Error, ISendPrescriptionPayload>({
//     mutationFn: (payload: ISendPrescriptionPayload) => sendPrescriptionWithAxios(payload),
//     onSuccess: (response, variables) => {
//       toast.success("Prescription uploaded successfully!")
      
//       // Invalidate messages for the room
//       queryClient.invalidateQueries({
//         queryKey: ["chat-messages", variables.roomId],
//       })

//       // Also invalidate unassigned rooms
//       queryClient.invalidateQueries({
//         queryKey: ["chat-rooms-unassigned"],
//       })
//     },
//     onError: (error: any) => {
//       console.error("Prescription upload error:", error)
//       const errorMessage = error?.response?.data?.message || "Failed to upload prescription"
//       toast.error(errorMessage)
//     },
//   })
// }

// export const useChatWithPrescription = (roomId: string) => {
//   const queryClient = useQueryClient()

//   const messagesQuery = useQuery<{ data: IMessage[] }>({
//     queryKey: ["chat-messages", roomId], // Use same key as other hooks
//     queryFn: () => getMessages(roomId),
//     enabled: !!roomId,
//     refetchInterval: 5000,
//     staleTime: 1000, // Consider data fresh for 1 second
//   })

//   const sendMessageMutation = useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
//     mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
//     onSuccess: (response: { data: IMessage }, variables: ISendMessagePayload) => {
//       // Only invalidate the specific room's messages
//       queryClient.invalidateQueries({
//         queryKey: ["chat-messages", variables.roomId],
//         exact: true,
//       })
//     },
//     onError: (error) => {
//       console.error("Send message error:", error)
//       toast.error("Failed to send message")
//     },
//   })

//   // Send prescription mutation
//   const sendPrescriptionMutation = useMutation({
//     mutationFn: (data: ISendPrescriptionPayload) => sendPrescriptionWithAxios(data),
//     onSuccess: (response: any, variables: ISendPrescriptionPayload) => {
//       toast.success("Gửi đơn thuốc thành công!")
//       queryClient.invalidateQueries({
//         queryKey: ["chat-messages", variables.roomId],
//         exact: true,
//       })
//     },
//     onError: (err: any) => {
//       console.error("Prescription upload error:", err)
//       toast.error(err?.response?.data?.message || "Gửi đơn thuốc thất bại")
//     },
//   })

//   // Update prescription mutation
//   const updatePrescriptionMutation = useMutation({
//     mutationFn: (data: IUpdatePrescriptionPayload) => updatePrescription(data),
//     onSuccess: (response: any, variables: IUpdatePrescriptionPayload) => {
//       toast.success("Cập nhật đơn thuốc thành công!")
//       queryClient.invalidateQueries({
//         queryKey: ["chat-messages", variables.roomId],
//         exact: true,
//       })
//     },
//     onError: (err: any) => {
//       console.error("Update prescription error:", err)
//       toast.error(err?.response?.data?.message || "Cập nhật thất bại")
//     },
//   })

//   return {
//     messagesQuery,
//     sendMessageMutation,
//     sendPrescriptionMutation,
//     updatePrescriptionMutation,
//   }
// }
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getUnassignedRooms,
  getMessages,
  startChat,
  sendMessage,
  sendPrescriptionWithAxios,
  updatePrescription,
} from "@/api/chat/chat.api"
import type {
  IChatRoom,
  IMessage,
  IStartChatPayload,
  ISendMessagePayload,
  IStartChatResponse,
  ISendPrescriptionPayload,
  IUpdatePrescriptionPayload,
  IPrescriptionResponse,
} from "@/interface/auth/chat.interface"
import { toast } from "sonner"

// Error types for better type safety
interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

// Lấy danh sách phòng chưa gán staff
export const useUnassignedChatRooms = () => {
  return useQuery<{ data: IChatRoom[] }>({
    queryKey: ["chat-rooms-unassigned"],
    queryFn: getUnassignedRooms,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

// Lấy tin nhắn trong room
export const useChatMessages = (roomId: string) => {
  return useQuery<{ data: IMessage[] }>({
    queryKey: ["chat-messages", roomId],
    queryFn: () => getMessages(roomId),
    enabled: !!roomId,
    refetchInterval: 5000, // Optional: polling mỗi 5s
  })
}

// Bắt đầu cuộc trò chuyện (user)
export const useStartChat = () => {
  const queryClient = useQueryClient()

  return useMutation<{ data: IStartChatResponse }, Error, IStartChatPayload>({
    mutationFn: (payload: IStartChatPayload) => startChat(payload),
    onSuccess: (response) => {
      // Invalidate unassigned rooms to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      })

      // Set the new messages in cache
      queryClient.setQueryData(["chat-messages", response.data.room._id], { 
        data: [response.data.newMessage] 
      })
    },
    onError: (error) => {
      console.error("Start chat error:", error)
      toast.error("Failed to start chat")
    },
  })
}

// Gửi tin nhắn (admin hoặc staff)
export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
    mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
    onSuccess: (response: { data: IMessage }, variables: ISendMessagePayload) => {
      // Refetch tin nhắn khi gửi thành công
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
      })

      // Also invalidate unassigned rooms to update lastMessage
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      })
    },
    onError: (error) => {
      console.error("Send message error:", error)
      toast.error("Failed to send message")
    },
  })
}

// Hook for prescription upload
export const useSendPrescription = () => {
  const queryClient = useQueryClient()

  return useMutation<{ data: IPrescriptionResponse }, Error, ISendPrescriptionPayload>({
    mutationFn: (payload: ISendPrescriptionPayload) => sendPrescriptionWithAxios(payload),
    onSuccess: (response, variables) => {
      toast.success("Prescription uploaded successfully!")
      
      // Invalidate messages for the room
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
      })

      // Also invalidate unassigned rooms
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      })
    },
    onError: (error: ApiError) => {
      console.error("Prescription upload error:", error)
      const errorMessage = error?.response?.data?.message || "Failed to upload prescription"
      toast.error(errorMessage)
    },
  })
}

export const useChatWithPrescription = (roomId: string) => {
  const queryClient = useQueryClient()

  const messagesQuery = useQuery<{ data: IMessage[] }>({
    queryKey: ["chat-messages", roomId], // Use same key as other hooks
    queryFn: () => getMessages(roomId),
    enabled: !!roomId,
    refetchInterval: 5000,
    staleTime: 1000, // Consider data fresh for 1 second
  })

  const sendMessageMutation = useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
    mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
    onSuccess: (response: { data: IMessage }, variables: ISendMessagePayload) => {
      // Only invalidate the specific room's messages
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
        exact: true,
      })
    },
    onError: (error) => {
      console.error("Send message error:", error)
      toast.error("Failed to send message")
    },
  })

  // Send prescription mutation
  const sendPrescriptionMutation = useMutation<{ data: IPrescriptionResponse }, ApiError, ISendPrescriptionPayload>({
    mutationFn: (data: ISendPrescriptionPayload) => sendPrescriptionWithAxios(data),
    onSuccess: (response: { data: IPrescriptionResponse }, variables: ISendPrescriptionPayload) => {
      toast.success("Gửi đơn thuốc thành công!")
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
        exact: true,
      })
    },
    onError: (err: ApiError) => {
      console.error("Prescription upload error:", err)
      toast.error(err?.response?.data?.message || "Gửi đơn thuốc thất bại")
    },
  })

  // Update prescription mutation
  const updatePrescriptionMutation = useMutation<{ data: { message: string } }, ApiError, IUpdatePrescriptionPayload>({
    mutationFn: (data: IUpdatePrescriptionPayload) => updatePrescription(data),
    onSuccess: (response: { data: { message: string } }, variables: IUpdatePrescriptionPayload) => {
      toast.success("Cập nhật đơn thuốc thành công!")
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
        exact: true,
      })
    },
    onError: (err: ApiError) => {
      console.error("Update prescription error:", err)
      toast.error(err?.response?.data?.message || "Cập nhật thất bại")
    },
  })

  return {
    messagesQuery,
    sendMessageMutation,
    sendPrescriptionMutation,
    updatePrescriptionMutation,
  }
}