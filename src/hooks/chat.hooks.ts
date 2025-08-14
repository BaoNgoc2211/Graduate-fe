//#region version 1
// "use client";

// import { IChatRoom, IMessage } from "@/interface/chat.interface";
// import { io, type Socket } from "socket.io-client";
// import { useEffect, useState } from "react";
// import { useSendMessage, useStartChat, useChatMessages } from "./useChat";

// interface UseChatSocketProps {
//   userId?: string;
//   userRole?: "user" | "staff" | "admin";
//   onNewMessage?: (message: IMessage) => void;
//   onRoomCreated?: (room: IChatRoom) => void;
// }

// export const useChatSocket = ({
//   userId,
//   userRole = "user",
//   onNewMessage,
//   onRoomCreated,
// }: UseChatSocketProps = {}) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoom, setCurrentRoom] = useState<IChatRoom | null>(null);
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   const startChatMutation = useStartChat();
//   const sendMessageMutation = useSendMessage();
  
//   const { 
//     data: messagesResponse, 
//     isLoading: messagesLoading,
//     refetch: refetchMessages 
//   } = useChatMessages(currentRoom?._id || "", !!currentRoom);

//   useEffect(() => {
//     if (messagesResponse?.data) {
//       setMessages(messagesResponse.data);
//     }
//   }, [messagesResponse]);

//   // Initialize socket connection
//   useEffect(() => {
//     const socketInstance = io(
//       process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8888",
//       {
//         transports: ["websocket"],
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
//         const exists = prev.find(m => m._id === message._id);
//         if (exists) return prev;
//         return [...prev, message];
//       });
//       onNewMessage?.(message);
      
//       refetchMessages();
//     });

//     socketInstance.on("roomCreated", (room: IChatRoom) => {
//       setCurrentRoom(room);
//       onRoomCreated?.(room);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [onNewMessage, onRoomCreated, refetchMessages]);

//   useEffect(() => {
//     const checkExistingRoom = async () => {
//       if (!userId) return;
      
//       setIsLoading(true);
//       try {
//         // Thử lấy room hiện tại của user
//         const response = await fetch("/api/chat/user/current-room", {
//           credentials: "include",
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           if (data.data) {
//             setCurrentRoom(data.data);
//             console.log("Found existing room:", data.data._id);
//           }
//         }
//       } catch  {
//         console.log("No existing room found");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkExistingRoom();
//   }, [userId]);

//   // Join room when room is set
//   useEffect(() => {
//     if (socket && currentRoom?._id) {
//       socket.emit("joinRoom", currentRoom._id);
//       console.log("Joined room:", currentRoom._id);
//     }
//   }, [socket, currentRoom]);

//   // Start chat (create room)
//   const startChat = async (message: string) => {
//     if (!message.trim()) return;

//     setIsLoading(true);
//     try {
//       const response = await startChatMutation.mutateAsync({ message });
//       const { room, newMessage } = response.data;

//       setCurrentRoom(room);
//       setMessages([newMessage]);

//       if (socket) {
//         socket.emit("joinRoom", room._id);
//       }
      
//       localStorage.setItem("currentChatRoom", room._id);
      
//     } catch (error) {
//       console.error("Failed to start chat:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Send message
//   const sendMessage = async (content: string) => {
//     if (!content.trim() || !currentRoom) return;
    
//     setIsSending(true);
//     try {
//       const payload = {
//         roomId: currentRoom._id,
//         content,
//       };

//       // Optimistic update
//       const tempMessage: IMessage = {
//         _id: `temp-${Date.now()}`,
//         room: currentRoom._id,
//         content,
//         sender: userId || "unknown",
//         senderType: userRole === 'user' ? 'user' : 'staff',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
      
//       setMessages((prev) => [...prev, tempMessage]);

//       // Send via socket for real-time
//       if (socket) {
//         socket.emit("sendMessage", payload);
//       }

//       await sendMessageMutation.mutateAsync(payload);
      
//       setTimeout(() => {
//         refetchMessages();
//       }, 1000);
      
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       // Remove optimistic message on error
//       setMessages((prev) => prev.filter((msg) => !msg._id.startsWith("temp-")));
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return {
//     socket,
//     isConnected,
//     currentRoom,
//     messages,
//     isLoading: isLoading || messagesLoading,
//     isSending,
//     startChat,
//     sendMessage,
//     setCurrentRoom,
//     setMessages,
//     refetchMessages,
//   };
// };
//#endregion
//#region version 2
// "use client";

// import { IChatRoom, IMessage, IPrescriptionData } from "@/interface/chat.interface";
// import { io, type Socket } from "socket.io-client";
// import { useEffect, useState, useCallback } from "react";
// import { useSendMessage, useStartChat, useChatMessages } from "./useChat";
// import { toast } from "sonner";
// import APIConfig from "@/api/api.config";
// import { getCurrentUserRoom } from "@/api/auth/chat.api";

// interface UseChatSocketProps {
//   userId?: string;
//   userRole?: "user" | "staff" | "admin";
//   onNewMessage?: (message: IMessage) => void;
//   onRoomCreated?: (room: IChatRoom) => void;
// }

// export const useChatSocket = ({
//   userId,
//   userRole = "user",
//   onNewMessage,
//   onRoomCreated,
// }: UseChatSocketProps = {}) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoom, setCurrentRoom] = useState<IChatRoom | null>(null);
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   const startChatMutation = useStartChat();
//   const sendMessageMutation = useSendMessage();
  
//   const { 
//     data: messagesResponse, 
//     isLoading: messagesLoading,
//     refetch: refetchMessages 
//   } = useChatMessages(currentRoom?._id || "", !!currentRoom);

//   useEffect(() => {
//     if (messagesResponse?.data) {
//       setMessages(messagesResponse.data);
//     }
//   }, [messagesResponse]);

//   // Initialize socket connection
//   useEffect(() => {
//     const socketInstance = io(
//       process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8888",
//       {
//         transports: ["websocket"],
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
//         const exists = prev.find(m => m._id === message._id);
//         if (exists) return prev;
//         return [...prev, message];
//       });
//       onNewMessage?.(message);
      
//       refetchMessages();
//     });

//     socketInstance.on("roomCreated", (room: IChatRoom) => {
//       setCurrentRoom(room);
//       onRoomCreated?.(room);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [onNewMessage, onRoomCreated, refetchMessages]);

//   // Check for existing room on mount
//   useEffect(() => {
//     const checkExistingRoom = async () => {
//       if (!userId) return;

//       setIsLoading(true);
//       try {
//         const response = await getCurrentUserRoom();
//         if (response.data) {
//           setCurrentRoom(response.data);
//           console.log("Found existing room:", response.data._id);
//         }
//       } catch (error) {
//         console.log("No existing room found or error:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkExistingRoom();
//   }, [userId]);

//   // Load existing room function for manual trigger
//   const loadExistingRoom = useCallback(async () => {
//     if (!userId) return;
    
//     setIsLoading(true);
//     try {
//       const response = await getCurrentUserRoom();
//       if (response.data) {
//         setCurrentRoom(response.data);
//         console.log("Found existing room:", response.data._id);
//       }
//     } catch (error) {
//       console.log("No existing room found or error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId]);

//   // Join room when room is set
//   useEffect(() => {
//     if (socket && currentRoom?._id) {
//       socket.emit("joinRoom", currentRoom._id);
//       console.log("Joined room:", currentRoom._id);
//     }
//   }, [socket, currentRoom]);

//   // Start chat (create room)
//   const startChat = async (message: string) => {
//     if (!message.trim()) return;

//     setIsLoading(true);
//     try {
//       const response = await startChatMutation.mutateAsync({ message });
//       const { room, newMessage } = response.data;

//       setCurrentRoom(room);
//       setMessages([newMessage]);

//       if (socket) {
//         socket.emit("joinRoom", room._id);
//       }
      
//       localStorage.setItem("currentChatRoom", room._id);
      
//     } catch (error) {
//       console.error("Failed to start chat:", error);
//       toast.error("Không thể bắt đầu cuộc trò chuyện");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Send message
//   const sendMessage = async (content: string) => {
//     if (!content.trim() || !currentRoom) return;
    
//     setIsSending(true);
//     try {
//       const payload = {
//         roomId: currentRoom._id,
//         content,
//       };

//       // Optimistic update
//       const tempMessage: IMessage = {
//         _id: `temp-${Date.now()}`,
//         room: currentRoom._id,
//         content,
//         sender: userId || "unknown",
//         senderType: userRole === 'user' ? 'user' : 'staff',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
      
//       setMessages((prev) => [...prev, tempMessage]);

//       // Send via socket for real-time
//       if (socket) {
//         socket.emit("sendMessage", payload);
//       }

//       await sendMessageMutation.mutateAsync(payload);
      
//       setTimeout(() => {
//         refetchMessages();
//       }, 1000);
      
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       toast.error("Không thể gửi tin nhắn");
//       // Remove optimistic message on error
//       setMessages((prev) => prev.filter((msg) => !msg._id.startsWith("temp-")));
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Send prescription with OCR
//   const sendPrescription = async (prescriptionData: IPrescriptionData[], imageUrl: string) => {
//     if (!prescriptionData || prescriptionData.length === 0 || !currentRoom) return;

//     setIsSending(true);
//     try {
//       // Create prescription message content
//       const content = prescriptionData.map(med => 
//         `${med.name} ${med.dosage} ${med.quantity}`
//       ).join(", ");

//       // Send to API
//       const response = await APIConfig.post("/api/chat/send-prescription", {
//         roomId: currentRoom._id,
//         prescriptionData,
//         imageUrl,
//         content
//       }, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       if (response.data && response.data.data) {
//         const newMessage = response.data.data;
        
//         // Add to messages with prescription data
//         const messageWithPrescription = {
//           ...newMessage,
//           prescriptionData,
//           imageUrl
//         };
        
//         setMessages((prev) => [...prev, messageWithPrescription]);
        
//         // Send via socket for real-time
//         if (socket) {
//           socket.emit("prescriptionSent", { 
//             roomId: currentRoom._id, 
//             message: messageWithPrescription 
//           });
//         }

//         // Refetch to ensure sync
//         setTimeout(() => {
//           refetchMessages();
//         }, 1000);

//         toast.success("Đã gửi đơn thuốc thành công!");
//       }
//     } catch (error) {
//       console.error("Failed to send prescription:", error);
//       toast.error("Không thể gửi đơn thuốc");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Update prescription
//   const updatePrescription = async (messageId: string, prescriptionData: IPrescriptionData[]) => {
//     if (!messageId || !prescriptionData) return;

//     try {
//       const response = await APIConfig.put("/api/chat/update-prescription", {
//         messageId,
//         newText: prescriptionData.map(med => 
//           `${med.name} ${med.dosage} ${med.quantity}`
//         ).join(", ")
//       }, {
//         withCredentials: true,
//       });

//       if (response.data) {
//         // Update local messages
//         setMessages((prev) => 
//           prev.map(msg => 
//             msg._id === messageId 
//               ? { ...msg, prescriptionData, content: prescriptionData.map(med => 
//                   `${med.name} ${med.dosage} ${med.quantity}`
//                 ).join(", ") }
//               : msg
//           )
//         );

//         // Send via socket for real-time
//         if (socket) {
//           socket.emit("prescriptionUpdated", { messageId, prescriptionData });
//         }

//         // Refetch to ensure sync
//         setTimeout(() => {
//           refetchMessages();
//         }, 1000);

//         toast.success("Đã cập nhật đơn thuốc thành công!");
//       }
//     } catch (error) {
//       console.error("Failed to update prescription:", error);
//       toast.error("Không thể cập nhật đơn thuốc");
//     }
//   };

//   return {
//     socket,
//     isConnected,
//     currentRoom,
//     messages,
//     isLoading: isLoading || messagesLoading,
//     isSending,
//     startChat,
//     sendMessage,
//     sendPrescription,
//     updatePrescription,
//     loadExistingRoom,
//     setCurrentRoom,
//     setMessages,
//     refetchMessages,
//   };
// };
//#endregion
//#region version 3
// "use client";

// import { IChatRoom, IMessage, IPrescriptionData } from "@/interface/auth/chat.interface";
// import { io, type Socket } from "socket.io-client";
// import { useEffect, useState, useCallback } from "react";
// import { useSendMessage, useStartChat, useChatMessages, useSendPrescriptionMessage } from "./useChat";
// import { toast } from "sonner";
// import { getCurrentUserRoom } from "@/api/auth/chat.api";

// interface UseChatSocketProps {
//   userId?: string;
//   userRole?: "user" | "staff" | "admin";
//   onNewMessage?: (message: IMessage) => void;
//   onRoomCreated?: (room: IChatRoom) => void;
// }

// export const useChatSocket = ({
//   userId,
//   userRole = "user",
//   onNewMessage,
//   onRoomCreated,
// }: UseChatSocketProps = {}) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoom, setCurrentRoom] = useState<IChatRoom | null>(null);
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   const startChatMutation = useStartChat();
//   const sendMessageMutation = useSendMessage();
//   const sendPrescriptionMessageMutation = useSendPrescriptionMessage();
  
//   const { 
//     data: messagesResponse, 
//     isLoading: messagesLoading,
//     refetch: refetchMessages 
//   } = useChatMessages(currentRoom?._id || "", !!currentRoom);

//   useEffect(() => {
//     if (messagesResponse?.data) {
//       setMessages(messagesResponse.data);
//     }
//   }, [messagesResponse]);

//   // Initialize socket connection
//   useEffect(() => {
//     const socketInstance = io(
//       process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8888",
//       {
//         transports: ["websocket"],
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
//         const exists = prev.find(m => m._id === message._id);
//         if (exists) return prev;
//         return [...prev, message];
//       });
//       onNewMessage?.(message);
      
//       refetchMessages();
//     });

//     socketInstance.on("roomCreated", (room: IChatRoom) => {
//       setCurrentRoom(room);
//       onRoomCreated?.(room);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [onNewMessage, onRoomCreated, refetchMessages]);

//   // Check for existing room on mount
//   useEffect(() => {
//     const checkExistingRoom = async () => {
//       if (!userId) return;

//       setIsLoading(true);
//       try {
//         const response = await getCurrentUserRoom();
//         if (response.data) {
//           setCurrentRoom(response.data);
//           console.log("Found existing room:", response.data._id);
//         }
//       } catch (error) {
//         console.log("No existing room found or error:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkExistingRoom();
//   }, [userId]);

//   // Load existing room function for manual trigger
//   const loadExistingRoom = useCallback(async () => {
//     if (!userId) return;
    
//     setIsLoading(true);
//     try {
//       const response = await getCurrentUserRoom();
//       if (response.data) {
//         setCurrentRoom(response.data);
//         console.log("Found existing room:", response.data._id);
//       }
//     } catch (error) {
//       console.log("No existing room found or error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId]);

//   // Join room when room is set
//   useEffect(() => {
//     if (socket && currentRoom?._id) {
//       socket.emit("joinRoom", currentRoom._id);
//       console.log("Joined room:", currentRoom._id);
//     }
//   }, [socket, currentRoom]);

//   // Start chat (create room)
//   const startChat = async (message: string) => {
//     if (!message.trim()) return;

//     setIsLoading(true);
//     try {
//       const response = await startChatMutation.mutateAsync({ message });
//       const { room, newMessage } = response.data;

//       setCurrentRoom(room);
//       setMessages([newMessage]);

//       if (socket) {
//         socket.emit("joinRoom", room._id);
//       }
      
//       localStorage.setItem("currentChatRoom", room._id);
      
//     } catch (error) {
//       console.error("Failed to start chat:", error);
//       toast.error("Không thể bắt đầu cuộc trò chuyện");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Send message
//   const sendMessage = async (content: string) => {
//     if (!content.trim() || !currentRoom) return;
    
//     setIsSending(true);
//     try {
//       const payload = {
//         roomId: currentRoom._id,
//         content,
//       };

//       // Optimistic update
//       const tempMessage: IMessage = {
//         _id: `temp-${Date.now()}`,
//         room: currentRoom._id,
//         content,
//         sender: userId || "unknown",
//         senderType: userRole === 'user' ? 'user' : 'staff',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
      
//       setMessages((prev) => [...prev, tempMessage]);

//       // Send via socket for real-time
//       if (socket) {
//         socket.emit("sendMessage", payload);
//       }

//       await sendMessageMutation.mutateAsync(payload);
      
//       setTimeout(() => {
//         refetchMessages();
//       }, 1000);
      
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       toast.error("Không thể gửi tin nhắn");
//       // Remove optimistic message on error
//       setMessages((prev) => prev.filter((msg) => !msg._id.startsWith("temp-")));
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Send prescription via prescription message hook
//   const sendPrescription = async (prescriptionData: IPrescriptionData[], imageUrl: string) => {
//     if (!prescriptionData || prescriptionData.length === 0 || !currentRoom) {
//       toast.error("Không có dữ liệu đơn thuốc để gửi");
//       return;
//     }

//     setIsSending(true);
//     try {
//       console.log("🔄 Sending prescription via hook:", {
//         roomId: currentRoom._id,
//         prescriptionCount: prescriptionData.length,
//         imageUrl: imageUrl ? "provided" : "none"
//       });

//       // Use the prescription message hook
//       const response = await sendPrescriptionMessageMutation.mutateAsync({
//         roomId: currentRoom._id,
//         prescriptionData,
//         imageUrl,
//       });

//       // Update local messages
//       if (response.data) {
//         setMessages((prev) => [...prev, response.data]);
//       }

//       // Send via socket for real-time updates
//       if (socket) {
//         socket.emit("prescriptionSent", { 
//           roomId: currentRoom._id, 
//           message: response.data
//         });
//       }

//       // Refetch to ensure sync
//       setTimeout(() => {
//         refetchMessages();
//       }, 1000);

//       toast.success("Đã gửi đơn thuốc thành công!");

//     } catch (error) {
//       console.error("❌ Failed to send prescription:", error);
//       toast.error("Không thể gửi đơn thuốc");
//     } finally {
//       setIsSending(false);
//     }
//   };d" : "none"
//       });

//       // Create prescription message content
//       const content = prescriptionData.map(med => 
//         `${med.name} - ${med.dosage} - ${med.quantity}`
//       ).join("; ");

//       // Create a prescription message locally first
//       const prescriptionMessage: IMessage = {
//         _id: `temp-prescription-${Date.now()}`,
//         room: currentRoom._id,
//         content: `Đơn thuốc: ${content}`,
//         sender: userId || "unknown",
//         senderType: userRole === 'user' ? 'user' : 'staff',
//         prescriptionData,
//         imageUrl,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       // Add to messages immediately for better UX
//       setMessages((prev) => [...prev, prescriptionMessage]);

//       // Send via API using the existing sendMessage function
//       const response = await sendMessageMutation.mutateAsync({
//         roomId: currentRoom._id,
//         content: `Đơn thuốc: ${content}`,
//       });

//       // Update the temporary message with real data
//       if (response.data) {
//         setMessages((prev) => 
//           prev.map(msg => 
//             msg._id === prescriptionMessage._id
//               ? { ...response.data, prescriptionData, imageUrl }
//               : msg
//           )
//         );
//       }

//       // Send via socket for real-time updates
//       if (socket) {
//         socket.emit("prescriptionSent", { 
//           roomId: currentRoom._id, 
//           message: { ...response.data, prescriptionData, imageUrl }
//         });
//       }

//       // Refetch to ensure sync
//       setTimeout(() => {
//         refetchMessages();
//       }, 1000);

//       toast.success("Đã gửi đơn thuốc thành công!");

//     } catch (error) {
//       console.error("❌ Failed to send prescription:", error);
      
//       // Remove the temporary prescription message on error
//       setMessages((prev) => 
//         prev.filter(msg => !msg._id.startsWith("temp-prescription-"))
//       );
      
//       toast.error("Không thể gửi đơn thuốc");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Update prescription
//   const updatePrescription = async (messageId: string, prescriptionData: IPrescriptionData[]) => {
//     if (!messageId || !prescriptionData) return;

//     try {
//       const newContent = prescriptionData.map(med => 
//         `${med.name} - ${med.dosage} - ${med.quantity}`
//       ).join("; ");

//       // Update local messages immediately
//       setMessages((prev) => 
//         prev.map(msg => 
//           msg._id === messageId 
//             ? { 
//                 ...msg, 
//                 prescriptionData, 
//                 content: `Đơn thuốc (đã cập nhật): ${newContent}` 
//               }
//             : msg
//         )
//       );

//       // Send via API (you may need to create this endpoint)
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888'}/api/chat/update-prescription`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           messageId,
//           newText: `Đơn thuốc (đã cập nhật): ${newContent}`,
//           prescriptionData
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       // Send via socket for real-time
//       if (socket) {
//         socket.emit("prescriptionUpdated", { messageId, prescriptionData });
//       }

//       // Refetch to ensure sync
//       setTimeout(() => {
//         refetchMessages();
//       }, 1000);

//       toast.success("Đã cập nhật đơn thuốc thành công!");

//     } catch (error) {
//       console.error("Failed to update prescription:", error);
//       toast.error("Không thể cập nhật đơn thuốc");
      
//       // Revert local changes on error
//       refetchMessages();
//     }
//   };

//   return {
//     socket,
//     isConnected,
//     currentRoom,
//     messages,
//     isLoading: isLoading || messagesLoading,
//     isSending,
//     startChat,
//     sendMessage,
//     sendPrescription,
//     updatePrescription,
//     loadExistingRoom,
//     setCurrentRoom,
//     setMessages,
//     refetchMessages,
//   };
// };
//#endregion