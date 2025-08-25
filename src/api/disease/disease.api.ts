import {
  IDisease,
  DiseaseListResponse,
} from "./../../interface/disease/disease.interface";
import APIConfig from "@/api/api.config";

export interface GetDiseasesParams {
  page?: number;
  limit?: number;
  search?: string;
  severity?: string;
  status?: string;
}
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export const getAllDiseasesAPI = async (
  params?: GetDiseasesParams
): Promise<DiseaseListResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.severity && params.severity !== "all")
    queryParams.append("severity", params.severity);
  if (params?.status && params.status !== "all")
    queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = queryString ? `/api/disease?${queryString}` : `/api/disease`;

  const response = await APIConfig.get<DiseaseListResponse>(url);
  return response.data;
};

// export const getDiseaseByIdAPI = async (
//   id: string
// ): Promise<{ data: IDisease }> => {
//   // const response = await APIConfig.get(`/api/disease/detail/${id}`)
//   const response = await APIConfig.get(`/api/disease/${id}`);
//   return response.data;
// };
export const getDiseaseByIdAPI = async (
  id: string
): Promise<ApiResponse<IDisease>> => {
  const response = await APIConfig.get<ApiResponse<IDisease>>(
    `/api/disease/detail/${id}` // dùng endpoint detail theo BE
  );
  return response.data;
};
