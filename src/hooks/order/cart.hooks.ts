import type { ICart } from "@/interface/order/cart.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCartAPI,
  clearCartAPI,
  getAllCartAPI,
  removeCartAPI,
  updateCartAPI,
} from "@/api/cart/cart.api";
import { toast } from "sonner";

export const useCarts = () => {
  return useQuery<{ data: ICart[] }>({
    queryKey: ["cart"],
    queryFn: getAllCartAPI,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-Cart"],
    mutationFn: ({
      medicine_id,
      quantity,
    }: {
      medicine_id: string;
      quantity: number;
    }) => addToCartAPI({ medicine_id, quantity }),
    onSuccess: () => {
      toast.success("Đã thêm vào giỏ hàng", { duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Thêm vào giỏ hàng thất bại: " , {
        duration: 2000,
      });
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      medicine_id,
      quantity,
    }: {
      medicine_id: string;
      quantity: number;
    }) => updateCartAPI(medicine_id, quantity),
    onSuccess: () => {
      toast.success("Cập nhật giỏ hàng thành công!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      console.error("Lỗi cập nhật: ");
      toast.error("Cập nhật giỏ hàng thất bại: " );
    },
  });
};

export const useRemoveCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove-medicine"],
    mutationFn: ({ medicine_id }: { medicine_id: string }) => {
      return removeCartAPI(medicine_id);
    },
    onSuccess: () => {
      toast.success(" Đã xoá sản phẩm khỏi giỏ hàng!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      console.error("Remove cart error:");
      toast.error(" Xoá sản phẩm thất bại: ");
    },
  });
};
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCartAPI(),
    onSuccess: () => {
      toast.success("Đã xoá toàn bộ giỏ hàng!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Có lỗi xảy ra";
      console.error("Clear cart error:", error);
      toast.error("Xoá giỏ hàng thất bại: " + errorMessage);
    },
  });
};
//#endregion
//#region 
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   addToCartAPI,
//   clearCartAPI,
//   getAllCartAPI,
//   removeCartAPI,
//   updateCartAPI,
// } from "@/api/cart/cart.api";
// import { toast } from "sonner";
// import { ICart } from "@/interface/order/cart.interface";

// export const useCarts = () => {
//   return useQuery<{ data: ICart[] }>({
//     queryKey: ["cart"],
//     queryFn: getAllCartAPI,
//   });
// };

// export const useAddToCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["add-Cart"],
//     mutationFn: ({
//       medicine_id,
//       quantity,
//     }: {
//       medicine_id: string;
//       quantity: number;
//     }) => addToCartAPI({ medicine_id, quantity }),
//     onSuccess: () => {
//       toast.success("Added to cart successfully", { duration: 2000 });
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//     onError: (error: unknown) => {
//       const err = error as { message: string };
//       toast.error("Failed to add to cart: " + err.message, {
//         duration: 2000,
//       });
//     },
//   });
// };

// export const useUpdateCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       medicine_id,
//       quantity,
//     }: {
//       medicine_id: string;
//       quantity: number;
//     }) => updateCartAPI(medicine_id, quantity),
//     onSuccess: () => {
//       toast.success("Cart updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//     onError: (error) => {
//       console.error("Update error: ", error);
//       toast.error("Failed to update cart!");
//     },
//   });
// };

// export const useRemoveCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (medicine_id: string) => removeCartAPI(medicine_id),
//     onSuccess: () => {
//       toast.success("Item removed from cart!");
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//     onError: () => toast.error("Failed to remove item!"),
//   });
// };

// export const useClearCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => clearCartAPI(),
//     onSuccess: () => {
//       toast.success("Cart cleared successfully!");
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//     onError: () => toast.error("Failed to clear cart!"),
//   });
// };
//#endregion
