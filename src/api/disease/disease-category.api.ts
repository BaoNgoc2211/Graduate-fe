import { IDisCategory } from "@/interface/disease/disease-category.interface";
import APIConfig from "../api.config";
export const getAllDisCategoryAPI = async (): Promise<{
  data: IDisCategory[];
}> => {
  const response = await APIConfig.get("api/disCategory/getAll");
  return response.data as Promise<{ data: IDisCategory[] }>;
};
export const getDisCateById = async (
  disCategory_id: string
): Promise<{ data: IDisCategory }> => {
  const response = await APIConfig.get<{ data: IDisCategory }>(
    `/api/disCategory/${disCategory_id}`
  );
  return response.data;
};
