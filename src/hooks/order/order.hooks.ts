"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type {
  ICheckoutPayload,
  IOrderReview,
} from "@/interface/order/order.interface";
import {
  checkAllOrderStatusAPI,
  checkOrderByStatusAPI,
  checkoutAPI,
  getAllOrdersAPI,
  getOrderByIdAPI,
  reviewOrderAPI,
} from "@/api/cart/order.api";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdersAPI,
  });
};
export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderByIdAPI(id),
    enabled: !!id, // tránh gọi khi chưa có id
  });
};
export const useOrderStatusAll = () => {
  return useQuery({
    queryKey: ["order-status-all"],
    queryFn: checkAllOrderStatusAPI,
  });
};

export const useOrderByStatus = (userId: string, status: string) => {
  return useQuery({
    queryKey: ["order-status", userId, status],
    queryFn: () => checkOrderByStatusAPI({ userId, status }),
    enabled: !!userId && !!status,
  });
};
export const useReviewOrder = () => {
  return useMutation<IOrderReview, Error, ICheckoutPayload>({
    mutationKey: ["review-order"],
    mutationFn: (payload) => reviewOrderAPI(payload),
    onSuccess: () => {
      toast.success("Lấy thông tin đơn hàng thành công");
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi lấy đơn hàng");
    },
  });
};

export const useCheckoutOrder = () => {
  const router = useRouter();

  return useMutation<IOrderReview, Error, ICheckoutPayload>({
    mutationKey: ["checkout-order"],
    mutationFn: (payload) => checkoutAPI(payload),
    onSuccess: () => {
      toast.success("Đặt hàng thành công!");
      // Clear checkout data from localStorage
      localStorage.removeItem("checkoutData");
      router.push("/order/success");
    },
    onError: (error) => {
      toast.error(error.message || "Đặt hàng thất bại");
    },
  });
};
