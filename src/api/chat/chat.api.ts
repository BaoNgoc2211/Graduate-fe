import type {
  IChatRoom,
  IMessage,
  IStartChatPayload,
  ISendMessagePayload,
  IStartChatResponse,
  ISendPrescriptionPayload,
  IUpdatePrescriptionPayload,
  IPrescriptionResponse,
} from "@/interface/auth/chat.interface";
import APIConfig from "../api.config";

// Lấy danh sách các phòng chat chưa có staff xử lý
// export const getUnassignedRooms = async (): Promise<{ data: IChatRoom[] }> => {
//   const res = await APIConfig.get(`/api/chat/unassigned`);
//   return res.data;
// };
export const getUnassignedRooms = async (): Promise<{ data: IChatRoom[] }> => {
  const res = await APIConfig.get<{ data: IChatRoom[] }>(
    `/api/chat/unassigned`
  );
  return res.data;
};

// Lấy danh sách tin nhắn theo room
// export const getMessages = async (
//   roomId: string
// ): Promise<{ data: IMessage[] }> => {
//   const res = await APIConfig.get(`/api/chat/messages/${roomId}`);
//   return res.data;
// };
export const getMessages = async (
  roomId: string
): Promise<{ data: IMessage[] }> => {
  const res = await APIConfig.get<{ data: IMessage[] }>(
    `/api/chat/messages/${roomId}`
  );
  return res.data;
};

// Bắt đầu chat (từ phía user)
// export const startChat = async (
//   data: IStartChatPayload
// ): Promise<{ data: IStartChatResponse }> => {
//   const res = await APIConfig.post(`/api/chat/start`, data, {
//     withCredentials: true,
//   });
//   return res.data;
// };
export const startChat = async (
  data: IStartChatPayload
): Promise<{ data: IStartChatResponse }> => {
  const res = await APIConfig.post<{ data: IStartChatResponse }>(
    `/api/chat/start`,
    data,
    { withCredentials: true }
  );
  return res.data;
};

// Gửi message (từ phía staff/admin)
// export const sendMessage = async (
//   data: ISendMessagePayload
// ): Promise<{ data: IMessage }> => {
//   const res = await APIConfig.post(`/api/chat/send`, data, {
//     withCredentials: true,
//   });
//   return res.data;
// };
export const sendMessage = async (
  data: ISendMessagePayload
): Promise<{ data: IMessage }> => {
  const res = await APIConfig.post<{ data: IMessage }>(`/api/chat/send`, data, {
    withCredentials: true,
  });
  return res.data;
};
// export const sendPrescriptionWithAxios = async (
//   data: ISendPrescriptionPayload
// ): Promise<{ data: IPrescriptionResponse }> => {
//   try {
//     console.log("Sending prescription data:", {
//       fileName: data.image.name,
//       fileSize: data.image.size,
//       roomId: data.roomId,
//       roomIdType: typeof data.roomId
//     });

//     const formData = new FormData();
//     formData.append("image", data.image, data.image.name);

//     // Ensure roomId is a string
//     const roomIdString = String(data.roomId);
//     formData.append("roomId", roomIdString);

//     console.log("FormData entries:");
//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     const res = await APIConfig.post<{ data: IPrescriptionResponse }>(`/api/chat/send-prescription`, formData, {
//       headers: {
//       },
//       withCredentials: true,
//       timeout: 60000,
//     });

//     console.log("API Response:", res.data);
//     toast.success("Gửi đơn thuốc thành công!");
//     return res.data;
//   } catch (error) {
//     console.error("sendPrescriptionWithAxios error:", error);
//     toast.error("Gửi đơn thuốc thất bại. Vui lòng thử lại!");
//     throw error;
//   }
// };
export const sendPrescriptionWithAxios = async (
  data: ISendPrescriptionPayload
): Promise<{ data: IPrescriptionResponse }> => {
  console.log("Sending prescription data:", {
    fileName: data.image.name,
    fileSize: data.image.size,
    roomId: data.roomId,
    roomIdType: typeof data.roomId,
  });

  const formData = new FormData();
  formData.append("image", data.image, data.image.name);

  // Ensure roomId is a string
  const roomIdString = String(data.roomId);
  formData.append("roomId", roomIdString);

  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  const res = await APIConfig.post<{ data: IPrescriptionResponse }>(
    `/api/chat/send-prescription`,
    formData,
    {
      headers: {},
      withCredentials: true,
      timeout: 60000,
      // maxContentLength: 15 * 1024 * 1024, // 15MB
      // maxBodyLength: 15 * 1024 * 1024, // 15MB
    }
  );

  console.log("API Response:", res.data);
  return res.data;
};
// export const sendPrescriptionWithAxios = async (
//   data: ISendPrescriptionPayload
// ): Promise<{ data: IPrescriptionResponse }> => {
//   try {
//     console.log("Sending prescription data:", {
//       fileName: data.image.name,
//       fileSize: data.image.size,
//       roomId: data.roomId,
//       roomIdType: typeof data.roomId
//     })

//     const formData = new FormData();
//     formData.append("image", data.image, data.image.name);

//     // Ensure roomId is a string
//     const roomIdString = String(data.roomId);
//     formData.append("roomId", roomIdString);

//     console.log("FormData entries:");
//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     const res = await APIConfig.post<{ data: IPrescriptionResponse }>(`/api/chat/send-prescription`, formData, {
//       headers: {
//       },
//       withCredentials: true,
//       timeout: 60000,
//       // maxContentLength: 15 * 1024 * 1024, // 15MB
//       // maxBodyLength: 15 * 1024 * 1024, // 15MB
//     });

//     console.log("API Response:", res.data);
//     return res.data;
//   } catch (error) {
//     console.error("sendPrescriptionWithAxios error:", error);
//     if (error.response) {
//       console.error("Error response:", error.response.data);
//       console.error("Error status:", error.response.status);
//     }
//     throw error;
//   }
// };

export const updatePrescription = async (
  data: IUpdatePrescriptionPayload
): Promise<{ data: { message: string } }> => {
  // ): Promise<{ message: string } > => {
  const res = await APIConfig.put(`/api/chat/update-prescription`, data, {
    withCredentials: true,
  });
  // return res.data;
  return res.data as Promise<{ data: { message: string } }>;
};
