// import { useQuery } from "@tanstack/react-query";
// import { getALLMedicineAPI, getMedicineAPI } from "@/api/medicine/medicine.api";
// import { MedicineResponse } from "@/interface/medicine/medicine.interface";

// export const useGetAllMedicine = (page: number = 1, pageSize: number = 20) => {
//   return useQuery<MedicineResponse>({
//     queryKey: ["medicines", page, pageSize],
//     queryFn: () => getALLMedicineAPI(page, pageSize),
//   });
// };

// export const useGetMedicine = (id: string) => {
//   return useQuery({
//     queryKey: ["medicine", id],
//     queryFn: () => getMedicineAPI(id),
//     enabled: !!id, 
//   });
// };
import { useQuery } from "@tanstack/react-query";
import { 
  getALLMedicineAPI, 
  getMedicineAPI, 
  searchMedicineAPI 
} from "@/api/medicine/medicine.api";
import { MedicineResponse } from "@/interface/medicine/medicine.interface";

export const useGetAllMedicine = (page: number = 1, pageSize: number = 20) => {
  return useQuery<MedicineResponse>({
    queryKey: ["medicines", page, pageSize],
    queryFn: () => getALLMedicineAPI(page, pageSize),
  });
};

export const useSearchMedicine = (
  searchParams: {
    name?: string;
    indication?: string;
    page?: number;
    pageSize?: number;
  },
  enabled: boolean = true
) => {
  return useQuery<MedicineResponse>({
    queryKey: ["searchMedicines", searchParams],
    queryFn: () => searchMedicineAPI(searchParams),
    enabled: enabled && (!!searchParams.name || !!searchParams.indication),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetMedicine = (id: string) => {
  return useQuery({
    queryKey: ["medicine", id],
    queryFn: () => getMedicineAPI(id),
    enabled: !!id, 
  });
};