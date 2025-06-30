import { IShipping } from "@/interface/order/shipping.interface";
import APIConfig from "../api.config";

export const getAllShippingAPI = async (): Promise<{
  data: IShipping[];
}> => {
  const response = await APIConfig.get(`/api/shipping/`);
  return response.data as Promise<{ data: IShipping[] }>;
};
export const getByIdShippingAPI = async (
  shipping_id: string
): Promise<{ data: IShipping }> => {
  const response = await APIConfig.get<{ data: IShipping }>(
    `/api/shipping/${shipping_id}`
  );
  return response.data;
};
