// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   getUnassignedRooms,
//   getMessages,
//   startChat,
//   sendMessage,
//   sendPrescriptionWithAxios,
//   updatePrescription,
// } from "@/api/chat/chat.api";
// import type {
//   IChatRoom,
//   IMessage,
//   IStartChatPayload,
//   ISendMessagePayload,
//   IStartChatResponse,
//   ISendPrescriptionPayload,
//   IUpdatePrescriptionPayload,
// } from "@/interface/auth/chat.interface";
// import { toast } from "sonner";

// // Lấy danh sách phòng chưa gán staff với enhanced caching
// export const useUnassignedChatRooms = () => {
//   return useQuery<{ data: IChatRoom[] }>({
//     queryKey: ["chat-rooms-unassigned"],
//     queryFn: getUnassignedRooms,
//     refetchInterval: 10000, // Refetch every 10 seconds (reduced from 30s)
//     staleTime: 5000, // Consider data stale after 5 seconds
//     gcTime: 300000, // Keep in cache for 5 minutes
//     retry: 3,
//     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
//   });
// };

// // Lấy tin nhắn trong room với optimized polling
// export const useChatMessages = (roomId: string) => {
//   return useQuery<{ data: IMessage[] }>({
//     queryKey: ["chat-messages", roomId],
//     queryFn: () => getMessages(roomId),
//     enabled: !!roomId,
//     refetchInterval: (data) => {
//       // Adaptive polling: faster when there are recent messages
//       if (!data) return 5000;

//       const latestMessage = data.data?.[data.data.length - 1];
//       if (!latestMessage) return 5000;

//       const messageAge =
//         Date.now() - new Date(latestMessage.createdAt).getTime();

//       // If latest message is less than 1 minute old, poll every 2 seconds
//       if (messageAge < 60000) return 2000;
//       // If latest message is less than 5 minutes old, poll every 5 seconds
//       if (messageAge < 300000) return 5000;
//       // Otherwise, poll every 10 seconds
//       return 10000;
//     },
//     staleTime: 1000, // Consider data stale after 1 second for real-time feel
//     gcTime: 600000, // Keep messages in cache for 10 minutes
//     retry: 2,
//   });
// };

// // Bắt đầu cuộc trò chuyện (user) với optimistic updates
// export const useStartChat = () => {
//   const queryClient = useQueryClient();

//   return useMutation<{ data: IStartChatResponse }, Error, IStartChatPayload>({
//     mutationFn: (payload: IStartChatPayload) => startChat(payload),
//     onMutate: async (newChat) => {
//       // Cancel any outgoing refetches
//       await queryClient.cancelQueries({ queryKey: ["chat-rooms-unassigned"] });

//       // Snapshot the previous value
//       const previousRooms = queryClient.getQueryData(["chat-rooms-unassigned"]);

//       // Optimistically update with a temporary room
//       const tempRoom: IChatRoom = {
//         _id: `temp-${Date.now()}`,
//         user: "Cuộc trò chuyện mới",
//         isHandled: false,
//         status: "open",
//         lastMessage: newChat.message,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       queryClient.setQueryData(["chat-rooms-unassigned"], (old: any) => ({
//         data: [tempRoom, ...(old?.data || [])],
//       }));

//       return { previousRooms };
//     },
//     onError: (err, newChat, context) => {
//       // Rollback on error
//       if (context?.previousRooms) {
//         queryClient.setQueryData(
//           ["chat-rooms-unassigned"],
//           context.previousRooms
//         );
//       }
//       toast.error("Không thể bắt đầu cuộc trò chuyện");
//     },
//     onSuccess: (response) => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({
//         queryKey: ["chat-rooms-unassigned"],
//       });

//       // Set the new messages in cache
//       queryClient.setQueryData(["chat-messages", response.data.room._id], {
//         data: [response.data.newMessage],
//       });

//       toast.success("Đã bắt đầu cuộc trò chuyện mới");
//     },
//   });
// };

// // Gửi tin nhắn (admin hoặc staff) với optimistic updates
// export const useSendMessage = () => {
//   const queryClient = useQueryClient();

//   return useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
//     mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
//     onMutate: async (newMessage) => {
//       const queryKey = ["chat-messages", newMessage.roomId];

//       // Cancel any outgoing refetches
//       await queryClient.cancelQueries({ queryKey });

//       // Snapshot the previous value
//       const previousMessages = queryClient.getQueryData(queryKey);

//       // Create optimistic message
//       const optimisticMessage: IMessage = {
//         _id: `temp-${Date.now()}`,
//         room: newMessage.roomId,
//         content: newMessage.content,
//         sender: newMessage.senderId,
//         senderType: "staff", // Assuming staff is sending
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       // Optimistically update
//       queryClient.setQueryData(queryKey, (old: any) => ({
//         data: [...(old?.data || []), optimisticMessage],
//       }));

//       return { previousMessages, optimisticMessage };
//     },
//     onError: (err, newMessage, context) => {
//       // Rollback on error
//       if (context?.previousMessages) {
//         queryClient.setQueryData(
//           ["chat-messages", newMessage.roomId],
//           context.previousMessages
//         );
//       }
//       toast.error("Không thể gửi tin nhắn");
//     },
//     onSuccess: (response, variables, context) => {
//       const queryKey = ["chat-messages", variables.roomId];

//       // Replace optimistic message with real one
//       queryClient.setQueryData(queryKey, (old: any) => {
//         if (!old?.data) return { data: [response.data] };

//         return {
//           data: old.data.map((msg: IMessage) =>
//             msg._id === context?.optimisticMessage._id ? response.data : msg
//           ),
//         };
//       });

//       // Update unassigned rooms to reflect last message
//       queryClient.invalidateQueries({
//         queryKey: ["chat-rooms-unassigned"],
//       });
//     },
//   });
// };

// // Enhanced prescription chat hook với better error handling
// export const useChatWithPrescription = (roomId: string) => {
//   const queryClient = useQueryClient();

//   // Messages query với enhanced options
//   const messagesQuery = useQuery<{ data: IMessage[] }>({
//     queryKey: ["messages", roomId],
//     queryFn: () => getMessages(roomId),
//     enabled: !!roomId,
//     refetchInterval: 3000,
//     staleTime: 1000,
//     retry: 2,
//     onError: () => {
//       toast.error("Không thể tải tin nhắn");
//     },
//   });

//   // Send message mutation
//   const sendMessageMutation = useMutation<
//     { data: IMessage },
//     Error,
//     ISendMessagePayload
//   >({
//     mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
//       toast.success("Đã gửi tin nhắn");
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message || "Không thể gửi tin nhắn");
//     },
//   });

//   // Send prescription mutation với progress tracking
//   const sendPrescriptionMutation = useMutation({
//     mutationFn: (data: ISendPrescriptionPayload) =>
//       sendPrescriptionWithAxios(data),
//     onMutate: () => {
//       toast.loading("Đang upload đơn thuốc...", { id: "prescription-upload" });
//     },
//     onSuccess: () => {
//       toast.success("Gửi đơn thuốc thành công!", { id: "prescription-upload" });
//       queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
//     },
//     onError: (err: any) => {
//       toast.error(err?.response?.data?.message || "Gửi đơn thuốc thất bại", {
//         id: "prescription-upload",
//       });
//     },
//   });

//   // Update prescription mutation
//   const updatePrescriptionMutation = useMutation({
//     mutationFn: (data: IUpdatePrescriptionPayload) => updatePrescription(data),
//     onMutate: () => {
//       toast.loading("Đang cập nhật đơn thuốc...", {
//         id: "prescription-update",
//       });
//     },
//     onSuccess: () => {
//       toast.success("Cập nhật đơn thuốc thành công!", {
//         id: "prescription-update",
//       });
//       queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
//     },
//     onError: (err: any) => {
//       toast.error(err?.response?.data?.message || "Cập nhật thất bại", {
//         id: "prescription-update",
//       });
//     },
//   });

//   return {
//     messagesQuery,
//     sendMessageMutation,
//     sendPrescriptionMutation,
//     updatePrescriptionMutation,
//   };
// };

// // New hook for real-time message count
// export const useUnreadMessageCount = (userId: string) => {
//   return useQuery({
//     queryKey: ["unread-count", userId],
//     queryFn: async () => {
//       // Implement API call to get unread count
//       // For now, return 0
//       return { count: 0 };
//     },
//     refetchInterval: 5000,
//     enabled: !!userId,
//   });
// };

// // New hook for typing indicators
// export const useTypingIndicator = (roomId: string) => {
//   const queryClient = useQueryClient();

//   const setTyping = (isTyping: boolean, userId: string) => {
//     queryClient.setQueryData(["typing", roomId], (old: any) => {
//       const current = old || {};
//       if (isTyping) {
//         return { ...current, [userId]: Date.now() };
//       } else {
//         const { [userId]: removed, ...rest } = current;
//         return rest;
//       }
//     });
//   };

//   const typingUsers =
//     (queryClient.getQueryData(["typing", roomId]) as Record<string, number>) ||
//     {};

//   // Filter out old typing indicators (older than 3 seconds)
//   const activeTypingUsers = Object.entries(typingUsers)
//     .filter(([_, timestamp]) => Date.now() - timestamp < 3000)
//     .map(([userId]) => userId);

//   return {
//     setTyping,
//     typingUsers: activeTypingUsers,
//     isAnyoneTyping: activeTypingUsers.length > 0,
//   };
// };
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
} from "@/interface/auth/chat.interface"
import { toast } from "sonner"

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
      queryClient.setQueryData(["chat-messages", response.data.room._id], { data: [response.data.newMessage] })
    },
  })
}

// Gửi tin nhắn (admin hoặc staff)
export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
    mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
    onSuccess: (response: { data: IMessage }, variables: ISendMessagePayload) => {
      // Properly typed parameters
      // Refetch tin nhắn khi gửi thành công
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
      })

      // Also invalidate unassigned rooms to update lastMessage
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      })
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
      // Properly typed parameters
      // Only invalidate the specific room's messages
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
        exact: true,
      })
    },
  })

  // Send prescription mutation
  const sendPrescriptionMutation = useMutation({
    mutationFn: (data: ISendPrescriptionPayload) => sendPrescriptionWithAxios(data),
    onSuccess: (response: unknown, variables: ISendPrescriptionPayload) => {
      // Properly typed parameters
      toast.success("Gửi đơn thuốc thành công!")
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
        exact: true,
      })
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      // Properly typed error
      toast.error(err?.response?.data?.message || "Gửi đơn thuốc thất bại")
    },
  })

  // Update prescription mutation
  const updatePrescriptionMutation = useMutation({
    mutationFn: (data: IUpdatePrescriptionPayload) => updatePrescription(data),
    onSuccess: (response: unknown, variables: IUpdatePrescriptionPayload) => {
      // Properly typed parameters
      toast.success("Cập nhật đơn thuốc thành công!")
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
        exact: true,
      })
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      // Properly typed error
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
