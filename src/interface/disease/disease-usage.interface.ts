import mongoose from "mongoose";
import { DisUsageGroupEnum } from "../../enum/disease/disease-usage.enum";

export interface IDiseaseUsageGroup {
  name: DisUsageGroupEnum;
  icon: string;
  diseaseCategory: mongoose.Types.ObjectId[];
  disease: mongoose.Types.ObjectId[];
}