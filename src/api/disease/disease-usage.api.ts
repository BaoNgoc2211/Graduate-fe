import APIConfig from "../api.config";
import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
// export const getAllMDisUsageAPI = async (): Promise<{
//   data: IDiseaseUsageGroup[];
// }> => {
//   const res = await APIConfig.get(`/api/disUsage/getAll/`);
//   return res.data?.data;
// };\
export const getAllDisCategetAllMDisUsageAPIgoryAPI = async (): Promise<IDiseaseUsageGroup[]> => {
  const response = await APIConfig.get<{ data: IDiseaseUsageGroup[] }>(
    "api/disUsage/getAll/"
  );
  return response.data.data; // bây giờ TS hiểu response.data có data
};
export const getDisUsageAPI = async (
  disUsageGroup_id: string
): Promise<{ data: IDiseaseUsageGroup }> => {
  const response = await APIConfig.get<{ data: IDiseaseUsageGroup }>(
    `/api/disUsage/${disUsageGroup_id}`
  );
  return response.data;
};