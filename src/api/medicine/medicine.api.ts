import { MedicineResponse } from "./../../interface/medicine/medicine.interface";
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
export const searchMedicineAPI = async (searchParams: {
  name?: string;
  indication?: string;
  page?: number;
  pageSize?: number;
}): Promise<MedicineResponse> => {
  try {
    const { name, indication, page = 1, pageSize = 20 } = searchParams;

    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (name) {
      params.append("name", name);
    }

    if (indication) {
      params.append("indication", indication);
    }

    const response = await APIConfig.post(
      `/api/medicine/search?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching medicine:", error);
    throw error;
  }
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
