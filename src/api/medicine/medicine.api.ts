import { MedicineResponse } from './../../interface/medicine/medicine.interface';
import APIConfig from "../api.config";
import { IMedicine } from "@/interface/medicine/medicine.interface";

export const getALLMedicineAPI = async (
  page: number = 1,
  pageSize: number = 20
): Promise<MedicineResponse> => {
  const response = await APIConfig.get(
    `/api/medicine?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
export const getMedicineAPI = async (
  id: string
): Promise<{ data: IMedicine }> => {
  try {
    const res = await APIConfig.get<{ data: IMedicine }>(`/api/medicine/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching medicine:", error);
    throw error;
  }
};
