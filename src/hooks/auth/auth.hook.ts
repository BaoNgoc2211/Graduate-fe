import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {  IReset } from "@/interface/auth/auth.interface";
import { resetPasswordAPI } from "@/api/auth/auth.api";

// export const useForgotPassword = () => {
//   return useMutation({
//     mutationFn: (data: IForgotPassword) => forgotPasswordAPI(data),
//     onSuccess: () => {
//       toast.success("Gửi OTP thành công! Vui lòng kiểm tra email của bạn để nhận mã OTP.");
//     },
//     onError: () => {
//       toast.error("Đặt lại mật khẩu thất bại. Vui lòng thử lại sau.");
//     },
//   });
// };

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: IReset) => resetPasswordAPI(data),
    onSuccess: () => {
      toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
    },
    onError: () => {
      toast.error("Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại mã OTP và thử lại.");
    },
  });
};