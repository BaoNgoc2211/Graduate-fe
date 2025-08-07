import APIConfig from "../api.config";
import type {
  IOrder,
  IOrderStats,
} from "@/interface/order/order-management.interface";

interface APIOrderListResponse {
  orderId: string;
  status: string;
  totalAmount: number;
  finalAmount: number;
  items: APIOrderItem[];
  orderDetailId?: string;
}

interface APIOrderItem {
  order_item: string;
  medicineName: string;
  quantity: number;
  price: number;
  total: number;
  thumbnail: string;
}

interface APIOrderDetailResponse {
  _id: string;
  order_items: {
    medicine_id: string;
    stock_id: string;
    thumbnail: string;
    name: string;
    price: number;
    quantity: number;
    totalAmount: number;
    note: string;
  }[];
  totalOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Get all orders
export const getAllOrdersAPI = async (): Promise<IOrder[]> => {
  const response = await APIConfig.get<{ data: APIOrderListResponse[] }>(
    "/api/order/status/"
  );
  return response.data.data.map(mapOrderFromListAPI);
};

// Get order by ID - Cần call 2 API để lấy đủ thông tin
export const getOrderByIdAPI = async (order_id: string): Promise<IOrder> => {
  try {
    console.log(`🔍 Getting order details for ID: ${order_id}`);
    
    // API trả về orderDetail, không phải order info
    const response = await APIConfig.get<{ data: APIOrderDetailResponse }>(
      `/api/order/orderdetail/${order_id}`
    );
    
    // Tạm thời map từ orderDetail, thiếu nhiều thông tin
    return mapOrderFromDetailAPI(response.data.data, order_id);
  } catch (error) {
    console.error(`❌ Error getting order ${order_id}:`, error);
    throw error;
  }
};

// Get orders by status
export const getOrdersByStatusAPI = async (
  status: string
): Promise<IOrder[]> => {
  try {
    console.log(`🔍 Getting orders with frontend status: ${status}`);
    
    if (status === "all") {
      console.log("📋 Getting all orders from: /api/order/status/");
      const response = await APIConfig.get<{ data: APIOrderListResponse[] }>(
        "/api/order/status/"
      );
      const mappedOrders = response.data.data.map(mapOrderFromListAPI);
      console.log(`✅ Retrieved ${mappedOrders.length} total orders`);
      return mappedOrders;
    } else {
      // Map frontend status sang backend status
      const apiStatus = mapStatusToAPI(status);
      console.log(`🔄 Mapped to backend status: ${status} -> ${apiStatus}`);
      
      const endpoint = `/api/order/status/${apiStatus}`;
      console.log(`📡 Calling endpoint: ${endpoint}`);
      
      const response = await APIConfig.get<{ data: APIOrderListResponse[] }>(endpoint);
      const mappedOrders = response.data.data.map(mapOrderFromListAPI);
      
      console.log(`✅ Retrieved ${mappedOrders.length} orders for status: ${status}`);
      return mappedOrders;
    }
  } catch (error) {
    console.error(`❌ Error getting orders by status ${status}:`, error);
    throw error;
  }
};

// Calculate stats from orders
export const getOrderStatsAPI = async (): Promise<IOrderStats> => {
  try {
    console.log("📊 Calculating stats from all orders...");
    const allOrders = await getAllOrdersAPI();

    const stats = allOrders.reduce(
      (acc, order) => {
        acc.total++;
        switch (order.status) {
          case "Pending Confirmation":
            acc.pending++;
            break;
          case "Awaiting Shipment":
            acc.awaiting++;
            break;
          case "Shipping":
            acc.shipping++;
            break;
          case "Completed":
            acc.completed++;
            break;
          case "Cancelled":
            acc.cancelled++;
            break;
        }
        return acc;
      },
      {
        total: 0,
        pending: 0,
        awaiting: 0,
        shipping: 0,
        completed: 0,
        cancelled: 0,
      }
    );

    console.log("📈 Calculated stats:", stats);
    return stats;
  } catch (error) {
    console.error("❌ Get order stats error:", error);
    throw error;
  }
};

// Cancel order - Cần implement khi có API
export const cancelOrderAPI = async (
  orderId: string,
  reason: string
): Promise<IOrder> => {
  console.log(`🚫 Cancelling order ${orderId} with reason: ${reason}`);
  // TODO: Implement when backend provides cancel API
  throw new Error("Cancel order API not implemented yet");
};

// Update order status - Cần implement khi có API
export const updateOrderStatusAPI = async (
  orderId: string,
  status: string
): Promise<IOrder> => {
  const backendStatus = mapStatusToAPI(status);
  console.log(`🔄 Updating order ${orderId} status: ${status} -> ${backendStatus}`);
  // TODO: Implement when backend provides update status API
  throw new Error("Update order status API not implemented yet");
};

// Search orders - Cần implement khi có API
export const searchOrdersAPI = async (
  searchTerm: string
): Promise<IOrder[]> => {
  console.log(`🔍 Searching orders with term: ${searchTerm}`);
  // TODO: Implement when backend provides search API
  // Tạm thời search trong tất cả orders
  const allOrders = await getAllOrdersAPI();
  const searchLower = searchTerm.toLowerCase();
  return allOrders.filter(order => 
    order._id.toLowerCase().includes(searchLower) ||
    order.orderItems.some(item => 
      item.medicine_id.name.toLowerCase().includes(searchLower)
    )
  );
};

// Get orders by user - Cần implement khi có API
export const getOrdersByUserAPI = async (userId: string): Promise<IOrder[]> => {
  console.log(`👤 Getting orders for user: ${userId}`);
  // TODO: Implement when backend provides user orders API
  throw new Error("Get orders by user API not implemented yet");
};

// Helper function để map status từ frontend sang backend
function mapStatusToAPI(frontendStatus: string): string {
  const statusMap: { [key: string]: string } = {
    "all": "",
    "Pending Confirmation": "pending",
    "Awaiting Shipment": "confirmed", 
    "Shipping": "delivering",
    "Completed": "completed",
    "Cancelled": "cancelled",
  };

  const mapped = statusMap[frontendStatus] || frontendStatus.toLowerCase();
  console.log(`🗺️ Status mapping: "${frontendStatus}" -> "${mapped}"`);
  return mapped;
}

// Helper function để map status từ backend sang frontend
function mapStatusFromAPI(apiStatus: string): string {
  const statusMap: { [key: string]: string } = {
    "đang chờ xác nhận": "Pending Confirmation",
    "xác nhận": "Awaiting Shipment",
    "đang giao": "Shipping",
    "hoàn thành": "Completed",
    "huỷ": "Cancelled",
  };

  const mapped = statusMap[apiStatus] || apiStatus;
  console.log(`🗺️ Status mapping from API: "${apiStatus}" -> "${mapped}"`);
  return mapped;
}

// Map order list response từ backend
function mapOrderFromListAPI(apiOrder: APIOrderListResponse): IOrder {
  console.log("🔍 Mapping order from list API:", {
    orderId: apiOrder.orderId,
    status: apiOrder.status,
    itemsCount: apiOrder.items?.length || 0
  });

  const mappedStatus = mapStatusFromAPI(apiOrder.status);

  return {
    _id: apiOrder.orderId,
    user_id: {
      _id: "unknown",
      name: "Unknown User",
      email: "",
      phone: "",
      address: "",
    },
    orderItems: apiOrder.items?.map((item, index) => ({
      _id: item.order_item || `item-${index}`,
      medicine_id: {
        _id: item.order_item || "unknown",
        name: item.medicineName || "Unknown Medicine",
        code: "",
        thumbnail: item.thumbnail || "/placeholder.svg",
        dosageForm: "Unknown",
      },
      stock_id: {
        _id: "unknown",
        sellingPrice: item.price || 0,
      },
      quantity: item.quantity || 0,
      price: item.price || 0,
      totalAmount: item.total || 0,
    })) || [],
    totalAmount: apiOrder.totalAmount || 0,
    shippingFee: 0,
    discount: 0,
    finalAmount: apiOrder.finalAmount || 0,
    status: mappedStatus as IOrder["status"],
    paymentMethod: "COD",
    shippingMethod: "Standard Shipping",
    shippingAddress: {
      name: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
    },
    orderDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Map order detail response từ backend
function mapOrderFromDetailAPI(apiOrderDetail: APIOrderDetailResponse, orderId: string): IOrder {
  console.log("🔍 Mapping order from detail API:", {
    orderId: orderId,
    detailId: apiOrderDetail._id,
    itemsCount: apiOrderDetail.order_items?.length || 0
  });

  return {
    _id: orderId,
    user_id: {
      _id: "unknown",
      name: "Unknown User", 
      email: "",
      phone: "",
      address: "",
    },
    orderItems: apiOrderDetail.order_items?.map((item, index) => ({
      _id: item.medicine_id || `item-${index}`,
      medicine_id: {
        _id: item.medicine_id || "unknown",
        name: item.name || "Unknown Medicine",
        code: "",
        thumbnail: item.thumbnail || "/placeholder.svg",
        dosageForm: "Unknown",
      },
      stock_id: {
        _id: item.stock_id || "unknown",
        sellingPrice: item.price || 0,
      },
      quantity: item.quantity || 0,
      price: item.price || 0,
      totalAmount: item.totalAmount || 0,
      note: item.note,
    })) || [],
    totalAmount: apiOrderDetail.totalOrder || 0,
    shippingFee: 0,
    discount: 0,
    finalAmount: apiOrderDetail.totalOrder || 0,
    status: "Pending Confirmation", // Không có trong orderDetail API
    paymentMethod: "COD",
    shippingMethod: "Standard Shipping",
    shippingAddress: {
      name: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
    },
    orderDate: apiOrderDetail.createdAt || new Date().toISOString(),
    createdAt: apiOrderDetail.createdAt || new Date().toISOString(),
    updatedAt: apiOrderDetail.updatedAt || new Date().toISOString(),
  };
}