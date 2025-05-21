import APIConfig from "./api.config";

export const LatestCollectionAPI = async (active: string) => {
  const response = await APIConfig.get(`api/medicine/`, { params: { active } });
  return response.data;
};
