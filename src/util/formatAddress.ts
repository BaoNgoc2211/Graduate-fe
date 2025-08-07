import { IInfo } from "@/interface/auth/auth.interface";

export const formatAddress = (address: IInfo): string => {
  if (typeof address === "string") {
    return address;
  }

  if (typeof address === "object" && address !== null) {
    const parts = [];

    // if (address.street) parts.push(address.street);
    if (address.address?.street) parts.push(address.address.street);
    // if (address.wardName) parts.push(address.wardName);
    if (address.address?.wardName) parts.push(address.address.wardName);
    // if (address.provinceName) parts.push(address.provinceName);
    if (address.address?.provinceName) parts.push(address.address.provinceId);

    return parts.join(", ");
  }

  return "Chưa có thông tin địa chỉ";
};
