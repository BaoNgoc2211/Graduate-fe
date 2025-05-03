import { IDisCategory } from "@/interface/disease/disease-category.interface";
import APIConfig from "../api.config";
import { data } from "react-router-dom";

export const addDisCategoryAPI = async (data: IDisCategory) => {
  const res = await APIConfig.post(`/api/disCategory/add-disCategory`, data);
  return res.data;
};
export const deleteDisCategoryAPI = async (id: string) => {
  const res = await APIConfig.delete(
    `/api/disCategory/delete-disCategory/${id}`
  );
  return res.data;
};
export const editDisCategoryAPI = async (id: string) => {
  const res = await APIConfig.put(
    `/api/disCategory/edit-disCategory/${id}`,
    data
  );
  return res.data;
};
export const getDisCategoryAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/disCategory/get-disCategory/${id}`);
  return res.data;
};
export const getALLDisCategoryAPI = async () => {
  const res = await APIConfig.get(`/api/disCategory/get-disCategory`);
  return res.data;
};
