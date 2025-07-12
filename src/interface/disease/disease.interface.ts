import { SeverityLevelEnum } from "../../enum/disease/disease.enum";
import { RiskGroup } from "../../enum/disease/disease.enum";
export interface IDisease {
  _id?: string;
  code: string;
  name: string;
  nameDiff?: string;
  image?: string;
  common: string;
  riskGroup: RiskGroup[]; // nhóm nguy cơ
  causes: string;
  diagnosis: string;
  prevention: string;
  severityLevel: SeverityLevelEnum;
  treatmentPlan: string;
  notes?: string;
  status: string;
  symptomIds: string[];
  diseaseCategoryIds: string[];
  diseaseUsageGroupIds: string[];
}
export interface Disease_Symptom {
  disease_id: string;
  symptom_id: string;
}
export interface Disease_Medicine {
  disease_id: string;
  medicine_id: string;
}
export interface IProductMethod extends Document {
  addDisease(data: IDisease): Promise<IDisease>;
  removeDisease(id: string): Promise<void>;
  getAllDisease(page: number, size: number, name: string): Promise<IDisease[]>;
}
export interface IDiseaseRepo {
  page: number;
  size: number;
  name: string;
}
