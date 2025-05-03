import { DisCategoryEnum } from "@/enum/disease/disease-category.enum";
import mongoose from "mongoose";

export interface IDisCategory {
  name: DisCategoryEnum;
  icon: string;
  disUsage: mongoose.Types.ObjectId[];
  disease: mongoose.Types.ObjectId[];
}
