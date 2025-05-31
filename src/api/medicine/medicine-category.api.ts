import APIConfig from "../api.config";
// import { IMedicineCategory } from "@/interface/medicine/medicine-category";

// export const addMeCategoryAPI = async (data: IMedicineCategory) => {
//   const res = await APIConfig.post(`/api/medicine/`, data);
//   return res.data;
// };
// export const deleteMedCategoryAPI = async (id: string) => {
//   const res = await APIConfig.delete(`/api/medicine/${id}`);
//   return res.data;
// };
// export const editMedCategoryAPI = async (
//   id: string,
//   data: IMedicineCategory
// ) => {
//   const res = await APIConfig.put(`/api/medicine/${id}`, data);
//   return res.data;
// };
export const getMedCategoryAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/medicine/cate/${id}`);
  return res.data;
};
export const getALLMedCategoryAPI = async () => {
  const res = await APIConfig.get(`/api/medicine/cate`);
  return res.data;
};
