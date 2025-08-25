"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type {
  ICheckoutPayload,
  IOrderReview,
  ICheckoutResponse,
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
    enabled: !!id,
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
      console.error("Review order error:", error);
      toast.error("Lỗi khi lấy thông tin đơn hàng");
    },
  });
};

export const useCheckoutOrder = () => {
  const router = useRouter();

  return useMutation<ICheckoutResponse, Error, ICheckoutPayload>({
    mutationKey: ["checkout-order"],
    mutationFn: (payload) => checkoutAPI(payload),
    onSuccess: (data) => {
      if (!data.paymentUrl) {
        toast.success("Đặt hàng thành công!");
        const orderInfo = {
          orderId: data.orderId || `ORD-${Date.now().toString().slice(-6)}`,
          success: true,
          paymentMethod: "COD"
        };
        localStorage.setItem("orderSuccess", JSON.stringify(orderInfo));
        
        router.push("/order-success");
      } 
      else {
        if (data.success) {
          toast.success("Đang chuyển đến trang thanh toán...");
          
          const pendingPayment = {
            orderId: data.orderId,
            paymentUrl: data.paymentUrl,
            timestamp: Date.now()
          };
          localStorage.setItem("pendingPayment", JSON.stringify(pendingPayment));
          
          window.location.href = data.paymentUrl;
      
      } else {
        throw new Error(data.message || "Đặt hàng thất bại");
      }
    }
  },
    
    onError: (error) => {
      console.error("Checkout error:", error);
      toast.error("Đặt hàng thất bại");
    },
  });
};
