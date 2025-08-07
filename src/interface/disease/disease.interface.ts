// import { SeverityLevelEnum } from "../../enum/disease/disease.enum";
// import { RiskGroup } from "../../enum/disease/disease.enum";
// export interface IDisease {
//   _id?: string;
//   code: string;
//   name: string;
//   nameDiff?: string;
//   image?: string;
//   common: string;
//   riskGroup: RiskGroup[]; // nhóm nguy cơ
//   causes: string;
//   diagnosis: string;
//   prevention: string;
//   severityLevel: SeverityLevelEnum;
//   treatmentPlan: string;
//   notes?: string;
//   status: string;
//   symptomIds: string[];
//   diseaseCategoryIds: string[];
//   diseaseUsageGroupIds: string[];
// }
// export interface Disease_Symptom {
//   disease_id: string;
//   symptom_id: string;
// }
// export interface Disease_Medicine {
//   disease_id: string;
//   medicine_id: string;
// }
// export interface IProductMethod extends Document {
//   addDisease(data: IDisease): Promise<IDisease>;
//   removeDisease(id: string): Promise<void>;
//   getAllDisease(page: number, size: number, name: string): Promise<IDisease[]>;
// }
// export interface IDiseaseRepo {
//   page: number;
//   size: number;
//   name: string;
// }
// interfaces/disease.interface.ts
//#region new
// export interface IDisease {
//   _id: string
//   code: string
//   name: string
//   nameDiff?: string
//   common: string
//   riskGroup: string[]
//   causes: string
//   diagnosis: string
//   prevention: string
//   severityLevel: string
//   treatmentPlan: string
//   notes: string
//   status: string
//   symptomIds: string[] | Symptom[]
//   diseaseCategoryIds: string[] | DiseaseCategory[]
//   diseaseUsageGroupIds: string[] | DiseaseUsageGroup[]
//   createdAt: string
//   updatedAt: string
//   __v?: number
//   image?: string
// }

// export interface DiseaseListResponse {
//   message: string
//   data: {
//     currentPage: number
//     totalPages: number
//     totalItems: number
//     limit: number
//     data: Disease[]
//   }
// }

// export interface DiseaseDetailResponse {
//   message: string
//   data: Disease
// }

// // Dùng cho khi detail có trả về đối tượng thay vì ID
// export interface Symptom {
//   _id: string
//   name: string
// }

// export interface DiseaseCategory {
//   _id: string
//   name: string
// }

// export interface DiseaseUsageGroup {
//   _id: string
//   name: string
// }
//#endregion
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


