import { DisCategoryEnum } from "@/enum/disease/disease-category.enum";
import mongoose from "mongoose";

export interface IDisCategory {
  code: string;
  name: DisCategoryEnum;
  icon: string;
  disUsage?: mongoose.Types.ObjectId[];
}
