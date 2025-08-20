// //#region version 01
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   MessageCircle,
//   X,
//   Minimize2,
//   Maximize2,
//   FileImage,
//   ArrowLeft,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import type { ISendPrescriptionPayload } from "@/interface/auth/chat.interface";
// import { useChatSocket } from "@/hooks/chat/use-chat-socket.hooks";
// import { sendPrescriptionWithAxios } from "@/api/chat/chat.api";
// import { PrescriptionUpload } from "./prescription-upload";
// import { ChatMessage } from "./chat-message";
// import { ChatInput } from "./chat-input";

// interface ChatBoxProps {
//   userId?: string;
//   className?: string;
//   defaultMinimized?: boolean;
//   enablePrescription?: boolean;
// }

// export function ChatBox({
//   userId = "user-123",
//   className,
//   defaultMinimized = true,
//   enablePrescription = true,
// }: ChatBoxProps) {
//   const [isOpen, setIsOpen] = useState(!defaultMinimized);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [showPrescription, setShowPrescription] = useState(false);
//   const [isPrescriptionUploading, setIsPrescriptionUploading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const {
//     currentRoom,
//     messages,
//     isLoading,
//     isSending,
//     isConnected,
//     startChat,
//     sendMessage,
//   } = useChatSocket({
//     userId,
//     onNewMessage: () => {
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     },
//   });

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (message: string) => {
//     if (!currentRoom) {
//       await startChat(message);
//     } else {
//       await sendMessage(message);
//     }
//   };

//   const handlePrescriptionUpload = () => {
//     setShowPrescription(true);
//   };

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       setIsMinimized(false);
//       setShowPrescription(false);
//     }
//   };

//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized);
//   };

//   const handlePrescriptionBack = () => {
//     setShowPrescription(false);
//   };

//   const handlePrescriptionSend = async (
//     prescriptionData: ISendPrescriptionPayload
//   ) => {
//     try {
//       setIsPrescriptionUploading(true);
//       console.log("Uploading prescription:", prescriptionData);

//       const response = await sendPrescriptionWithAxios(prescriptionData);
//       console.log("Prescription upload response:", response);

//       // Close prescription view and show success
//       setShowPrescription(false);

//       // Optionally show a success message or refresh messages
//       // The new message should appear automatically via socket
//     } catch (error) {
//       console.error("Failed to upload prescription:", error);
//       // Error handling is done in the PrescriptionUpload component
//     } finally {
//       setIsPrescriptionUploading(false);
//     }
//   };

//   if (!isOpen) {
//     return (
//       <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//         <Button
//           onClick={toggleChat}
//           size="lg"
//           className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//       <Card
//         className={cn(
//           "flex flex-col shadow-xl border-0 overflow-hidden transition-all duration-300",
//           showPrescription ? "w-96 h-[600px]" : "w-80 h-96"
//         )}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
//           <div className="flex items-center gap-3">
//             {showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionBack}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//             )}
//             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//               {showPrescription ? (
//                 <FileImage className="h-4 w-4" />
//               ) : (
//                 <MessageCircle className="h-4 w-4" />
//               )}
//             </div>
//             <div>
//               <h3 className="font-medium text-sm">
//                 {showPrescription
//                   ? "Quản lý đơn thuốc và hình ảnh"
//                   : "Hỗ trợ khách hàng"}
//               </h3>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={cn(
//                     "w-2 h-2 rounded-full",
//                     isConnected ? "bg-green-400" : "bg-red-400"
//                   )}
//                 />
//                 <span className="text-xs opacity-90">
//                   {isConnected ? "Đang hoạt động" : "Không kết nối"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-1">
//             {enablePrescription && !showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionUpload}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//                 title="Upload prescription"
//               >
//                 <FileImage className="h-4 w-4" />
//               </Button>
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleMinimize}
//               className="h-8 w-8 text-white hover:bg-white/20"
//             >
//               {isMinimized ? (
//                 <Maximize2 className="h-4 w-4" />
//               ) : (
//                 <Minimize2 className="h-4 w-4" />
//               )}
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleChat}
//               className="h-8 w-8 text-white hover:bg-white/20"
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {!isMinimized && (
//           <>
//             {showPrescription ? (
//               /* Prescription upload with proper container and props */
//               <div className="flex-1 overflow-hidden">
//                 <PrescriptionUpload
//                   onBack={handlePrescriptionBack}
//                   onSendPrescription={handlePrescriptionSend}
//                   roomId={currentRoom || undefined}
//                   isUploading={isPrescriptionUploading}
//                 />
//               </div>
//             ) : (
//               <>
//                 <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                   {isLoading ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
//                         <p className="text-sm text-gray-500">Đang kết nối...</p>
//                       </div>
//                     </div>
//                   ) : messages.length === 0 ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                         <h4 className="font-medium text-gray-900 mb-1">
//                           Chào mừng bạn!
//                         </h4>
//                         <p className="text-sm text-gray-500 mb-4">
//                           Chúng tôi sẵn sàng hỗ trợ bạn về các sản phẩm thuốc
//                         </p>
//                         <Badge variant="secondary" className="text-xs">
//                           Nhắn tin để bắt đầu
//                         </Badge>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {messages.map((message) => (
//                         <ChatMessage
//                           key={message._id}
//                           message={message}
//                           isCurrentUser={message.sender === userId}
//                         />
//                       ))}
//                       <div ref={messagesEndRef} />
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-t bg-white">
//                   <ChatInput
//                     onSendMessage={handleSendMessage}
//                     disabled={isSending || isLoading}
//                     placeholder={
//                       !currentRoom
//                         ? "Nhập tin nhắn để bắt đầu..."
//                         : "Nhập tin nhắn..."
//                     }
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }
// //#endregion
// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ChatMessage } from "./chat-message"
// import { ChatInput } from "./chat-input"
// import { PrescriptionUpload } from "./prescription-upload"
// import { useChatSocket } from "@/hooks/chat/use-chat-socket.hooks"
// import { MessageCircle, X, Minimize2, Maximize2, FileImage, ArrowLeft } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { sendPrescriptionWithAxios } from "@/api/chat/chat.api"
// import type { ISendPrescriptionPayload, IMedicine } from "@/interface/auth/chat.interface"

// interface ChatBoxProps {
//   userId?: string
//   className?: string
//   defaultMinimized?: boolean
//   enablePrescription?: boolean
// }

// export function ChatBox({
//   userId = "user-123",
//   className,
//   defaultMinimized = true,
//   enablePrescription = true,
// }: ChatBoxProps) {
//   const [isOpen, setIsOpen] = useState(!defaultMinimized)
//   const [isMinimized, setIsMinimized] = useState(false)
//   const [showPrescription, setShowPrescription] = useState(false)
//   const [isPrescriptionUploading, setIsPrescriptionUploading] = useState(false)
//   const [extractedMedicines, setExtractedMedicines] = useState<IMedicine[]>([])
//   const [extractedPrescriptionId, setExtractedPrescriptionId] = useState<string>("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const { currentRoom, messages, isLoading, isSending, isConnected, startChat, sendMessage } = useChatSocket({
//     userId,
//     onNewMessage: () => {
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//       }, 100)
//     },
//   })

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSendMessage = async (message: string) => {
//     if (!currentRoom) {
//       await startChat(message)
//     } else {
//       await sendMessage(message)
//     }
//   }

//   const handlePrescriptionUpload = () => {
//     setShowPrescription(true)
//   }

//   const toggleChat = () => {
//     setIsOpen(!isOpen)
//     if (!isOpen) {
//       setIsMinimized(false)
//       setShowPrescription(false)
//     }
//   }

//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized)
//   }

//   const handlePrescriptionBack = () => {
//     setShowPrescription(false)
//   }

//   const handlePrescriptionSend = async (prescriptionData: ISendPrescriptionPayload) => {
//     try {
//       setIsPrescriptionUploading(true)
//       console.log("Uploading prescription:", prescriptionData)

//       if (!prescriptionData.roomId) {
//         throw new Error("Room ID is required for prescription upload")
//       }

//       const response = await sendPrescriptionWithAxios(prescriptionData)
//       console.log("Prescription upload response:", response)

//       if (response.data && response.data.content) {
//         const medicineText = response.data.content
//         console.log("Medicine text from API:", medicineText)

//         const extractedMeds = parseMedicineFromText(medicineText)
//         console.log("Parsed medicines:", extractedMeds)

//         if (extractedMeds.length > 0) {
//           setExtractedMedicines(extractedMeds)
//           setExtractedPrescriptionId(response.data._id || "")
//           // Don't close the prescription view here
//         }
//       }
//     } catch (error) {
//       console.error("Failed to upload prescription:", error)
//       throw error
//     } finally {
//       setIsPrescriptionUploading(false)
//     }
//   }

//   const handleStartChatForPrescription = async (message: string): Promise<void> => {
//     try {
//       await startChat(message)
//       return new Promise((resolve) => {
//         const checkRoom = () => {
//           if (currentRoom) {
//             resolve()
//           } else {
//             setTimeout(checkRoom, 100)
//           }
//         }
//         checkRoom()
//       })
//     } catch (error) {
//       console.error("Failed to start chat:", error)
//       throw error
//     }
//   }

//   const parseMedicineFromText = (text: string): IMedicine[] => {
//     const medicines: IMedicine[] = []

//     // Handle the format from your API: "Paracetamol 500 mg 10 viên, Amoxicillin 250 mg 15 viên, ..."
//     const medicineItems = text.split(",").map((item) => item.trim())

//     medicineItems.forEach((item, index) => {
//       if (item.length > 0) {
//         // Parse format like "Paracetamol 500 mg 10 viên"
//         const parts = item.trim().split(" ")

//         if (parts.length >= 2) {
//           const name = parts[0]

//           // Extract dosage (e.g., "500mg", "250mg")
//           const dosageMatch = item.match(/(\d+\s*mg|\d+\s*g)/i)

//           // Extract quantity and unit (e.g., "10 viên", "5 gói", "1 chai")
//           const quantityMatch = item.match(/(\d+)\s*(viên|gói|chai|lọ|ml)/i)

//           medicines.push({
//             id: `extracted-${Date.now()}-${index}`,
//             name: name,
//             dosage: dosageMatch ? dosageMatch[0] : "",
//             quantity: quantityMatch ? Number.parseInt(quantityMatch[1]) : 1,
//             instructions: quantityMatch ? quantityMatch[2] : "",
//             price: 0,
//           })
//         }
//       }
//     })

//     return medicines
//   }

//   if (!isOpen) {
//     return (
//       <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//         <Button
//           onClick={toggleChat}
//           size="lg"
//           className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//       <Card
//         className={cn(
//           "flex flex-col shadow-xl border-0 overflow-hidden transition-all duration-300",
//           showPrescription ? "w-96 h-[600px]" : "w-80 h-96",
//         )}
//       >
//         <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
//           <div className="flex items-center gap-3">
//             {showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionBack}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//             )}
//             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//               {showPrescription ? <FileImage className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
//             </div>
//             <div>
//               <h3 className="font-medium text-sm">
//                 {showPrescription ? "Quản lý đơn thuốc và hình ảnh" : "Hỗ trợ khách hàng"}
//               </h3>
//               <div className="flex items-center gap-1">
//                 <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-400" : "bg-red-400")} />
//                 <span className="text-xs opacity-90">{isConnected ? "Đang hoạt động" : "Không kết nối"}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-1">
//             {enablePrescription && !showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionUpload}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//                 title="Upload prescription"
//               >
//                 <FileImage className="h-4 w-4" />
//               </Button>
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleMinimize}
//               className="h-8 w-8 text-white hover:bg-white/20"
//             >
//               {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
//             </Button>
//             <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:bg-white/20">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {!isMinimized && (
//           <>
//             {showPrescription ? (
//               <div className="flex-1 overflow-hidden">
//                 <PrescriptionUpload
//                   onBack={handlePrescriptionBack}
//                   onSendPrescription={handlePrescriptionSend}
//                   roomId={currentRoom || undefined}
//                   onStartChat={handleStartChatForPrescription}
//                   isUploading={isPrescriptionUploading}
//                   extractedMedicines={extractedMedicines}
//                   prescriptionId={extractedPrescriptionId}
//                 />
//               </div>
//             ) : (
//               <>
//                 <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                   {isLoading ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
//                         <p className="text-sm text-gray-500">Đang kết nối...</p>
//                       </div>
//                     </div>
//                   ) : messages.length === 0 ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                         <h4 className="font-medium text-gray-900 mb-1">Chào mừng bạn!</h4>
//                         <p className="text-sm text-gray-500 mb-4">
//                           Chúng tôi sẵn sàng hỗ trợ bạn về các sản phẩm thuốc
//                         </p>
//                         <Badge variant="secondary" className="text-xs">
//                           Nhắn tin để bắt đầu
//                         </Badge>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {messages.map((message) => (
//                         <ChatMessage key={message._id} message={message} isCurrentUser={message.sender === userId} />
//                       ))}
//                       <div ref={messagesEndRef} />
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-t bg-white">
//                   <ChatInput
//                     onSendMessage={handleSendMessage}
//                     disabled={isSending || isLoading}
//                     placeholder={!currentRoom ? "Nhập tin nhắn để bắt đầu..." : "Nhập tin nhắn..."}
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </Card>
//     </div>
//   )
// }
// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ChatMessage } from "./chat-message"
// import { ChatInput } from "./chat-input"
// import { PrescriptionUpload } from "./prescription-upload"
// import { useChatSocket } from "@/hooks/chat/use-chat-socket.hooks"
// import { MessageCircle, X, Minimize2, Maximize2, FileImage, ArrowLeft } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { sendPrescriptionWithAxios } from "@/api/chat/chat.api"
// import type { ISendPrescriptionPayload, IMedicine } from "@/interface/auth/chat.interface"

// interface ChatBoxProps {
//   userId?: string
//   className?: string
//   defaultMinimized?: boolean
//   enablePrescription?: boolean
// }

// export function ChatBox({
//   userId = "user-123",
//   className,
//   defaultMinimized = true,
//   enablePrescription = true,
// }: ChatBoxProps) {
//   const [isOpen, setIsOpen] = useState(!defaultMinimized)
//   const [isMinimized, setIsMinimized] = useState(false)
//   const [showPrescription, setShowPrescription] = useState(false)
//   const [isPrescriptionUploading, setIsPrescriptionUploading] = useState(false)
//   const [extractedMedicines, setExtractedMedicines] = useState<IMedicine[]>([])
//   const [extractedPrescriptionId, setExtractedPrescriptionId] = useState<string>("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const { currentRoom, messages, isLoading, isSending, isConnected, startChat, sendMessage } = useChatSocket({
//     userId,
//     onNewMessage: () => {
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//       }, 100)
//     },
//   })

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSendMessage = async (message: string) => {
//     if (!currentRoom) {
//       await startChat(message)
//     } else {
//       await sendMessage(message)
//     }
//   }

//   const handlePrescriptionUpload = () => {
//     setShowPrescription(true)
//   }

//   const toggleChat = () => {
//     setIsOpen(!isOpen)
//     if (!isOpen) {
//       setIsMinimized(false)
//       setShowPrescription(false)
//     }
//   }

//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized)
//   }

//   const handlePrescriptionBack = () => {
//     setShowPrescription(false)
//   }

//   const handlePrescriptionSend = async (prescriptionData: ISendPrescriptionPayload) => {
//     try {
//       setIsPrescriptionUploading(true)
//       console.log("Uploading prescription:", prescriptionData)

//       if (!prescriptionData.roomId) {
//         throw new Error("Room ID is required for prescription upload")
//       }

//       const response = await sendPrescriptionWithAxios(prescriptionData)
//       console.log("Prescription upload response:", response)

//       if (response.data && response.data.content) {
//         const medicineText = response.data.content
//         console.log("Medicine text from API:", medicineText)

//         const extractedMeds = parseMedicineFromText(medicineText)
//         console.log("Parsed medicines:", extractedMeds)

//         if (extractedMeds.length > 0) {
//           setExtractedMedicines(extractedMeds)
//           setExtractedPrescriptionId(response.data._id || "")
//           // Don't close the prescription view here
//         }
//       }
//     } catch (error) {
//       console.error("Failed to upload prescription:", error)
//       throw error
//     } finally {
//       setIsPrescriptionUploading(false)
//     }
//   }

//   const handleStartChatForPrescription = async (message: string): Promise<void> => {
//     try {
//       await startChat(message)
//       return new Promise((resolve) => {
//         const checkRoom = () => {
//           if (currentRoom) {
//             resolve()
//           } else {
//             setTimeout(checkRoom, 100)
//           }
//         }
//         checkRoom()
//       })
//     } catch (error) {
//       console.error("Failed to start chat:", error)
//       throw error
//     }
//   }

//   const parseMedicineFromText = (text: string): IMedicine[] => {
//     const medicines: IMedicine[] = []

//     // Handle the format from your API: "Paracetamol 500 mg 10 viên, Amoxicillin 250 mg 15 viên, ..."
//     const medicineItems = text.split(",").map((item) => item.trim())

//     medicineItems.forEach((item, index) => {
//       if (item.length > 0) {
//         // Parse format like "Paracetamol 500 mg 10 viên"
//         const parts = item.trim().split(" ")

//         if (parts.length >= 2) {
//           const name = parts[0]

//           // Extract dosage (e.g., "500mg", "250mg")
//           const dosageMatch = item.match(/(\d+\s*mg|\d+\s*g)/i)

//           // Extract quantity and unit (e.g., "10 viên", "5 gói", "1 chai")
//           const quantityMatch = item.match(/(\d+)\s*(viên|gói|chai|lọ|ml)/i)

//           medicines.push({
//             id: `extracted-${Date.now()}-${index}`,
//             name: name,
//             dosage: dosageMatch ? dosageMatch[0] : "",
//             quantity: quantityMatch ? Number.parseInt(quantityMatch[1]) : 1,
//             instructions: quantityMatch ? quantityMatch[2] : "",
//             price: 0,
//           })
//         }
//       }
//     })

//     return medicines
//   }

//   const handleUpdatePrescription = async (updateData: any) => {
//     try {
//       console.log("Updating prescription:", updateData)
//       // Here you would call your update prescription API
//       // For now, we'll just send it as a regular message
//       const medicineText = updateData.medicines
//         .map((med: any) => `${med.name} ${med.dosage} - Số lượng: ${med.quantity}`)
//         .join(", ")

//       await sendMessage(`Đơn thuốc đã cập nhật: ${medicineText}`)

//       // Reset the prescription view
//       setExtractedMedicines([])
//       setExtractedPrescriptionId("")
//       setShowPrescription(false)
//     } catch (error) {
//       console.error("Failed to update prescription:", error)
//       throw error
//     }
//   }

//   const handleSendExtractedPrescription = async () => {
//     try {
//       if (extractedMedicines.length > 0) {
//         const medicineText = extractedMedicines
//           .map((med) => `${med.name} ${med.dosage} - Số lượng: ${med.quantity}`)
//           .join(", ")

//         await sendMessage(`Thông tin đơn thuốc: ${medicineText}`)

//         // Reset the prescription view
//         setExtractedMedicines([])
//         setExtractedPrescriptionId("")
//         setShowPrescription(false)
//       }
//     } catch (error) {
//       console.error("Failed to send prescription:", error)
//       throw error
//     }
//   }

//   if (!isOpen) {
//     return (
//       <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//         <Button
//           onClick={toggleChat}
//           size="lg"
//           className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//       <Card
//         className={cn(
//           "flex flex-col shadow-xl border-0 overflow-hidden transition-all duration-300",
//           showPrescription ? "w-96 h-[600px]" : "w-80 h-96",
//         )}
//       >
//         <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
//           <div className="flex items-center gap-3">
//             {showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionBack}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//             )}
//             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//               {showPrescription ? <FileImage className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
//             </div>
//             <div>
//               <h3 className="font-medium text-sm">
//                 {showPrescription ? "Quản lý đơn thuốc và hình ảnh" : "Hỗ trợ khách hàng"}
//               </h3>
//               <div className="flex items-center gap-1">
//                 <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-400" : "bg-red-400")} />
//                 <span className="text-xs opacity-90">{isConnected ? "Đang hoạt động" : "Không kết nối"}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-1">
//             {enablePrescription && !showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionUpload}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//                 title="Upload prescription"
//               >
//                 <FileImage className="h-4 w-4" />
//               </Button>
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleMinimize}
//               className="h-8 w-8 text-white hover:bg-white/20"
//             >
//               {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
//             </Button>
//             <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:bg-white/20">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {!isMinimized && (
//           <>
//             {showPrescription ? (
//               <div className="flex-1 overflow-hidden">
//                 <PrescriptionUpload
//                   onBack={handlePrescriptionBack}
//                   onSendPrescription={handlePrescriptionSend}
//                   onUpdatePrescription={handleUpdatePrescription}
//                   onSendExtractedPrescription={handleSendExtractedPrescription}
//                   roomId={currentRoom || undefined}
//                   onStartChat={handleStartChatForPrescription}
//                   isUploading={isPrescriptionUploading}
//                   extractedMedicines={extractedMedicines}
//                   prescriptionId={extractedPrescriptionId}
//                 />
//               </div>
//             ) : (
//               <>
//                 <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                   {isLoading ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
//                         <p className="text-sm text-gray-500">Đang kết nối...</p>
//                       </div>
//                     </div>
//                   ) : messages.length === 0 ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                         <h4 className="font-medium text-gray-900 mb-1">Chào mừng bạn!</h4>
//                         <p className="text-sm text-gray-500 mb-4">
//                           Chúng tôi sẵn sàng hỗ trợ bạn về các sản phẩm thuốc
//                         </p>
//                         <Badge variant="secondary" className="text-xs">
//                           Nhắn tin để bắt đầu
//                         </Badge>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {messages.map((message) => (
//                         <ChatMessage key={message._id} message={message} isCurrentUser={message.sender === userId} />
//                       ))}
//                       <div ref={messagesEndRef} />
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-t bg-white">
//                   <ChatInput
//                     onSendMessage={handleSendMessage}
//                     disabled={isSending || isLoading}
//                     placeholder={!currentRoom ? "Nhập tin nhắn để bắt đầu..." : "Nhập tin nhắn..."}
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </Card>
//     </div>
//   )
// }
// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ChatMessage } from "./chat-message"
// import { ChatInput } from "./chat-input"
// import { PrescriptionUpload } from "./prescription-upload"
// import { useChatSocket } from "@/hooks/chat/use-chat-socket.hooks"
// import { MessageCircle, X, Minimize2, Maximize2, FileImage, ArrowLeft } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { sendPrescriptionWithAxios } from "@/api/chat/chat.api"
// import type { ISendPrescriptionPayload, IMedicine } from "@/interface/auth/chat.interface"

// interface ChatBoxProps {
//   userId?: string
//   className?: string
//   defaultMinimized?: boolean
//   enablePrescription?: boolean
// }

// export function ChatBox({
//   userId = "user-123",
//   className,
//   defaultMinimized = true,
//   enablePrescription = true,
// }: ChatBoxProps) {
//   const [isOpen, setIsOpen] = useState(!defaultMinimized)
//   const [isMinimized, setIsMinimized] = useState(false)
//   const [showPrescription, setShowPrescription] = useState(false)
//   const [isPrescriptionUploading, setIsPrescriptionUploading] = useState(false)
//   const [extractedMedicines, setExtractedMedicines] = useState<IMedicine[]>([])
//   const [extractedPrescriptionId, setExtractedPrescriptionId] = useState<string>("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const { currentRoom, messages, isLoading, isSending, isConnected, startChat, sendMessage } = useChatSocket({
//     userId,
//     onNewMessage: () => {
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//       }, 100)
//     },
//   })

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSendMessage = async (message: string) => {
//     if (!currentRoom) {
//       await startChat(message)
//     } else {
//       await sendMessage(message)
//     }
//   }

//   const handlePrescriptionUpload = () => {
//     setShowPrescription(true)
//   }

//   const toggleChat = () => {
//     setIsOpen(!isOpen)
//     if (!isOpen) {
//       setIsMinimized(false)
//       setShowPrescription(false)
//     }
//   }

//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized)
//   }

//   const handlePrescriptionBack = () => {
//     setShowPrescription(false)
//   }

//   const handlePrescriptionSend = async (prescriptionData: ISendPrescriptionPayload) => {
//     try {
//       setIsPrescriptionUploading(true)
//       console.log("Uploading prescription:", prescriptionData)

//       if (!prescriptionData.roomId) {
//         throw new Error("Room ID is required for prescription upload")
//       }

//       const response = await sendPrescriptionWithAxios(prescriptionData)
//       console.log("Prescription upload response:", response)

//       if (response.data && response.data.content) {
//         const medicineText = response.data.content
//         console.log("Medicine text from API:", medicineText)

//         const extractedMeds = parseMedicineFromText(medicineText)
//         console.log("Parsed medicines:", extractedMeds)

//         if (extractedMeds.length > 0) {
//           setExtractedMedicines(extractedMeds)
//           setExtractedPrescriptionId(response.data._id || "")
//           // Don't close the prescription view here
//         }
//       }
//     } catch (error) {
//       console.error("Failed to upload prescription:", error)
//       throw error
//     } finally {
//       setIsPrescriptionUploading(false)
//     }
//   }

//   const handleStartChatForPrescription = async (message: string): Promise<void> => {
//     try {
//       await startChat(message)
//       return new Promise((resolve) => {
//         const checkRoom = () => {
//           if (currentRoom) {
//             resolve()
//           } else {
//             setTimeout(checkRoom, 100)
//           }
//         }
//         checkRoom()
//       })
//     } catch (error) {
//       console.error("Failed to start chat:", error)
//       throw error
//     }
//   }

//   // Fixed parsing function to create single medicine entry
//   const parseMedicineFromText = (text: string): IMedicine[] => {
//     // Parse the complete text as received from API
//     // Based on your Postman response, it looks like:
//     // "Paracetamol 500 mg 10 viên, Amoxicillin 250 mg 15 viên, Vitamin C 500 mg 20 viên, Oresol 5 gói, Salbutamol syrup 1 chai"
    
//     const medicines: IMedicine[] = []
//     const medicineItems = text.split(",").map(item => item.trim())

//     medicineItems.forEach((item, index) => {
//       if (item.length > 0) {
//         // Try to parse the format from your API response
//         const parts = item.trim().split(/\s+/)
        
//         if (parts.length >= 2) {
//           let name = parts[0]
//           let dosage = ""
//           let quantity = 1
//           let unit = ""

//           // Look for dosage pattern (number + mg/g)
//           const dosagePattern = /(\d+\s*(?:mg|g))/i
//           const dosageMatch = item.match(dosagePattern)
//           if (dosageMatch) {
//             dosage = dosageMatch[1]
//           }

//           // Look for quantity pattern (number + unit)
//           const quantityPattern = /(\d+)\s*(viên|gói|chai|lọ|ml)/i
//           const quantityMatch = item.match(quantityPattern)
//           if (quantityMatch) {
//             quantity = parseInt(quantityMatch[1])
//             unit = quantityMatch[2]
//           }

//           // If it's a compound medicine name (like "Salbutamol syrup")
//           if (parts.length > 1 && !dosageMatch) {
//             const nonNumericParts = parts.filter(part => !(/^\d/.test(part)))
//             name = nonNumericParts.join(" ")
//           }

//           medicines.push({
//             id: `extracted-${Date.now()}-${index}`,
//             name: name,
//             dosage: dosage,
//             quantity: quantity,
//             instructions: unit,
//             price: 0,
//           })
//         }
//       }
//     })

//     return medicines
//   }

//   const handleUpdatePrescription = async (updateData: any) => {
//     try {
//       console.log("Updating prescription:", updateData)
//       // Here you would call your update prescription API
//       // For now, we'll just send it as a regular message
//       const medicineText = updateData.medicines
//         .map((med: any) => `${med.name} ${med.dosage} - Số lượng: ${med.quantity}`)
//         .join(", ")

//       await sendMessage(`Đơn thuốc đã cập nhật: ${medicineText}`)

//       // Reset the prescription view
//       setExtractedMedicines([])
//       setExtractedPrescriptionId("")
//       setShowPrescription(false)
//     } catch (error) {
//       console.error("Failed to update prescription:", error)
//       throw error
//     }
//   }

//   const handleSendExtractedPrescription = async () => {
//     try {
//       if (extractedMedicines.length > 0) {
//         const medicineText = extractedMedicines
//           .map((med) => `${med.name} ${med.dosage} - Số lượng: ${med.quantity}`)
//           .join(", ")

//         await sendMessage(`Thông tin đơn thuốc: ${medicineText}`)

//         // Reset the prescription view
//         setExtractedMedicines([])
//         setExtractedPrescriptionId("")
//         setShowPrescription(false)
//       }
//     } catch (error) {
//       console.error("Failed to send prescription:", error)
//       throw error
//     }
//   }

//   if (!isOpen) {
//     return (
//       <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//         <Button
//           onClick={toggleChat}
//           size="lg"
//           className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className={cn("fixed bottom-4 right-4 z-50", className)}>
//       <Card
//         className={cn(
//           "flex flex-col shadow-xl border-0 overflow-hidden transition-all duration-300",
//           showPrescription ? "w-96 h-[600px]" : "w-80 h-96",
//         )}
//       >
//         <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
//           <div className="flex items-center gap-3">
//             {showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionBack}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//             )}
//             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//               {showPrescription ? <FileImage className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
//             </div>
//             <div>
//               <h3 className="font-medium text-sm">
//                 {showPrescription ? "Quản lý đơn thuốc và hình ảnh" : "Hỗ trợ khách hàng"}
//               </h3>
//               <div className="flex items-center gap-1">
//                 <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-400" : "bg-red-400")} />
//                 <span className="text-xs opacity-90">{isConnected ? "Đang hoạt động" : "Không kết nối"}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-1">
//             {enablePrescription && !showPrescription && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handlePrescriptionUpload}
//                 className="h-8 w-8 text-white hover:bg-white/20"
//                 title="Upload prescription"
//               >
//                 <FileImage className="h-4 w-4" />
//               </Button>
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleMinimize}
//               className="h-8 w-8 text-white hover:bg-white/20"
//             >
//               {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
//             </Button>
//             <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:bg-white/20">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {!isMinimized && (
//           <>
//             {showPrescription ? (
//               <div className="flex-1 overflow-hidden">
//                 <PrescriptionUpload
//                   onSendPrescription={handlePrescriptionSend}
//                   onUpdatePrescription={handleUpdatePrescription}
//                   onSendExtractedPrescription={handleSendExtractedPrescription}
//                   roomId={currentRoom || undefined}
//                   onStartChat={handleStartChatForPrescription}
//                   isUploading={isPrescriptionUploading}
//                   extractedMedicines={extractedMedicines}
//                   prescriptionId={extractedPrescriptionId}
//                 />
//               </div>
//             ) : (
//               <>
//                 <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                   {isLoading ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
//                         <p className="text-sm text-gray-500">Đang kết nối...</p>
//                       </div>
//                     </div>
//                   ) : messages.length === 0 ? (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                         <h4 className="font-medium text-gray-900 mb-1">Chào mừng bạn!</h4>
//                         <p className="text-sm text-gray-500 mb-4">
//                           Chúng tôi sẵn sàng hỗ trợ bạn về các sản phẩm thuốc
//                         </p>
//                         <Badge variant="secondary" className="text-xs">
//                           Nhắn tin để bắt đầu
//                         </Badge>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {messages.map((message) => (
//                         <ChatMessage key={message._id} message={message} isCurrentUser={message.sender === userId} />
//                       ))}
//                       <div ref={messagesEndRef} />
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-t bg-white">
//                   <ChatInput
//                     onSendMessage={handleSendMessage}
//                     disabled={isSending || isLoading}
//                     placeholder={!currentRoom ? "Nhập tin nhắn để bắt đầu..." : "Nhập tin nhắn..."}
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </Card>
//     </div>
//   )
// }
"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { PrescriptionUpload } from "./prescription-upload"
import { useChatSocket } from "@/hooks/chat/use-chat-socket.hooks"
import { MessageCircle, X, Minimize2, Maximize2, FileImage, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { sendPrescriptionWithAxios } from "@/api/chat/chat.api"
import type { ISendPrescriptionPayload, IMedicine } from "@/interface/auth/chat.interface"

interface ChatBoxProps {
  userId?: string
  className?: string
  defaultMinimized?: boolean
  enablePrescription?: boolean
}

export function ChatBox({
  userId = "user-123",
  className,
  defaultMinimized = true,
  enablePrescription = true,
}: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(!defaultMinimized)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPrescription, setShowPrescription] = useState(false)
  const [isPrescriptionUploading, setIsPrescriptionUploading] = useState(false)
  const [extractedMedicines, setExtractedMedicines] = useState<IMedicine[]>([])
  const [extractedPrescriptionId, setExtractedPrescriptionId] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { currentRoom, currentRoomData, messages, isLoading, isSending, isConnected, startChat, sendMessage, refreshMessages } = useChatSocket({
    userId,
    onNewMessage: () => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    },
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!currentRoom) {
      const room = await startChat(message)
      // After starting chat, refresh messages
      setTimeout(() => {
        refreshMessages()
      }, 500)
    } else {
      await sendMessage(message)
    }
  }

  const handlePrescriptionUpload = () => {
    setShowPrescription(true)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
      setShowPrescription(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handlePrescriptionBack = () => {
    setShowPrescription(false)
  }

  const handlePrescriptionSend = async (prescriptionData: ISendPrescriptionPayload) => {
    try {
      setIsPrescriptionUploading(true)
      console.log("Uploading prescription:", prescriptionData)
      console.log("Current room:", currentRoom)

      if (!prescriptionData.roomId) {
        throw new Error("Room ID is required for prescription upload")
      }

      // Make sure roomId is a string
      const payload = {
        ...prescriptionData,
        roomId: typeof prescriptionData.roomId === 'string' ? prescriptionData.roomId : prescriptionData.roomId
      }
      console.log("Final payload:", payload)

      const response = await sendPrescriptionWithAxios(payload)
      console.log("Prescription upload response:", response)

      if (response.data && response.data.content) {
        const medicineText = response.data.content
        console.log("Medicine text from API:", medicineText)

        const extractedMeds = parseMedicineFromText(medicineText)
        console.log("Parsed medicines:", extractedMeds)

        if (extractedMeds.length > 0) {
          setExtractedMedicines(extractedMeds)
          setExtractedPrescriptionId(response.data._id || "")
          // Refresh messages to show the new prescription message
          setTimeout(() => {
            refreshMessages()
          }, 500)
        }
      }
    } catch (error) {
      console.error("Failed to upload prescription:", error)
      throw error
    } finally {
      setIsPrescriptionUploading(false)
    }
  }

  const handleStartChatForPrescription = async (message: string): Promise<void> => {
    try {
      const room = await startChat(message)
      return new Promise((resolve) => {
        const checkRoom = () => {
          if (currentRoom) {
            resolve()
          } else {
            setTimeout(checkRoom, 100)
          }
        }
        checkRoom()
      })
    } catch (error) {
      console.error("Failed to start chat:", error)
      throw error
    }
  }

  // Fixed parsing function to create single medicine entry
  const parseMedicineFromText = (text: string): IMedicine[] => {
    // Parse the complete text as received from API
    // Based on your Postman response, it looks like:
    // "Paracetamol 500 mg 10 viên, Amoxicillin 250 mg 15 viên, Vitamin C 500 mg 20 viên, Oresol 5 gói, Salbutamol syrup 1 chai"
    
    const medicines: IMedicine[] = []
    const medicineItems = text.split(",").map(item => item.trim())

    medicineItems.forEach((item, index) => {
      if (item.length > 0) {
        // Try to parse the format from your API response
        const parts = item.trim().split(/\s+/)
        
        if (parts.length >= 2) {
          let name = parts[0]
          let dosage = ""
          let quantity = 1
          let unit = ""

          // Look for dosage pattern (number + mg/g)
          const dosagePattern = /(\d+\s*(?:mg|g))/i
          const dosageMatch = item.match(dosagePattern)
          if (dosageMatch) {
            dosage = dosageMatch[1]
          }

          // Look for quantity pattern (number + unit)
          const quantityPattern = /(\d+)\s*(viên|gói|chai|lọ|ml)/i
          const quantityMatch = item.match(quantityPattern)
          if (quantityMatch) {
            quantity = parseInt(quantityMatch[1])
            unit = quantityMatch[2]
          }

          // If it's a compound medicine name (like "Salbutamol syrup")
          if (parts.length > 1 && !dosageMatch) {
            const nonNumericParts = parts.filter(part => !(/^\d/.test(part)))
            name = nonNumericParts.join(" ")
          }

          medicines.push({
            id: `extracted-${Date.now()}-${index}`,
            name: name,
            dosage: dosage,
            quantity: quantity,
            instructions: unit,
            price: 0,
          })
        }
      }
    })

    return medicines
  }

  const handleUpdatePrescription = async (updateData: any) => {
    try {
      console.log("Updating prescription:", updateData)
      // Here you would call your update prescription API
      // For now, we'll just send it as a regular message
      const medicineText = updateData.medicines
        .map((med: any) => `${med.name} ${med.dosage} - Số lượng: ${med.quantity}`)
        .join(", ")

      await sendMessage(`Đơn thuốc đã cập nhật: ${medicineText}`)

      // Reset the prescription view
      setExtractedMedicines([])
      setExtractedPrescriptionId("")
      setShowPrescription(false)
    } catch (error) {
      console.error("Failed to update prescription:", error)
      throw error
    }
  }

  const handleSendExtractedPrescription = async () => {
    try {
      if (extractedMedicines.length > 0) {
        const medicineText = extractedMedicines
          .map((med) => `${med.name} ${med.dosage} - Số lượng: ${med.quantity}`)
          .join(", ")

        await sendMessage(`Thông tin đơn thuốc: ${medicineText}`)

        // Reset the prescription view
        setExtractedMedicines([])
        setExtractedPrescriptionId("")
        setShowPrescription(false)
      }
    } catch (error) {
      console.error("Failed to send prescription:", error)
      throw error
    }
  }

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <Card
        className={cn(
          "flex flex-col shadow-xl border-0 overflow-hidden transition-all duration-300",
          showPrescription ? "w-96 h-[600px]" : "w-80 h-96",
        )}
      >
        <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
          <div className="flex items-center gap-3">
            {showPrescription && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrescriptionBack}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              {showPrescription ? <FileImage className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
            </div>
            <div>
              <h3 className="font-medium text-sm">
                {showPrescription ? "Quản lý đơn thuốc và hình ảnh" : "Hỗ trợ khách hàng"}
              </h3>
              <div className="flex items-center gap-1">
                <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-400" : "bg-red-400")} />
                <span className="text-xs opacity-90">{isConnected ? "Đang hoạt động" : "Không kết nối"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {enablePrescription && !showPrescription && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrescriptionUpload}
                className="h-8 w-8 text-white hover:bg-white/20"
                title="Upload prescription"
              >
                <FileImage className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimize}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {showPrescription ? (
              <div className="flex-1 overflow-hidden">
                <PrescriptionUpload
                  roomId={currentRoom}
                  onSendPrescription={handlePrescriptionSend}
                  onUpdatePrescription={handleUpdatePrescription}
                  onSendExtractedPrescription={handleSendExtractedPrescription}
                  onStartChat={handleStartChatForPrescription}
                  isUploading={isPrescriptionUploading}
                  extractedMedicines={extractedMedicines}
                  prescriptionId={extractedPrescriptionId}
                />
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-500">Đang kết nối...</p>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h4 className="font-medium text-gray-900 mb-1">Chào mừng bạn!</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Chúng tôi sẵn sàng hỗ trợ bạn về các sản phẩm thuốc
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          Nhắn tin để bắt đầu
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <ChatMessage key={message._id} message={message} isCurrentUser={message.sender === userId} />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                <div className="border-t bg-white">
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    disabled={isSending || isLoading}
                    placeholder={!currentRoom ? "Nhập tin nhắn để bắt đầu..." : "Nhập tin nhắn..."}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  )
}