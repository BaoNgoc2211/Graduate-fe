import { ICart } from "@/interface/order/cart.interface";
import APIConfig from "../api.config";
export const createCartAPI = async (data: ICart) => {
  const res = await APIConfig.post(`/api/cart/add-item`, data);
  return res.data;
};
export const deleteCartAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/cart/delete/${id}`);
  return res.data;
};
export const updateCartAPI = async (id: string, data: ICart) => {
  const res = await APIConfig.put(`/api/cart/update/${id}`, data);
  return res.data;
};
// export const getAllCartAPI = async (): Promise<{ data: ICart[] }> => {
//   const response = await APIConfig.get(`/api/cart/getAll`);
//   return response.data;
// };

export const getALLMedicineAPI = async (): Promise<{ data: ICart[] }> => {
  const response = await APIConfig.get(`/api/medicine/`);
  return response.data as Promise<{ data: ICart[] }>;
};
