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
  userId: {
    _id: string;
    info: {
      name: string;
      phone: string;
      address: string;
    };
  };
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
  try {
    console.log("🔍 Fetching all orders from /api/order/status/");
    const response = await APIConfig.get<{ data: APIOrderListResponse[] }>(
      "/api/order/status/"
    );
    
    console.log("📦 Raw API response:", response.data);
    const mappedOrders = response.data.data.map(mapOrderFromListAPI);
    console.log("✅ Mapped orders:", mappedOrders);
    
    return mappedOrders;
  } catch (error) {
    console.error("❌ Error in getAllOrdersAPI:", error);
    throw error;
  }
};

// Get order by ID - Enhanced with better error handling and logging
export const getOrderByIdAPI = async (orderId: string): Promise<IOrder> => {
  try {
    console.log(`🔍 Getting order details for ID: ${orderId}`);
    
    // First get all orders to find the specific one
    console.log("📋 Fetching all orders first...");
    const allOrdersResponse = await APIConfig.get<{ data: APIOrderListResponse[] }>(
      "/api/order/status/"
    );
    
    console.log(`📦 Found ${allOrdersResponse.data.data.length} orders`);
    const orderFromList = allOrdersResponse.data.data.find(order => order.orderId === orderId);
    
    if (!orderFromList) {
      console.error(`❌ Order ${orderId} not found in list`);
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    console.log("✅ Found order in list:", orderFromList);
    
    // Map the basic order info first
    const basicOrder = mapOrderFromListAPI(orderFromList);
    console.log("🗺️ Basic order mapped:", basicOrder);
    
    // Try to get detailed info if orderDetailId exists
    if (orderFromList.orderDetailId) {
      try {
        console.log(`📊 Getting order details from: /api/order/orderdetail/${orderFromList.orderDetailId}`);
        const detailResponse = await APIConfig.get<{ data: APIOrderDetailResponse }>(
          `/api/order/orderdetail/${orderFromList.orderDetailId}`
        );
        
        console.log("📦 Order detail response:", detailResponse.data);
        
        // Enhanced merge with detailed items
        const detailedOrder: IOrder = {
          ...basicOrder,
          orderItems: detailResponse.data.data.order_items?.map((item, index) => {
            console.log(`🏷️ Processing item ${index}:`, item);
            return {
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
              note: item.note || "",
            };
          }) || basicOrder.orderItems,
          createdAt: detailResponse.data.data.createdAt || basicOrder.createdAt,
          updatedAt: detailResponse.data.data.updatedAt || basicOrder.updatedAt,
        };
        
        console.log("✅ Final detailed order:", detailedOrder);
        return detailedOrder;
        
      } catch (detailError) {
        console.warn('⚠️ Could not get order details, using basic data:', detailError);
        return basicOrder;
      }
    } else {
      console.log("ℹ️ No orderDetailId found, returning basic order");
      return basicOrder;
    }
  } catch (error) {
    console.error(`❌ Error getting order ${orderId}:`, error);
    throw error;
  }
};

// Get orders by status with enhanced logging
export const getOrdersByStatusAPI = async (
  status: string
): Promise<IOrder[]> => {
  try {
    console.log(`🔍 Getting orders with frontend status: ${status}`);
    
    if (status === "all") {
      console.log("📋 Getting all orders");
      return await getAllOrdersAPI();
    } else {
      // Map frontend status to backend status
      const apiStatus = mapStatusToAPI(status);
      console.log(`🔄 Status mapping: ${status} -> ${apiStatus}`);
      
      const endpoint = `/api/order/status/${apiStatus}`;
      console.log(`📡 Calling endpoint: ${endpoint}`);
      
      const response = await APIConfig.get<{ data: APIOrderListResponse[] }>(endpoint);
      console.log(`📦 API response for ${endpoint}:`, response.data);
      
      const mappedOrders = response.data.data.map(mapOrderFromListAPI);
      console.log(`✅ Mapped ${mappedOrders.length} orders for status: ${status}`);
      
      return mappedOrders;
    }
  } catch (error) {
    console.error(`❌ Error getting orders by status ${status}:`, error);
    // Return empty array instead of throwing to prevent UI crash
    return [];
  }
};

// Calculate stats from orders
export const getOrderStatsAPI = async (): Promise<IOrderStats> => {
  try {
    console.log("📊 Calculating stats from all orders...");
    const allOrders = await getAllOrdersAPI();
    console.log(`📈 Processing ${allOrders.length} orders for stats`);

    const stats = allOrders.reduce(
      (acc, order) => {
        acc.total++;
        console.log(`📋 Order ${order._id} status: ${order.status}`);
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
          default:
            console.warn(`⚠️ Unknown status: ${order.status}`);
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

    console.log("✅ Final stats:", stats);
    return stats;
  } catch (error) {
    console.error("❌ Get order stats error:", error);
    return {
      total: 0,
      pending: 0,
      awaiting: 0,
      shipping: 0,
      completed: 0,
      cancelled: 0,
    };
  }
};

// Cancel order - To be implemented when backend provides API
export const cancelOrderAPI = async (
  orderId: string,
  reason: string
): Promise<IOrder> => {
  console.log(`🚫 Cancelling order ${orderId} with reason: ${reason}`);
  // TODO: Implement when backend provides cancel API
  throw new Error("Cancel order API not implemented yet");
};

// Update order status - To be implemented when backend provides API
export const updateOrderStatusAPI = async (
  orderId: string,
  status: string
): Promise<IOrder> => {
  const backendStatus = mapStatusToAPI(status);
  console.log(`🔄 Updating order ${orderId} status: ${status} -> ${backendStatus}`);
  // TODO: Implement when backend provides update status API
  throw new Error("Update order status API not implemented yet");
};

// Search orders - Temporary implementation using client-side filtering
export const searchOrdersAPI = async (
  searchTerm: string
): Promise<IOrder[]> => {
  console.log(`🔍 Searching orders with term: ${searchTerm}`);
  // TODO: Implement when backend provides search API
  const allOrders = await getAllOrdersAPI();
  const searchLower = searchTerm.toLowerCase();
  const filteredOrders = allOrders.filter(order => 
    order._id.toLowerCase().includes(searchLower) ||
    order.orderItems.some(item => 
      item.medicine_id.name.toLowerCase().includes(searchLower)
    )
  );
  console.log(`✅ Found ${filteredOrders.length} orders matching "${searchTerm}"`);
  return filteredOrders;
};

// Get orders by user - To be implemented when backend provides API
export const getOrdersByUserAPI = async (userId: string): Promise<IOrder[]> => {
  console.log(`👤 Getting orders for user: ${userId}`);
  // TODO: Implement when backend provides user orders API
  throw new Error("Get orders by user API not implemented yet");
};

// Helper function to map status from frontend to backend
function mapStatusToAPI(frontendStatus: string): string {
  const statusMap: Record<string, string> = {
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

// Helper function to map status from backend to frontend
function mapStatusFromAPI(apiStatus: string): string {
  const statusMap: Record<string, string> = {
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

// Enhanced mapping function with detailed logging
function mapOrderFromListAPI(apiOrder: APIOrderListResponse): IOrder {
  console.log("🔍 Mapping order from list API:");
  console.log("📦 Raw API order:", JSON.stringify(apiOrder, null, 2));

  const mappedStatus = mapStatusFromAPI(apiOrder.status);
  console.log(`🏷️ Status mapped: ${apiOrder.status} -> ${mappedStatus}`);

  // Calculate shipping fee from difference
  const shippingFee = (apiOrder.finalAmount - apiOrder.totalAmount) || 0;
  console.log(`💰 Calculated shipping fee: ${shippingFee} (${apiOrder.finalAmount} - ${apiOrder.totalAmount})`);

  const mappedOrder: IOrder = {
    _id: apiOrder.orderId,
    user_id: {
      _id: apiOrder.userId?._id || "unknown",
      name: apiOrder.userId?.info?.name || "Unknown User",
      email: "", // Not available in API response
      phone: apiOrder.userId?.info?.phone || "",
      address: apiOrder.userId?.info?.address || "",
    },
    orderItems: apiOrder.items?.map((item, index) => {
      console.log(`🏷️ Mapping item ${index}:`, item);
      return {
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
      };
    }) || [],
    totalAmount: apiOrder.totalAmount || 0,
    shippingFee: shippingFee,
    discount: 0,
    finalAmount: apiOrder.finalAmount || 0,
    status: mappedStatus as IOrder["status"],
    paymentMethod: "COD",
    shippingMethod: "Standard Shipping",
    shippingAddress: {
      name: apiOrder.userId?.info?.name || "",
      phone: apiOrder.userId?.info?.phone || "",
      address: apiOrder.userId?.info?.address || "",
      city: "",
      district: "",
      ward: "",
    },
    orderDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderDetailId: apiOrder.orderDetailId, // Important: reference to detail API
  };

  console.log("✅ Final mapped order:");
  console.log("📦 Order summary:", {
    id: mappedOrder._id,
    status: mappedOrder.status,
    totalAmount: mappedOrder.totalAmount,
    finalAmount: mappedOrder.finalAmount,
    shippingFee: mappedOrder.shippingFee,
    itemsCount: mappedOrder.orderItems.length,
    userName: mappedOrder.user_id.name,
    userPhone: mappedOrder.user_id.phone,
    orderDetailId: mappedOrder.orderDetailId
  });

  return mappedOrder;
}