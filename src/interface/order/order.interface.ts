import mongoose from "mongoose";
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
  OrderStatus
} from "@/enum/order/order.enum";

export interface IOrder {
  user_id: mongoose.Types.ObjectId;
  IInfo: IInfo;
  voucher_id: mongoose.Types.ObjectId;
  shipping_id: mongoose.Types.ObjectId;
  status: OrderStatus;
  totalAmount: number;
  finalAmount?: number;
  paymentMethod: PaymentMethodEnum;
  paymentStatus: PaymentStatusEnum;
  orderDetail: mongoose.Types.ObjectId[];
}
export interface IInfo {
  address: string;
  phone: string;
  name: string;
}
