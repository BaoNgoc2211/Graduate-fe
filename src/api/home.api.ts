import { IMedicine } from "@/interface/medicine/medicine.interface";
import APIConfig from "./api.config";

export const LatestCollectionAPI = async (
  createAt: string
): Promise<{ data: IMedicine[] }> => {
  const response = await APIConfig.get(`api/medicine/createdAdd`, {
    params: { createAt },
  });
  return response.data as Promise<{ data: IMedicine[] }>;
};
