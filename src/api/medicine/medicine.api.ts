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

export const getALLMedicineAPI = async (): Promise<{ data: IMedicine[] }> => {
  const response = await APIConfig.get(`/api/medicine/`);
  return response.data as Promise<{ data: IMedicine[] }>;
};
