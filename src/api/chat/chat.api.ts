import type {
  IChatRoom,
  IMessage,
  IStartChatPayload,
  ISendMessagePayload,
  IStartChatResponse,
  ISendPrescriptionPayload,
  IUpdatePrescriptionPayload,
} from "@/interface/auth/chat.interface";
import APIConfig from "../api.config";


// Lấy danh sách các phòng chat chưa có staff xử lý
export const getUnassignedRooms = async (): Promise<{ data: IChatRoom[] }> => {
  const res = await APIConfig.get(`/api/chat/unassigned`);
  return res.data;
};

// Lấy danh sách tin nhắn theo room
export const getMessages = async (
  roomId: string
): Promise<{ data: IMessage[] }> => {
  const res = await APIConfig.get(`/api/chat/messages/${roomId}`);
  return res.data;
};

// Bắt đầu chat (từ phía user)
export const startChat = async (
  data: IStartChatPayload
): Promise<{ data: IStartChatResponse }> => {
  const res = await APIConfig.post(`/api/chat/start`, data, {
    withCredentials: true,
  });
  return res.data;
};

// Gửi message (từ phía staff/admin)
export const sendMessage = async (
  data: ISendMessagePayload
): Promise<{ data: IMessage }> => {
  const res = await APIConfig.post(`/api/chat/send`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const sendPrescriptionWithAxios = async (
  data: ISendPrescriptionPayload
): Promise<{ data: IMessage }> => {
  try {
    const formData = new FormData();
    formData.append("image", data.image, data.image.name);
    formData.append("roomId", data.roomId._id);

    const res = await APIConfig.post(`/api/chat/send-prescription`, formData, {
      headers: {
        // Don't set Content-Type - let axios handle it
      },
      withCredentials: true,
      timeout: 60000, // 60 seconds for file upload
      maxContentLength: 15 * 1024 * 1024, // 15MB
      maxBodyLength: 15 * 1024 * 1024, // 15MB
    });

    return res.data;
  } catch (error) {
    console.error("sendPrescriptionWithAxios error:", error);
    throw error;
  }
};

export const updatePrescription = async (
  data: IUpdatePrescriptionPayload
): Promise<{ data: { message: string } }> => {
  const res = await APIConfig.put(`/api/chat/update-prescription`, data, {
    withCredentials: true,
  });
  return res.data;
};
