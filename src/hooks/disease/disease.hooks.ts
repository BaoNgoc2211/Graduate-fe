import {
  getAllDiseasesAPI,
  getDiseaseByIdAPI,
  GetDiseasesParams
} from "@/api/disease/disease.api"
import type {DiseaseListResponse } from "@/interface/disease/disease.interface"
import { useQuery } from "@tanstack/react-query"

export const useDiseases = (params?: GetDiseasesParams) => {
  return useQuery<DiseaseListResponse>({
    queryKey: ["diseases", params],
    queryFn: () => getAllDiseasesAPI(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useDiseaseById = (id: string) => {
  return useQuery({
    queryKey: ["disease", id],
    queryFn: () => getDiseaseByIdAPI(id),
    enabled: !!id,
  })
}