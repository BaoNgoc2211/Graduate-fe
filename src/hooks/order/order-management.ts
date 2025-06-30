"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getAllOrdersAPI,
  getOrderByIdAPI,
  checkAllOrderStatusAPI,
  checkOrderByStatusAPI,
  getOrdersByStatusAPI,
  getOrderStatsAPI,
  cancelOrderAPI,
  updateOrderStatusAPI,
  getOrdersByUserAPI,
  searchOrdersAPI,
} from "@/api/cart/order-management.api"

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdersAPI,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderByIdAPI(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useOrderStatusAll = () => {
  return useQuery({
    queryKey: ["order-status-all"],
    queryFn: checkAllOrderStatusAPI,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useOrderByStatus = (userId: string, status: string) => {
  return useQuery({
    queryKey: ["order-status", userId, status],
    queryFn: () => checkOrderByStatusAPI({ userId, status }),
    enabled: !!userId && !!status,
    staleTime: 3 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useOrdersByStatus = (status: string) => {
  return useQuery({
    queryKey: ["orders-by-status", status],
    queryFn: () => getOrdersByStatusAPI(status),
    enabled: !!status,
    staleTime: 3 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useOrderStats = () => {
  return useQuery({
    queryKey: ["order-stats"],
    queryFn: getOrderStatsAPI,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useOrdersByUser = (userId: string) => {
  return useQuery({
    queryKey: ["orders-by-user", userId],
    queryFn: () => getOrdersByUserAPI(userId),
    enabled: !!userId,
    staleTime: 3 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useSearchOrders = (searchTerm: string) => {
  return useQuery({
    queryKey: ["search-orders", searchTerm],
    queryFn: () => searchOrdersAPI(searchTerm),
    enabled: !!searchTerm && searchTerm.length >= 2,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  })
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) => cancelOrderAPI(orderId, reason),
    onSuccess: (data) => {
      toast.success("Hủy đơn hàng thành công!")
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order-stats"] })
      queryClient.invalidateQueries({ queryKey: ["orders-by-status"] })
      queryClient.invalidateQueries({ queryKey: ["order", data._id] })
    },
    onError: (error: Error) => {
      console.error("Cancel order error:", error)
      toast.error(error.message || "Hủy đơn hàng thất bại!")
    },
  })
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) => updateOrderStatusAPI(orderId, status),
    onSuccess: (data) => {
      toast.success("Cập nhật trạng thái đơn hàng thành công!")
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order-stats"] })
      queryClient.invalidateQueries({ queryKey: ["orders-by-status"] })
      queryClient.invalidateQueries({ queryKey: ["order", data._id] })
    },
    onError: (error: Error) => {
      console.error("Update order status error:", error)
      toast.error(error.message || "Cập nhật trạng thái đơn hàng thất bại!")
    },
  })
}
