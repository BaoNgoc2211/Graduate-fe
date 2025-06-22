import { IDisCategory } from "@/interface/disease/disease-category.interface";
import APIConfig from "../api.config";
import { data } from "react-router-dom";
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

export const addDisCategoryAPI = async (data: IDisCategory) => {
  const res = await APIConfig.post(`/api/disCategory/create`, data);
  return res.data;
};
export const deleteDisCategoryAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/disCategory/delete/${id}`);
  return res.data;
};
export const editDisCategoryAPI = async (id: string) => {
  const res = await APIConfig.put(`/api/disCategory/update/${id}`, data);
  return res.data;
};
