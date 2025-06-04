import { DisCategoryEnum } from "@/enum/disease/disease-category.enum";

export interface IDisCategory {
  code: string;
  name: DisCategoryEnum;
  icon: string;
  disUsage?: string[];
}
