// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { reviewOrderAPI, checkoutAPI } from "@/api/cart/order.api";
// import {
//   ICheckoutPayload,
//   IOrderReview,
// } from "@/interface/order/order.interface";

// export const useReviewOrder = () => {
//   return useMutation<IOrderReview, Error, ICheckoutPayload>({
//     mutationKey: ["review-order"],
//     mutationFn: (payload) => reviewOrderAPI(payload),
//     onSuccess: () => {
//       toast.success("Lấy thông tin đơn hàng thành công", { duration: 2000 });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Lỗi khi lấy đơn hàng", { duration: 2000 });
//     },
//   });
// };
// export const useCheckoutOrder = () => {
//   const router = useRouter();

//   return useMutation<IOrderReview, Error, ICheckoutPayload>({
//     mutationKey: ["checkout-order"],
//     mutationFn: (payload) => checkoutAPI(payload),
//     onSuccess: () => {
//       toast.success("Đặt hàng thành công!", { duration: 2000 });
//       router.push("/order/success");
//     },
//     onError: (error) => {
//       toast.error(error.message || "Đặt hàng thất bại", { duration: 2000 });
//     },
//   });
// };
// "use client"

// import { useMutation, useQuery } from "@tanstack/react-query"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { reviewOrderAPI, checkoutAPI, getShippingMethodsAPI } from "@/api/order/order.api"
// import type { ICheckoutPayload, IOrderReview } from "@/interface/order/order.interface"

// /**
//  * Hook lấy danh sách phương thức vận chuyển
//  */
// export const useShippingMethods = () => {
//   return useQuery({
//     queryKey: ["shipping-methods"],
//     queryFn: getShippingMethodsAPI,
//   })
// }

// /**
//  * Hook xem trước đơn hàng
//  */
// export const useReviewOrder = () => {
//   return useMutation<IOrderReview, Error, ICheckoutPayload>({
//     mutationKey: ["review-order"],
//     mutationFn: (payload) => reviewOrderAPI(payload),
//     onSuccess: () => {
//       toast.success("Lấy thông tin đơn hàng thành công")
//     },
//     onError: (error) => {
//       toast.error(error.message || "Lỗi khi lấy đơn hàng")
//     },
//   })
// }

// /**
//  * Hook thực hiện đặt hàng
//  */
// export const useCheckoutOrder = () => {
//   const router = useRouter()

//   return useMutation<IOrderReview, Error, ICheckoutPayload>({
//     mutationKey: ["checkout-order"],
//     mutationFn: (payload) => checkoutAPI(payload),
//     onSuccess: () => {
//       toast.success("Đặt hàng thành công!")
//       // Clear checkout data from localStorage
//       localStorage.removeItem("checkoutData")
//       router.push("/order/success")
//     },
//     onError: (error) => {
//       toast.error(error.message || "Đặt hàng thất bại")
//     },
//   })
// }

"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { ICheckoutPayload, IOrderReview } from "@/interface/order/order.interface"
import { checkoutAPI, reviewOrderAPI } from "@/api/cart/order.api"

export const useReviewOrder = () => {
  return useMutation<IOrderReview, Error, ICheckoutPayload>({
    mutationKey: ["review-order"],
    mutationFn: (payload) => reviewOrderAPI(payload),
    onSuccess: () => {
      toast.success("Lấy thông tin đơn hàng thành công")
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi lấy đơn hàng")
    },
  })
}

export const useCheckoutOrder = () => {
  const router = useRouter()

  return useMutation<IOrderReview, Error, ICheckoutPayload>({
    mutationKey: ["checkout-order"],
    mutationFn: (payload) => checkoutAPI(payload),
    onSuccess: () => {
      toast.success("Đặt hàng thành công!")
      // Clear checkout data from localStorage
      localStorage.removeItem("checkoutData")
      router.push("/order/success")
    },
    onError: (error) => {
      toast.error(error.message || "Đặt hàng thất bại")
    },
  })
}
