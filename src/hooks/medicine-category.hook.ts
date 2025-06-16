import {
  getALLMedCategoryAPI,
  getMedCateById,
} from "@/api/medicine/medicine-category.api";
import { IMedicineCategory } from "@/interface/medicine/medicine-category";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useMedicineCategories = () => {
  return useQuery<{ data: IMedicineCategory[] }>({
    queryKey: ["medicine-categories"],
    queryFn: getALLMedCategoryAPI,
  });
};
export const useMedicineCategoryById  = () => {
  const params = useParams<{ _id: string }>();
  const categoryId = params._id;
  console.log("Category ID:", categoryId);
  const isIdReady = !!categoryId;
  return useQuery({
    queryKey: ["medicine-category-by-id", categoryId],
    queryFn: () => getMedCateById(categoryId),
    enabled: isIdReady,
  });
};
