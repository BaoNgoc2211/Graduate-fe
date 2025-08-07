import { useQuery } from "@tanstack/react-query";
import { getAllVoucherAPI, getValidVoucherAPI, getByIdVoucherAPI } from "@/api/voucher.api";

export const useAllVouchers = () => {
  return useQuery({
    queryKey: ["vouchers-all"],
    queryFn: getAllVoucherAPI,
  });
};

export const useValidVouchers = () => {
  return useQuery({
    queryKey: ["vouchers-valid"],
    queryFn: getValidVoucherAPI,
  });
};

export const useVoucherById = (id: string) => {
  return useQuery({
    queryKey: ["voucher", id],
    queryFn: () => getByIdVoucherAPI(id),
    enabled: !!id,
  });
};