import APIConfig from "../api.config";
import type {
  ICheckoutPayload,
  IOrder,
  IOrderReview,
  ICheckoutResponse,
} from "@/interface/order/order.interface";

export const getAllOrdersAPI = async (): Promise<IOrder[]> => {
  const response = await APIConfig.get<{ data: IOrder[] }>("/api/order");
  return response.data.data;
};

export const getOrderByIdAPI = async (order_id: string): Promise<IOrder> => {
  const response = await APIConfig.get<{ data: IOrder }>(
    `/api/order/${order_id}`
  );
  return response.data.data;
};

export const checkAllOrderStatusAPI = async (): Promise<IOrder[]> => {
  const response = await APIConfig.get<{ data: IOrder[] }>("/api/order/status");
  return response.data.data;
};

export const checkOrderByStatusAPI = async ({
  status,
}: {
  userId: string;
  status: string;
}): Promise<IOrder[]> => {
  const response = await APIConfig.get<{ data: IOrder[] }>(
    `/api/order/status/${status}`
  );
  return response.data.data;
};
// Review order API
export const reviewOrderAPI = async (
  payload: ICheckoutPayload
): Promise<IOrderReview> => {
  try {
    const response = await APIConfig.post<{ data: IOrderReview }>(
      "/api/order/review",
      payload
    );
    console.log("Review order response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Review order error:", error);
    throw error;
  }
};
// export const checkoutAPI = async (
//   payload: ICheckoutPayload
// ): Promise<ICheckoutResponse> => {
//   try {
//     console.log("Checkout payload:", payload);
//     const response = await APIConfig.post<ICheckoutResponse>(
//        "/api/order/review/checkout/",
//       payload
//     );
//     console.log("Checkout response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Checkout error:", error);
//     throw error;
//   }
// };
export const checkoutAPI = async (
  payload: ICheckoutPayload
): Promise<ICheckoutResponse> => {
  try {
    // map sang đúng format mà backend cần
    const apiPayload = {
      selectItemIds: payload.selectItemIds,
      shippingId: payload.shippingId,
      paymentMethod: payload.paymentMethod,
      // 👇 Quan trọng: map voucherId (FE) -> voucher_id (BE)
      voucherCode: payload.voucherCode ?? undefined,
    };

    console.log("Checkout payload gửi lên BE:", apiPayload);

    const response = await APIConfig.post<ICheckoutResponse>(
      "/api/order/review/checkout/",
      apiPayload
    );

    console.log("Checkout response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
};

