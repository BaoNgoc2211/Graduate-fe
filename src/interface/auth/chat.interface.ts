// export interface IChatRoom {
//   _id: string
//   user: string
//   staff?: string
//   isHandled: boolean
//   status: "open" | "closed"
//   lastMessage?: string
//   createdAt: string
//   updatedAt: string
// }

// export interface IMessage {
//   _id: string
//   room: string
//   content: string
//   sender: string
//   senderType: "user" | "staff"
//   createdAt: string
//   updatedAt: string
// }

// export interface IStartChatPayload {
//   message: string
// }

// export interface ISendMessagePayload {
//   roomId: string
//   content: string
//   senderId: string
// }

// export interface IStartChatResponse {
//   room: IChatRoom
//   newMessage: IMessage
// }

// export interface ISendPrescriptionPayload {
//   image: File
//   roomId: string 
// }

// export interface IUpdatePrescriptionPayload {
//   prescriptionId: string
//   medicines: IMedicine[]
//   roomId: string
// }

// export interface IMedicine {
//   id: string
//   name: string
//   dosage: string
//   quantity: number
//   instructions: string
//   price?: number
// }

// export interface IPrescriptionMessage extends IMessage {
//   type: "prescription"
//   prescriptionData?: {
//     id: string
//     medicines: IMedicine[]
//     imageUrl: string
//     status: "pending" | "processed" | "updated"
//   }
// }
export interface IChatRoom {
  _id: string
  user: string
  staff?: string
  isHandled: boolean
  status: "open" | "closed"
  lastMessage?: string
  createdAt: string
  updatedAt: string
}

export interface IMessage {
  _id: string
  room: string
  content: string
  sender: string
  senderType: "user" | "staff"
  createdAt: string
  updatedAt: string
}

export interface IStartChatPayload {
  message: string
}

export interface ISendMessagePayload {
  roomId: string
  content: string
  senderId: string
}

export interface IStartChatResponse {
  room: IChatRoom
  newMessage: IMessage
}

// Fixed: roomId should be string, not object
export interface ISendPrescriptionPayload {
  image: File
  roomId: string  // Changed from roomId: IChatRoom to roomId: string
}

export interface IUpdatePrescriptionPayload {
  prescriptionId: string
  medicines: IMedicine[]
  roomId: string
}

export interface IMedicine {
  id: string
  name: string
  dosage: string
  quantity: number
  instructions: string
  price?: number
}

export interface IPrescriptionMessage extends IMessage {
  type: "prescription"
  prescriptionData?: {
    id: string
    medicines: IMedicine[]
    imageUrl: string
    status: "pending" | "processed" | "updated"
  }
}

// Add response interface for prescription upload
export interface IPrescriptionResponse {
  _id: string
  content: string
  message: string
  room: string
  sender: string
  senderType: "user" | "staff"
  createdAt: string
  updatedAt: string
}