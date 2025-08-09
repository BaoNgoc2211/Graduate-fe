"use client";

import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import InputComponent from "@/components/auth/input";
import ButtonComponent from "@/components/auth/button";
import { useResetPassword } from "@/hooks/auth.hook";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [reset, setReset] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Use the custom hook
  const resetPasswordMutation = useResetPassword();

  useEffect(() => {
    // Get email from URL params or state
    const emailFromParams = searchParams.get('email');
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  const handleSubmit = () => {
    // Validation
    if (!email.trim()) {
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return;
    }
    
    if (!reset.otp || reset.otp.length !== 6) {
      return;
    }
    
    if (!reset.newPassword.trim()) {
      return;
    }
    
    if (reset.newPassword.length < 6) {
      return;
    }
    
    if (reset.newPassword !== reset.confirmPassword) {
      return;
    }

    resetPasswordMutation.mutate(
      {
        email: email.trim(),
        otp: reset.otp,
        newPassword: reset.newPassword,
      },
      {
        onSuccess: () => {
          router.push("/auth/signin");
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-3">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center">Đặt lại mật khẩu</h2>
        <p className="text-gray-600 text-center mb-6">
          Chúng tôi đã gửi mã xác thực đến {email || "email của bạn"}
        </p>
        
        <div className="space-y-4">
          {/* Email field (if not from params) */}
          {!email && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email:
              </label>
              <InputComponent
                placeholder="Nhập email của bạn"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {/* OTP Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhập mã xác thực:
            </label>
            <InputOTP
              maxLength={6}
              value={reset.otp}
              onChange={(value) => setReset({ ...reset, otp: value })}
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

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu mới:
            </label>
            <InputComponent
              placeholder="Nhập mật khẩu mới"
              type="password"
              value={reset.newPassword}
              onChange={(e) =>
                setReset({ ...reset, newPassword: e.target.value })
              }
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu:
            </label>
            <InputComponent
              placeholder="Nhập lại mật khẩu mới"
              type="password"
              value={reset.confirmPassword}
              onChange={(e) =>
                setReset({ ...reset, confirmPassword: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <ButtonComponent
            name="Đặt lại mật khẩu"
            isLoading={resetPasswordMutation.isPending}
            onClick={handleSubmit}
          />
        </div>

        <div className="text-center mt-4 text-sm">
          <p className="text-gray-600">
            Chưa nhận được email?{" "}
            <Link
              href="/auth/forgot-password"
              className="text-blue-600 font-medium hover:underline"
            >
              Gửi lại mã
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword