import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";
import APIConfig from "../api.config";

export const getALLMedCategoryAPI = async (): Promise<{
  data: IMedicineCategory[];
}> => {
  const response = await APIConfig.get(`/api/medicine/cate`);
  return response.data as Promise<{ data: IMedicineCategory[] }>;
};

export const getMedCateById = async (
  medCategory_id: string
): Promise<{ data: IMedicineCategory }> => {
  const response = await APIConfig.get<{ data: IMedicineCategory }>(
    `/api/medicine/cate/${medCategory_id}`
  );
  return response.data;
};
