import { IMedicineCategory } from "@/interface/medicine/medicine-category";
import APIConfig from "../api.config";
import { IMedicine } from "@/interface/medicine/medicine.interface";

export const getMedCategoryAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/medicine/cate/${id}`);
  return res.data;
};
export const getALLMedCategoryAPI = async (): Promise<{
  data: IMedicineCategory[];
}> => {
  const res = await APIConfig.get(`/api/medicine/cate`);
  return res.data as Promise<{ data: IMedicineCategory[] }>;
};
export const getListMedicine = async (
  status: string
): Promise<{ data: IMedicine }> => {
  try {
    const res = await APIConfig.get<{ data: IMedicine }>(`/api/medicine/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching medicine:", error);
    throw error;
  }
};
