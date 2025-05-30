import APIConfig from "./api.config";

// export const LatestCollectionAPI = async (active: string) => {
//   const response = await APIConfig.get(`api/medicine/`, { params: { active } });
//   return response.data;
// };
export const LatestCollectionAPI = async (createAdd: Date) => {
  const response = await APIConfig.get(`api/medicine/`, {
    params: { createAdd },
  });
  return response.data;
};
