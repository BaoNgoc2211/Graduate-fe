import { MedCategoryEnum } from "@/enum/medicine/medicine-category";

export interface IMedicineCategory {
  code: string;
  name: MedCategoryEnum;
  icon: string;
}
