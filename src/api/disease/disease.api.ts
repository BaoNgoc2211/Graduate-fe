import { IDisease } from './../../interface/disease/disease.interface';
// import {
//   DiseaseDetailResponse,
//   DiseaseListResponse,
// } from "@/interface/disease/disease.interface";
// import APIConfig from "../api.config";

// export const getDiseases = async (
//   page = 1,
//   limit = 10
// ): Promise<DiseaseListResponse> => {
//   const res = await APIConfig.get(`/api/disease?page=${page}&limit=${limit}`);
//   return res.data?.data;
// };

// export const getDiseaseDetail = async (
//   id: string
// ): Promise<DiseaseDetailResponse> => {
//   const res = await axios.get(`/api/disease/detail/${id}`);
//   return res.data;
// };
import APIConfig from "@/api/api.config"
// import type { IDisease } from "@/interface/disease/disease.interface"

export const getAllDiseasesAPI = async (): Promise<{
  data: IDisease[]
}> => {
  const response = await APIConfig.get("/api/disease")
  return response.data
}

export const getDiseaseByIdAPI = async (id: string): Promise<{ data: IDisease }> => {
  const response = await APIConfig.get(`/api/disease/detail/${id}`)
  return response.data
}

