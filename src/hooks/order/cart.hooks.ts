// import { ICart } from "./../interface/order/cart.interface";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import {
//   addToCartAPI,
//   clearCartAPI,
//   getAllCartAPI,
//   removeCartAPI,
//   updateCartAPI,
// } from "@/api/cart/cart.api";
// import { toast } from "sonner";

// export const useCarts = () => {
//   return useQuery<{ data: ICart[] }>({
//     queryKey: ["cart"],
//     queryFn: getAllCartAPI,
//   });
// };
// export const useAddToCart = () => {
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
//       toast.success("Đã thêm vào giỏ hàng", { duration: 2000 });
//     },
//     onError: (error: unknown) => {
//       const err = error as { message: string };
//       toast.error("Thêm vào giỏ hàng thất bại: " + err.message, {
//         duration: 2000,
//       });
//     },
//   });
// };
// export const useUpdateCart = () => {
//   return useMutation({
//     mutationFn: ({
//       medicine_id,
//       quantity,
//     }: {
//       medicine_id: string;
//       quantity: number;
//     }) => updateCartAPI(medicine_id, quantity),
//     onSuccess: () => {
//       toast.success("Cập nhật giỏ hàng thành công!");
//     },
//     onError: (error) => {
//       console.error("Lỗi cập nhật: ", error);
//       toast.error("Cập nhật giỏ hàng thất bại!");
//     },
//   });
// };
// export const useRemoveCart = () => {
//   return useMutation({
//     mutationFn: (medicine_id: string) => removeCartAPI(medicine_id),
//     onSuccess: () => {
//       toast.success("Đã xoá sản phẩm khỏi giỏ hàng!");
//     },
//     onError: () => toast.error("Xoá thất bại!"),
//   });
// };
// export const useClearCart = () => {
//   return useMutation({
//     mutationFn: () => clearCartAPI(),
//     onSuccess: () => {
//       toast.success("Đã xoá toàn bộ giỏ hàng!");
//     },
//     onError: () => toast.error("Xoá giỏ hàng thất bại!"),
//   });
// };
import type { ICart } from "@/interface/order/cart.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCartAPI,
  clearCartAPI,
  getAllCartAPI,
  removeCartAPI,
  RemoveCartPayload,
  RemoveCartResponse,
  updateCartAPI,
} from "@/api/cart/cart.api";
import { toast } from "sonner";

export const useCarts = () => {
  return useQuery<{ data: ICart[] }>({
    queryKey: ["cart"],
    queryFn: getAllCartAPI,
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
    onError: (error: unknown) => {
      const err = error as { message: string };
      toast.error("Thêm vào giỏ hàng thất bại: " + err.message, {
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
    onError: (error) => {
      console.error("Lỗi cập nhật: ", error);
      toast.error("Cập nhật giỏ hàng thất bại!");
    },
  });
};

export const useRemoveCart = () => {
  const queryClient = useQueryClient();

  return useMutation<RemoveCartResponse, unknown, RemoveCartPayload>({
    mutationKey: ["remove-medicine"],
    mutationFn: removeCartAPI,
    onSuccess: () => {
      toast.success("🗑️ Đã xoá sản phẩm khỏi giỏ hàng!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("❌ Xoá sản phẩm thất bại!");
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
    onError: () => toast.error("Xoá giỏ hàng thất bại!"),
  });
};
