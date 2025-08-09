export interface IDisease {
  _id: string
  code: string
  name: string
  nameDiff?: string
  common: string
  riskGroup: string[]
  causes: string
  diagnosis: string
  prevention: string
  severityLevel: string
  treatmentPlan: string
  notes: string
  status: string
  symptomIds: string[] | Symptom[]
  diseaseCategoryIds: string[] | DiseaseCategory[]
  diseaseUsageGroupIds: string[] | DiseaseUsageGroup[]
  createdAt: string
  updatedAt: string
  __v?: number
  image?: string
}

export interface DiseaseListResponse {
  message: string
  data: {
    currentPage: number
    totalPages: number
    totalItems: number
    limit: number
    data: IDisease[]
  }
}

export interface DiseaseDetailResponse {
  message: string
  data: IDisease
}

// Dùng cho khi detail có trả về đối tượng thay vì ID
export interface Symptom {
  _id: string
  name: string
}

export interface DiseaseCategory {
  _id: string
  name: string
}

export interface DiseaseUsageGroup {
  _id: string
  name: string
}


