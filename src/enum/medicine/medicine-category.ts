export const NameEnum = {
  PRESCRIPTION: "Thuốc kê đơn",
  NON_PRESCRIPTION: "Thuốc không kê đơn",
  SUPPLEMENT: "Thực phẩm chức năng",
  MEDICAL: "Vắc-xin – Sinh phẩm",
  VACCINES: "Thuốc Đông y – Dược liệu",
  TRADITIONAL: "Thiết bị y tế",
} as const;

export const NameEnumEn = {
  PRESCRIPTION: "Prescription Medicine",
  NON_PRESCRIPTION: "Over-the-Counter Medicine",
  SUPPLEMENT: "Dietary Supplement",
  MEDICAL: "Biological Product",
  VACCINES: "Traditional Medicine",
  TRADITIONAL: "Medical Device",
} as const;

export type MedCategoryEnum = keyof typeof NameEnum;
