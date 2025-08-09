import { IDisease } from './../../interface/disease/disease.interface';
import APIConfig from "@/api/api.config"

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

