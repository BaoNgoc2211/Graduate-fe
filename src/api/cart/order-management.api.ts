import { IOrder, IOrderStats } from "@/interface/order/order-management.interface"

// Mock data for demonstration
const MOCK_ORDERS: IOrder[] = [
  {
    _id: "ORD001",
    user_id: {
      _id: "USER001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM001",
        medicine_id: {
          _id: "MED001",
          name: "Paracetamol 500mg",
          code: "PAR500",
          thumbnail: "/placeholder.svg?height=80&width=80",
          dosageForm: "Viên nén",
        },
        stock_id: {
          _id: "STOCK001",
          sellingPrice: 25000,
        },
        quantity: 2,
        price: 25000,
        totalAmount: 50000,
        note: "Uống sau ăn",
      },
      {
        _id: "ITEM002",
        medicine_id: {
          _id: "MED002",
          name: "Vitamin C 1000mg",
          code: "VTC1000",
          thumbnail: "/placeholder.svg?height=80&width=80",
          dosageForm: "Viên sủi",
        },
        stock_id: {
          _id: "STOCK002",
          sellingPrice: 150000,
        },
        quantity: 1,
        price: 150000,
        totalAmount: 150000,
      },
    ],
    totalAmount: 200000,
    shippingFee: 25000,
    discount: 10000,
    finalAmount: 215000,
    status: "Pending Confirmation",
    paymentMethod: "COD",
    shippingMethod: "Giao hàng tiêu chuẩn",
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Đường ABC",
      city: "TP.HCM",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
    },
    orderDate: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-20T17:00:00Z",
    trackingNumber: "VN123456789",
    isReviewed: false,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "ORD002",
    user_id: {
      _id: "USER002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM003",
        medicine_id: {
          _id: "MED003",
          name: "Amoxicillin 250mg",
          code: "AMX250",
          thumbnail: "/placeholder.svg?height=80&width=80",
          dosageForm: "Viên nang",
        },
        stock_id: {
          _id: "STOCK003",
          sellingPrice: 45000,
        },
        quantity: 3,
        price: 45000,
        totalAmount: 135000,
      },
    ],
    totalAmount: 135000,
    shippingFee: 30000,
    discount: 0,
    finalAmount: 165000,
    status: "Shipping",
    paymentMethod: "Bank Transfer",
    shippingMethod: "Giao hàng nhanh",
    shippingAddress: {
      name: "Trần Thị B",
      phone: "0987654321",
      address: "456 Đường XYZ",
      city: "TP.HCM",
      district: "Quận 3",
      ward: "Phường Võ Thị Sáu",
    },
    orderDate: "2024-01-14T14:20:00Z",
    estimatedDelivery: "2024-01-18T16:00:00Z",
    trackingNumber: "VN987654321",
    isReviewed: false,
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
  },
  {
    _id: "ORD003",
    user_id: {
      _id: "USER003",
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0369852147",
      address: "789 Đường DEF, Quận 7, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM004",
        medicine_id: {
          _id: "MED004",
          name: "Omega 3 Fish Oil",
          code: "OMG3",
          thumbnail: "/placeholder.svg?height=80&width=80",
          dosageForm: "Viên nang mềm",
        },
        stock_id: {
          _id: "STOCK004",
          sellingPrice: 320000,
        },
        quantity: 1,
        price: 320000,
        totalAmount: 320000,
      },
    ],
    totalAmount: 320000,
    shippingFee: 0,
    discount: 32000,
    finalAmount: 288000,
    status: "Completed",
    paymentMethod: "Credit Card",
    shippingMethod: "Miễn phí vận chuyển",
    shippingAddress: {
      name: "Lê Văn C",
      phone: "0369852147",
      address: "789 Đường DEF",
      city: "TP.HCM",
      district: "Quận 7",
      ward: "Phường Tân Thuận Đông",
    },
    orderDate: "2024-01-10T09:45:00Z",
    estimatedDelivery: "2024-01-15T17:00:00Z",
    deliveredDate: "2024-01-14T15:30:00Z",
    trackingNumber: "VN147258369",
    isReviewed: false,
    createdAt: "2024-01-10T09:45:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
  },
]

export const getAllOrdersAPI = async (): Promise<IOrder[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In production: const response = await APIConfig.get<{ data: IOrder[] }>("/api/order")
  // return response.data.data

  return MOCK_ORDERS
}

export const getOrderByIdAPI = async (order_id: string): Promise<IOrder> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const order = MOCK_ORDERS.find((o) => o._id === order_id)
  if (!order) {
    throw new Error("Không tìm thấy đơn hàng")
  }

  return order
}

export const checkAllOrderStatusAPI = async (): Promise<IOrder[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return MOCK_ORDERS
}

export const checkOrderByStatusAPI = async ({
  userId,
  status,
}: {
  userId: string
  status: string
}): Promise<IOrder[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return MOCK_ORDERS.filter((order) => order.user_id._id === userId && order.status === status)
}

export const getOrdersByStatusAPI = async (status: string): Promise<IOrder[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400))

  if (status === "all") {
    return MOCK_ORDERS
  }

  return MOCK_ORDERS.filter((order) => order.status === status)
}

export const getOrderStatsAPI = async (): Promise<IOrderStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const stats = MOCK_ORDERS.reduce(
    (acc, order) => {
      acc.total++
      switch (order.status) {
        case "Pending Confirmation":
          acc.pending++
          break
        case "Awaiting Shipment":
          acc.awaiting++
          break
        case "Shipping":
          acc.shipping++
          break
        case "Completed":
          acc.completed++
          break
        case "Cancelled":
          acc.cancelled++
          break
      }
      return acc
    },
    {
      total: 0,
      pending: 0,
      awaiting: 0,
      shipping: 0,
      completed: 0,
      cancelled: 0,
    },
  )

  return stats
}

export const cancelOrderAPI = async (orderId: string, reason: string): Promise<IOrder> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In production, this would update the order status
  const order = MOCK_ORDERS.find((o) => o._id === orderId)
  if (!order) {
    throw new Error("Không tìm thấy đơn hàng")
  }

  // Mock update
  order.status = "Cancelled"
  order.cancelledDate = new Date().toISOString()
  order.cancelReason = reason
  order.updatedAt = new Date().toISOString()

  return order
}

// import type { IOrder, IOrderStats } from "@/interface/order/order-management.interface"
// import APIConfig from "../api.config"

// // Commented out mock data - now using real API calls
// /*
// const MOCK_ORDERS: IOrder[] = [
//   // Mock data removed - using real API calls now
// ]
// */

// export const getAllOrdersAPI = async (): Promise<IOrder[]> => {
//   try {
//     const response = await APIConfig.get<{ data: IOrder[] }>("/api/order")
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching all orders:", error)
//     throw new Error("Không thể tải danh sách đơn hàng")
//   }
// }

// export const getOrderByIdAPI = async (order_id: string): Promise<IOrder> => {
//   try {
//     const response = await APIConfig.get<{ data: IOrder }>(`/api/order/${order_id}`)
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching order by ID:", error)
//     throw new Error("Không thể tải thông tin đơn hàng")
//   }
// }

// export const checkAllOrderStatusAPI = async (): Promise<IOrder[]> => {
//   try {
//     const response = await APIConfig.get<{ data: IOrder[] }>("/api/order/status")
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching all order statuses:", error)
//     throw new Error("Không thể tải trạng thái đơn hàng")
//   }
// }

// export const checkOrderByStatusAPI = async ({
//   status,
// }: {
//   userId: string
//   status: string
// }): Promise<IOrder[]> => {
//   try {
//     const response = await APIConfig.get<{ data: IOrder[] }>(`/api/order/status/${status}`)
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching orders by status:", error)
//     throw new Error("Không thể tải đơn hàng theo trạng thái")
//   }
// }

// export const getOrdersByStatusAPI = async (status: string): Promise<IOrder[]> => {
//   try {
//     if (status === "all") {
//       return await getAllOrdersAPI()
//     }

//     const response = await APIConfig.get<{ data: IOrder[] }>(`/api/order/filter/status/${status}`)
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching orders by status:", error)
//     throw new Error("Không thể tải đơn hàng theo trạng thái")
//   }
// }

// export const getOrderStatsAPI = async (): Promise<IOrderStats> => {
//   try {
//     const response = await APIConfig.get<{ data: IOrderStats }>("/api/order/statistics")
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching order statistics:", error)
//     // Fallback: calculate stats from all orders if stats endpoint fails
//     try {
//       const orders = await getAllOrdersAPI()
//       const stats = orders.reduce(
//         (acc, order) => {
//           acc.total++
//           switch (order.status) {
//             case "Pending Confirmation":
//               acc.pending++
//               break
//             case "Awaiting Shipment":
//               acc.awaiting++
//               break
//             case "Shipping":
//               acc.shipping++
//               break
//             case "Completed":
//               acc.completed++
//               break
//             case "Cancelled":
//               acc.cancelled++
//               break
//           }
//           return acc
//         },
//         {
//           total: 0,
//           pending: 0,
//           awaiting: 0,
//           shipping: 0,
//           completed: 0,
//           cancelled: 0,
//         },
//       )
//       return stats
//     } catch (fallbackError) {
//       console.error("Error calculating fallback stats:", fallbackError)
//       throw new Error("Không thể tải thống kê đơn hàng")
//     }
//   }
// }

// export const cancelOrderAPI = async (orderId: string, reason: string): Promise<IOrder> => {
//   try {
//     const response = await APIConfig.put<{ data: IOrder }>(`/api/order/${orderId}/cancel`, {
//       reason,
//       cancelledDate: new Date().toISOString(),
//     })
//     return response.data.data
//   } catch (error) {
//     console.error("Error cancelling order:", error)
//     throw new Error("Không thể hủy đơn hàng")
//   }
// }

// export const updateOrderStatusAPI = async (orderId: string, status: string): Promise<IOrder> => {
//   try {
//     const response = await APIConfig.put<{ data: IOrder }>(`/api/order/${orderId}/status`, {
//       status,
//       updatedAt: new Date().toISOString(),
//     })
//     return response.data.data
//   } catch (error) {
//     console.error("Error updating order status:", error)
//     throw new Error("Không thể cập nhật trạng thái đơn hàng")
//   }
// }

// export const getOrdersByUserAPI = async (userId: string): Promise<IOrder[]> => {
//   try {
//     const response = await APIConfig.get<{ data: IOrder[] }>(`/api/order/user/${userId}`)
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching orders by user:", error)
//     throw new Error("Không thể tải đơn hàng của người dùng")
//   }
// }

// export const searchOrdersAPI = async (searchTerm: string): Promise<IOrder[]> => {
//   try {
//     const response = await APIConfig.get<{ data: IOrder[] }>(`/api/order/search?q=${encodeURIComponent(searchTerm)}`)
//     return response.data.data
//   } catch (error) {
//     console.error("Error searching orders:", error)
//     throw new Error("Không thể tìm kiếm đơn hàng")
//   }
// }
