export interface ICart {
  user_id: string;
  medicine_item: {
    _id: string;
    thumbnail: string;
    name: string;
    price: number;
    quantity: number;
  };
  totalItems: number;
  totalPrice: number;
}
