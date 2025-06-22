import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import InputComponent from "@/components/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { resetPasswordAPI } from "@/api/auth.api";
import Button04 from "@/components/ui/button-04";
import { toast } from "react-toastify";
import Link from "next/link";
const ResetPassword = () => {
  const router = useRouter();
  const [reset, setReset] = useState({
    OTP: "",
    newPassword: "",
  });
  console.log(reset);
  const mutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: () =>
      resetPasswordAPI({
        OTP: reset.OTP,
        newPassword: reset.newPassword,
      }),
    onSuccess: () => {
      toast.success("Đặt lại mật khẩu thành công!");
      router.push("/auth/signin");
    },
    onError: (error: unknown) => {
      const err = error as { message: string };
      toast.error("Đăng lại mật khẩu thất bại " + err.message);
    },
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-3">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center">Enter your code</h2>
        <p className="text-gray-600 text-center mb-6">
          We send a code to test@gmail.com
        </p>
        <div className="space-y-4 ">
          {/* Ma OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter code:
            </label>
            <InputOTP
              maxLength={6}
              value={reset.OTP}
              onChange={(value) => setReset({ ...reset, OTP: value })}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {/* Mat khau moi */}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              New password
            </p>
            <InputComponent
              placeholder="Enter your new password"
              type="password"
              value={reset.newPassword}
              onChange={(e) =>
                setReset({ ...reset, newPassword: e.target.value })
              }
            />
          </div>
          {/* Xac nhan mat khau */}
          <div>
            {/* <p className="block text-sm font-medium text-gray-700 mb-2">
              Confirm password
            </p>
            <InputComponent
              placeholder="Confirm your password"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            /> */}
            {/* Nut xac nhan */}
            <Button04
              text="Reset password"
              isLoading={mutation.isPending}
              onClick={() => mutation.mutate()}
            />
          </div>
          <div className="text-center mt-4 text-sm">
            <p className="text-gray-600">
              Did not receive the email{""}
              <Link
                href="/"
                className="ext-blue-600 font-medium hover:underline"
              >
                Click to resend
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
