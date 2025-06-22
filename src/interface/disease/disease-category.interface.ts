import { DisCategoryEnum } from "@/enum/disease/disease-category.enum";

export interface IDisCategory {
  _id: string;
  name: DisCategoryEnum;
  icon: string;
  disUsage?: string[];
}
