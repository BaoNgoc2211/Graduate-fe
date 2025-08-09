import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUnassignedRooms, getMessages, startChat, sendMessage } from "@/api/chat.api"
import type {
  IChatRoom,
  IMessage,
  IStartChatPayload,
  ISendMessagePayload,
  IStartChatResponse,
} from "@/interface/chat.interface"

// Lấy danh sách phòng chưa gán staff
export const useUnassignedChatRooms = () => {
  return useQuery<{ data: IChatRoom[] }>({
    queryKey: ["chat-rooms-unassigned"],
    queryFn: getUnassignedRooms,
    refetchInterval: 30000,
  })
}

export const useChatMessages = (roomId: string, enabled: boolean = true) => {
  return useQuery<{ data: IMessage[] }>({
    queryKey: ["chat-messages", roomId],
    queryFn: () => getMessages(roomId),
    enabled: !!roomId && enabled, 
    refetchInterval: 5000, 
    staleTime: 0, 
  });
};
// Bắt đầu cuộc trò chuyện (user)
export const useStartChat = () => {
  const queryClient = useQueryClient()

  return useMutation<{ data: IStartChatResponse }, Error, IStartChatPayload>({
    mutationFn: (payload: IStartChatPayload) => startChat(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      })
      queryClient.setQueryData(["chat-messages", response.data.room._id], { data: [response.data.newMessage] })
    },
  })
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
    mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
      })
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      })
    },
  })
}
