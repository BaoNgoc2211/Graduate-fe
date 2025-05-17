// import mongoose from "mongoose";
// export interface IMedicine {
//   code: string;
//   name: string;
//   thumbnail: string;
//   image: string;
//   packaging: string;
//   dosageForm: string;
//   stockQuantity: string;
//   use: string; // cách dùng
//   dosage: string; // liều dùng
//   indication: string; // công dụng
//   adverse: string; // tác dụng phụ
//   contraindications: string; // chống chỉ định
//   precautions: string; // thận trọng khi sử dụng
//   Ability: string; //Khả năng lái xe và vận hành máy móc
//   Pregnancy: string; // Thời kỳ mang thai và cho con bú
//   DrugInteractions: string; // Tương tác thuốc
//   Storage: string; // bảo quản
//   active: string;
//   medCategory_id: mongoose.Types.ObjectId[];
//   medUsage_id: mongoose.Types.ObjectId[];
//   review_id: mongoose.Types.ObjectId[];
//   manufacturer_id: mongoose.Types.ObjectId;
//   bath_id: mongoose.Types.ObjectId[];
// }

// export interface IReview {
//   user: mongoose.Types.ObjectId;
//   rating: number;
//   comment: string;
// }
// export interface IDistributor {
//   nameCO: string;
//   nameRep: string;
//   email: string;
//   phone: number;
//   address: string;
//   country: string;
// }
// export interface IManufacturer {
//   code: string;
//   NameCO: string;
//   Country: string;
//   Branch: string; // thương hiệu
// }
// export interface IImportBath {
//   bathNumber: string;
//   medicine_id: mongoose.Types.ObjectId;
//   distributor_id: mongoose.Types.ObjectId;
//   importDate: Date;
//   expiryDate: Date;
//   quantity: number;
//   price: number;
// }
import mongoose from "mongoose";
import {
  DetailedDosageFormEnum,
} from "../../enum/medicine/medicine.enum";

export interface IMedicine {
  code?: string;
  name: string;
  thumbnail?: string;
  image: string[];
  packaging: string;
  dosageForm: DetailedDosageFormEnum;
  dosage?: string;
  soldQuantity?: number;
  stockQuantity: number;
  usageInstruction: string;
  indication?: string;
  side_Effect?: string;
  contraindication?: string;
  precaution?: string;
  ability?: string;
  pregnacy?: string;
  drug_Interaction?: string;
  preserve?: string;
  active?: string;
  med_CategoryId: mongoose.Types.ObjectId[];
}

export interface IReview {
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}
