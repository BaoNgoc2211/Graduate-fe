
import type { ICart } from "@/interface/order/cart.interface";
import APIConfig from "../api.config";

export interface IAddToCartPayload {
  medicine_id: string;
  quantity: number;
}
export interface RemoveCartPayload {
  medicine_id: string;
}

export interface RemoveCartResponse {
  message: string;
  data: ICart;
}
export const getAllCartAPI = async (): Promise<{ data: ICart[] }> => {
  const response = await APIConfig.get("/api/cart/get-cart");
  return response.data as Promise<{ data: ICart[] }>;
};

export const addToCartAPI = async (payload: IAddToCartPayload) => {
  const response = await APIConfig.post("/api/cart/add-item", payload, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCartAPI = async (
  medicine_id: string,
  quantity: number
): Promise<{ data: ICart }> => {
  const response = await APIConfig.patch(`/api/cart/update`, {
    medicine_id,
    quantity,
  });
  return response.data as Promise<{ data: ICart }>;
};
export const removeCartAPI = async (
  medicine_id: string
): Promise<RemoveCartResponse> => {
  const response = await APIConfig.delete<RemoveCartResponse>(
    `/api/cart/remove`,
    { data: { medicine_id } } // Gửi medicine_id trong body
  );
  return response.data;
};
export const clearCartAPI = async () => {
  const res = await APIConfig.delete(`/api/cart/clear`);
  return res.data;
};
