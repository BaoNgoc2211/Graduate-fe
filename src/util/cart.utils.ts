import { ICart } from "@/interface/order/cart.interface";

export const getCartCount = (cart: ICart): number => {
  if (!cart || !cart.medicine_item) return 0;

  return cart.medicine_item.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};
