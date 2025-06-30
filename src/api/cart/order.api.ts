// import { ICart } from "@/interface/order/cart.interface";
// import APIConfig from "../api.config";
// export const checkoutAPI = async (data: ICart) => {
//   const res = await APIConfig.post(`/api/order/checkout/`, data);
//   return res.data;
// };
// export const getAllByUserIdAPI = async (userId: string) => {
//   const res = await APIConfig.get(`/api/order/status/${userId}`);
//   return res.data;
// }
// export const getOrderByStatusAPI = async (userId: string, status: string) => {
//   const res = await APIConfig.get(`/api/order/status/${userId}/${status}`);
//   return res.data;
// }
// export const getOrderByIdAPI = async (id: string) => {
//   const res = await APIConfig.get(`/api/order/${id}`);
//   return res.data;
// }
// export const cancelOrderAPI = async (id: string) => {
//   const res = await APIConfig.put(`/api/order/cancel/${id}`);
//   return res.data;
// };
// export const confirmOrderAPI = async (id: string) => {
//   const res = await APIConfig.put(`/api/order/confirm/${id}`);
//   return res.data;
// };
import APIConfig from "../api.config";
import type {
  ICheckoutPayload,
  IOrderReview,
} from "@/interface/order/order.interface";

export const reviewOrderAPI = async (
  payload: ICheckoutPayload
): Promise<IOrderReview> => {
  const response = await APIConfig.post<{ data: IOrderReview }>(
    "/api/order/review",
    payload
  );
  return response.data.data as IOrderReview;
};

export const checkoutAPI = async (
  payload: ICheckoutPayload
): Promise<IOrderReview> => {
  const response = await APIConfig.post<{ data: IOrderReview }>(
    "/api/order/review/checkout",
    payload
  );
  return response.data.data as IOrderReview;
};
