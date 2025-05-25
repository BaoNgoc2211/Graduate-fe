import APIConfig from "../api.config";
import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
export const createDisUsageAPI = async (data: IDiseaseUsageGroup) => {
  const res = await APIConfig.post(`/api/disUsage/create`, data);
  return res.data;
};
export const deleteDisUsageAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/disUsage/delete/${id}`);
  return res.data;
};
export const updateDisUsageAPI = async (
  id: string,
  data: IDiseaseUsageGroup
) => {
  const res = await APIConfig.put(`/api/disUsage/update/${id}`, data);
  return res.data;
};
