"use client"

import {
  getAllDiseasesAPI,
  getDiseaseByIdAPI,
} from "@/api/disease/disease.api"
import type { IDisease } from "@/interface/disease/disease.interface"
import {useQuery } from "@tanstack/react-query"

export const useDiseases = () => {
  return useQuery<{ data: IDisease[] }>({
    queryKey: ["diseases"],
    queryFn: getAllDiseasesAPI,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  })
}

export const useDiseaseById = (id: string) => {
  return useQuery({
    queryKey: ["disease", id],
    queryFn: () => getDiseaseByIdAPI(id),
    enabled: !!id,
  })
}