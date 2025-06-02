import { IDisCategory } from "@/interface/disease/disease-category.interface";
import APIConfig from "../api.config";
import { data } from "react-router-dom";

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
export const getDisCategoryAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/disCategory/get-disCategory/${id}`);
  return res.data;
};
export const getALLDisCategoryAPI = async () => {
  const res = await APIConfig.get(`/api/disCategory/getAll`);
  return res.data;
};
