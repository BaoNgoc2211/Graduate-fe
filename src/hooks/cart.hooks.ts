import { getAllCartAPI } from "@/api/cart/cart.api";
import { ICart } from "@/interface/order/cart.interface";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  return useQuery<{ data: ICart[] }>({
    queryKey: ["get-all-cart"],
    queryFn: () => getAllCartAPI(),
  });
};
