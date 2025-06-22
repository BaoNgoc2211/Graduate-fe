export interface ICart {
  _id?: string;
  user_id: string;
  medicine_item: ICartItem;
  quantity?: number;
}
export interface ICartItem {
  medicine_id: {
    _id: string;
    name: string;
    price: number;
    thumbnail: string;
  };
  quantity: number;
}
