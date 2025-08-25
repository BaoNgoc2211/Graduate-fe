import { IDisCategory } from "@/interface/disease/disease-category.interface";
import APIConfig from "../api.config";
// export const getAllDisCategoryAPI = async (): Promise<{
//   data: IDisCategory[];
// }> => {
//   const response = await APIConfig.get("api/disCategory/getAll");
//   return response.data?.data;
// };
export const getAllDisCategoryAPI = async (): Promise<IDisCategory[]> => {
  const response = await APIConfig.get<{ data: IDisCategory[] }>(
    "api/disCategory/getAll"
  );
  return response.data.data; // bây giờ TS hiểu response.data có data
};
export const getDisCateById = async (
  disCategory_id: string
): Promise<{ data: IDisCategory }> => {
  const response = await APIConfig.get<{ data: IDisCategory }>(
    `/api/disCategory/${disCategory_id}`
  );
  return response.data;
};
