
// export interface IOrderItem {
//   _id: string;
//   medicine_id: {
//     _id: string;
//     name: string;
//     code: string;
//     thumbnail: string;
//     dosageForm: string;
//   };
//   stock_id: {
//     _id: string;
//     sellingPrice: number;
//   };
//   quantity: number;
//   price: number;
//   totalAmount: number;
//   note?: string;
// }

// export interface IOrder {
//   _id: string;
//   user_id: {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//   };
//   orderItems: IOrderItem[];
//   totalAmount: number;
//   shippingFee: number;
//   discount: number;
//   finalAmount: number;
//   status: OrderStatus;
//   paymentMethod: string;
//   shippingMethod: string;
//   shippingAddress: {
//     name: string;
//     phone: string;
//     address: string;
//     city: string;
//     district: string;
//     ward: string;
//   };
//   orderDate: string;
//   estimatedDelivery?: string;
//   deliveredDate?: string;
//   cancelledDate?: string;
//   cancelReason?: string;
//   trackingNumber?: string;
//   isReviewed?: boolean;
//   notes?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IOrderStats {
//   total: number;
//   pending: number;
//   awaiting: number;
//   shipping: number;
//   completed: number;
//   cancelled: number;
// }

// export type OrderStatus =
//   | "Pending Confirmation"
//   | "Awaiting Shipment" 
//   | "Shipping"
//   | "Completed"
//   | "Cancelled";

// // Updated STATUS mapping theo backend Vietnam
// export const ORDER_STATUSES: { 
//   value: OrderStatus; 
//   label: string; 
//   color: string;
//   apiValue: string;
//   backendDisplay: string; // Vietnamese display từ backend
// }[] = [
//   { 
//     value: "Pending Confirmation", 
//     label: "Chờ xác nhận", 
//     color: "bg-yellow-100 text-yellow-800",
//     apiValue: "pending",
//     backendDisplay: "đang chờ xác nhận"
//   },
//   { 
//     value: "Awaiting Shipment", 
//     label: "Chờ giao hàng", 
//     color: "bg-blue-100 text-blue-800",
//     apiValue: "confirmed",
//     backendDisplay: "xác nhận"
//   },
//   { 
//     value: "Shipping", 
//     label: "Đang giao", 
//     color: "bg-purple-100 text-purple-800",
//     apiValue: "delivering",
//     backendDisplay: "đang giao"
//   },
//   { 
//     value: "Completed", 
//     label: "Hoàn thành", 
//     color: "bg-green-100 text-green-800",
//     apiValue: "completed",
//     backendDisplay: "hoàn thành"
//   },
//   { 
//     value: "Cancelled", 
//     label: "Đã hủy", 
//     color: "bg-red-100 text-red-800",
//     apiValue: "cancelled",
//     backendDisplay: "huỷ"
//   },
// ];

// // Helper functions
// export const getOrderStatusInfo = (status: OrderStatus) => {
//   return ORDER_STATUSES.find(s => s.value === status);
// };

// // Map từ backend Vietnamese display sang frontend status
// export const mapStatusFromAPI = (apiStatus: string): OrderStatus => {
//   const statusMap: { [key: string]: OrderStatus } = {
//     "đang chờ xác nhận": "Pending Confirmation",
//     "xác nhận": "Awaiting Shipment", 
//     "đang giao": "Shipping",
//     "hoàn thành": "Completed",
//     "huỷ": "Cancelled"
//   };
  
//   return statusMap[apiStatus] || apiStatus as OrderStatus;
// };

// // Map từ frontend status sang backend API endpoint
// export const mapStatusToAPI = (frontendStatus: OrderStatus): string => {
//   const statusInfo = ORDER_STATUSES.find(s => s.value === frontendStatus);
//   return statusInfo?.apiValue || frontendStatus.toLowerCase();
// };

// // Debug helper để log status mapping
// export const debugStatusMapping = () => {
//   console.table(ORDER_STATUSES.map(status => ({
//     Frontend: status.value,
//     Label: status.label, 
//     BackendAPI: status.apiValue,
//     BackendDisplay: status.backendDisplay,
//     Endpoint: `/api/order/status/${status.apiValue}`
//   })));
// };
export interface IOrderItem {
  _id: string;
  medicine_id: {
    _id: string;
    name: string;
    code: string;
    thumbnail: string;
    dosageForm: string;
  };
  stock_id: {
    _id: string;
    sellingPrice: number;
  };
  quantity: number;
  price: number;
  totalAmount: number;
  note?: string;
}

export interface IOrder {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orderItems: IOrderItem[];
  totalAmount: number;
  shippingFee: number;
  discount: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingMethod: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  orderDate: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  cancelledDate?: string;
  cancelReason?: string;
  trackingNumber?: string;
  isReviewed?: boolean;
  notes?: string;
  orderDetailId?: string; // Thêm field này để reference đến orderDetail
  createdAt: string;
  updatedAt: string;
}

export interface IOrderStats {
  total: number;
  pending: number;
  awaiting: number;
  shipping: number;
  completed: number;
  cancelled: number;
}

export type OrderStatus =
  | "Pending Confirmation"
  | "Awaiting Shipment" 
  | "Shipping"
  | "Completed"
  | "Cancelled";

// Updated STATUS mapping theo backend Vietnam
export const ORDER_STATUSES: { 
  value: OrderStatus; 
  label: string; 
  color: string;
  apiValue: string;
  backendDisplay: string; // Vietnamese display từ backend
}[] = [
  { 
    value: "Pending Confirmation", 
    label: "Chờ xác nhận", 
    color: "bg-yellow-100 text-yellow-800",
    apiValue: "pending",
    backendDisplay: "đang chờ xác nhận"
  },
  { 
    value: "Awaiting Shipment", 
    label: "Chờ giao hàng", 
    color: "bg-blue-100 text-blue-800",
    apiValue: "confirmed",
    backendDisplay: "xác nhận"
  },
  { 
    value: "Shipping", 
    label: "Đang giao", 
    color: "bg-purple-100 text-purple-800",
    apiValue: "delivering",
    backendDisplay: "đang giao"
  },
  { 
    value: "Completed", 
    label: "Hoàn thành", 
    color: "bg-green-100 text-green-800",
    apiValue: "completed",
    backendDisplay: "hoàn thành"
  },
  { 
    value: "Cancelled", 
    label: "Đã hủy", 
    color: "bg-red-100 text-red-800",
    apiValue: "cancelled",
    backendDisplay: "huỷ"
  },
];

// Helper functions
export const getOrderStatusInfo = (status: OrderStatus) => {
  return ORDER_STATUSES.find(s => s.value === status);
};

// Map từ backend Vietnamese display sang frontend status
export const mapStatusFromAPI = (apiStatus: string): OrderStatus => {
  const statusMap: { [key: string]: OrderStatus } = {
    "đang chờ xác nhận": "Pending Confirmation",
    "xác nhận": "Awaiting Shipment", 
    "đang giao": "Shipping",
    "hoàn thành": "Completed",
    "huỷ": "Cancelled"
  };
  
  return statusMap[apiStatus] || apiStatus as OrderStatus;
};

// Map từ frontend status sang backend API endpoint
export const mapStatusToAPI = (frontendStatus: OrderStatus | string): string => {
  const statusInfo = ORDER_STATUSES.find(s => s.value === frontendStatus);
  return statusInfo?.apiValue || frontendStatus.toLowerCase();
};

// Debug helper để log status mapping
export const debugStatusMapping = () => {
  console.table(ORDER_STATUSES.map(status => ({
    Frontend: status.value,
    Label: status.label, 
    BackendAPI: status.apiValue,
    BackendDisplay: status.backendDisplay,
    Endpoint: `/api/order/status/${status.apiValue}`
  })));
};