import APIConfig from "../api.config";
import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
export const getAllMDisUsageAPI = async (): Promise<{
  data: IDiseaseUsageGroup[];
}> => {
  const res = await APIConfig.get(`/api/disUsage/getAll/`);
  return res.data as Promise<{ data: IDiseaseUsageGroup[] }>;
};
export const getDisUsageAPI = async (
  disUsageGroup_id: string
): Promise<{ data: IDiseaseUsageGroup }> => {
  const response = await APIConfig.get<{ data: IDiseaseUsageGroup }>(
    `/api/disUsage/${disUsageGroup_id}`
  );
  return response.data;
};