import { DisUsageGroupEnum } from "../../enum/disease/disease-usage.enum";

export interface IDiseaseUsageGroup {
  code: string;
  name: DisUsageGroupEnum;
  icon: string;
  disCategory: string[];
}
