import APIConfig from "../api.config";
import { IMedicine } from "@/interface/medicine/medicine.interface";

export const addMedicineAPI = async (data: IMedicine) => {
  const res = await APIConfig.post(`/api/medicine/`, data);
  return res.data;
};
export const deleteMedicineAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/medicine/${id}`);
  return res.data;
};
export const editMedicineAPI = async (id: string, data: IMedicine) => {
  const res = await APIConfig.put(`/api/medicine/${id}`, data);
  return res.data;
};
export const getMedicineAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/medicine/${id}`);
  return res.data;
};
export const getALLMedicineAPI = async () => {
  const res = await APIConfig.get(`/api/medicine/`);
  return res.data;
};
