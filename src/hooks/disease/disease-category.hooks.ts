import { getDisCateById } from "./../../api/disease/disease-category.api";
import { getAllDisCategoryAPI } from "@/api/disease/disease-category.api";
import { IDisCategory } from "@/interface/disease/disease-category.interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useDiseaseCategories = () => {
  return useQuery<{ data: IDisCategory[] }>({
    queryKey: ["disease-categories"],
    queryFn: getAllDisCategoryAPI,
  });
};
export const useDiseaseCategoryById = () => {
  const params = useParams<{ _id: string }>();
  const categoryId = params._id;
  console.log("Category ID:", categoryId);
  const isIdReady = !!categoryId;
  return useQuery({
    queryKey: ["disease-category-by-id", categoryId],
    queryFn: () => getDisCateById(categoryId),
    enabled: isIdReady,
  });
};
