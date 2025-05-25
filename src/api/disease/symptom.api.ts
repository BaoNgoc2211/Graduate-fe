import APIConfig from "../api.config";
import { ISymptom } from "@/interface/disease/symptom.interface";
export const createSymptomAPI = async (data: ISymptom) => {
  const res = await APIConfig.post(`/api/symptom/create`, data);
  return res.data;
};
export const deleteSymptomAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/symptom/delete/${id}`);
  return res.data;
};
export const updateSymptomAPI = async (id: string, data: ISymptom) => {
  const res = await APIConfig.put(`/api/symptom/update/${id}`, data);
  return res.data;
};
