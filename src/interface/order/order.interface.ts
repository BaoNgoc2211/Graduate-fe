export interface ICheckoutPayload {
  selectItemIds: string[];
  shippingId?: string;
  paymentMethod?: string;
  voucherCode?: string;
}

export interface IOrderItem {
  medicine_id: string;
  stock_id: string;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  note?: string;
}

export interface IOrder {
  _id: string;
  user_id: string;
  shipping_id: string;
  voucher_id?: string;
  status: string;
  totalAmount: number;
  finalAmount: number;
  orderDetail: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderReview {
  userInfo: {
    name: string;
    phone: string;
    address: string;
  };
  orderItemsReview: IOrderItem[];
  shipping: {
    _id: string;
    type: string;
    price: number;
    createdAt: string;
    updatedAt: string;
  };
  totalAmount: number;
  paymentMethod: string;
}

// Response từ checkout API
export interface ICheckoutResponse {
  success: boolean;
  paymentUrl?: string;
  message?: string;
  orderId?: string;
  paymentMethod?: string;
}

// Checkout session data interface
export interface ICheckoutSession {
  selectedItems: string[];
  shippingMethodId?: string;
  paymentMethod?: string;
  voucherId?: string;
  totalAmount: number;
  shippingPrice: number;
  discountAmount: number;
  finalAmount: number;
}