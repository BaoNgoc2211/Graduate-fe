import { IDisease } from "./disease.interface";

export interface IDiseaseUsageGroup {
  _id: string;
  name: string;
  icon: string;
  disCategory?: IDisease[];
}
