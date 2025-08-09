import { IVoucher } from "@/interface/voucher.interface";
import APIConfig from "./api.config";

export const getAllVoucherAPI = async (): Promise<{
  data: IVoucher[];
}> => {
  const response = await APIConfig.get(`/api/voucher/getallvoucher`);
  return response.data as Promise<{ data: IVoucher[] }>;
};

export const getValidVoucherAPI = async (): Promise<{
  data: IVoucher[];
}> => {
  const response = await APIConfig.get(`/api/voucher/getvoucher`);
  return response.data as Promise<{ data: IVoucher[] }>;
};

export const getByIdVoucherAPI = async (
  voucher_id: string
): Promise<{ data: IVoucher }> => {
  const response = await APIConfig.get<{ data: IVoucher }>(
    `/api/voucher/cate/${voucher_id}`
  );
  return response.data;
};
