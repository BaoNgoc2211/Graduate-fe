import mongoose from "mongoose";
import { SeverityLevelEnum } from "../../enum/disease/disease.enum";

export interface IDisease {
  code: string;
  name: string;
  nameDiff: string;
  image: string;
  common: string;
  riskGroup: string; // nhóm nguy cơ
  causes: string;
  diagnosis: string;
  prevention: string;
  severityLevel: SeverityLevelEnum;
  treatmentPlan: string;
  notes: string;
  symptom: mongoose.Types.ObjectId[];
  disCategory: mongoose.Types.ObjectId[];
  disUsageGroup: mongoose.Types.ObjectId[];
}
export interface Disease_Symptom {
  disease_id: mongoose.Types.ObjectId;
  symptom_id: mongoose.Types.ObjectId;
}
export interface Disease_Medicine {
  disease_id: mongoose.Types.ObjectId;
  medicine_id: mongoose.Types.ObjectId;
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
