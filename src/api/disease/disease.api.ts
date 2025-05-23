import APIConfig from "../api.config";

export const getMedicineAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/disease/get/${id}`);
  return res.data;
};
export const getALLMedicineAPI = async () => {
  const res = await APIConfig.get(`/api/disease/get`);
  return res.data;
};
