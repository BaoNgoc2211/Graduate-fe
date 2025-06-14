import { IMedicineUsageGroup } from "@/interface/medicine/medicine-usage";
import APIConfig from "../api.config";

export const addMedUsageAPI = async (data: IMedicineUsageGroup) => {
  const res = await APIConfig.post(`/api/medicine/`, data);
  return res.data;
};
export const deleteMedUsageAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/medicine/${id}`);
  return res.data;
};
export const editMedUsageAPI = async (
  id: string,
  data: IMedicineUsageGroup
) => {
  const res = await APIConfig.put(`/api/medicine/${id}`, data);
  return res.data;
};
export const getMedUsageAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/medicine/${id}`);
  return res.data;
};

export const getAllMedUsageAPI = async (): Promise<{
  data: IMedicineUsageGroup[];
}> => {
  const res = await APIConfig.get(`/api/medicine/`);
  return res.data as Promise<{ data: IMedicineUsageGroup[] }>;
};
