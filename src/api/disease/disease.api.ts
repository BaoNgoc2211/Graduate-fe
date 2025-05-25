import { IDisease } from "@/interface/disease/disease.interface";
import APIConfig from "../api.config";
export const createDiseaseAPI = async (data: IDisease) => {
  const res = await APIConfig.post(`/api/disease/create`, data);
  return res.data;
};
export const deleteDiseaseAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/disease/delete/${id}`);
  return res.data;
};
export const updateDiseaseAPI = async (id: string, data: IDisease) => {
  const res = await APIConfig.put(`/api/disease/update/${id}`, data);
  return res.data;
};
