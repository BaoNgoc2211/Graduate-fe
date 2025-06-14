// data/diseaseData.ts
export const BodyPartEnum = {
  HEAD: "Đầu",
  NECK: "Cổ",
  CHEST: "Ngực",
  ABDOMEN: "Bụng",
  GENITAL: "Sinh dục",
  LIMBS: "Tứ chi",
  SKIN: "Da",
} as const;

export type BodyPart = keyof typeof BodyPartEnum;

export const mockDiseases = [
  { code: "D001", name: "Ung thư mô liên kết", bodyPart: "HEAD" },
  { code: "D002", name: "Bạch tạng", bodyPart: "HEAD" },
  { code: "D003", name: "Viêm mô tế bào", bodyPart: "SKIN" },
  // Thêm dữ liệu mẫu khác...
];
