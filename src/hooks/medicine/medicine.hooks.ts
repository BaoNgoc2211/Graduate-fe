import { useQuery } from "@tanstack/react-query";
import { getALLMedicineAPI, getMedicineAPI } from "@/api/medicine/medicine.api";
import { MedicineResponse } from "@/interface/medicine/medicine.interface";

// Hook để lấy tất cả medicine
export const useGetAllMedicine = (page: number = 1, pageSize: number = 20) => {
  return useQuery<MedicineResponse>({
    queryKey: ["medicines", page, pageSize],
    queryFn: () => getALLMedicineAPI(page, pageSize),
  });
};

// Hook để lấy chi tiết 1 medicine
export const useGetMedicine = (id: string) => {
  return useQuery({
    queryKey: ["medicine", id],
    queryFn: () => getMedicineAPI(id),
    enabled: !!id, // Chỉ chạy khi có id
  });
};