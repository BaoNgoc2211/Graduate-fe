import mongoose from "mongoose";

export interface ICart {
  user_id: mongoose.Types.ObjectId;
  medicine_item: ICartItem[];
  totalItems: number;
  totalPrice: number;
}
export interface ICartItem {
  medicine_id: mongoose.Types.ObjectId;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
}
