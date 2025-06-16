"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { IVerify } from "@/interface/auth/auth.interface";
import { verifyEmailAPI } from "@/api/auth.api";
import { toast } from "react-toastify";
const VerifyEmail = () => {
  const router = useRouter();
  const [verify, setVerify] = useState({
    email: "",
    otp: "",
  });
  const mutation = useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: (data: IVerify) => verifyEmailAPI(data),
    onSuccess: () => {
      toast.success("Xác thực thành công");
      router.push("/");
    },
    onError: (error: unknown) => {
      const err = error as { message: string };
      console.error("OTP không hợp lệ:", err.message);
    },
  });
  const handleVerify = () => {
    if (verify.otp.length < 6) {
      toast.error("Vui lòng nhập đầy đủ OTP.");
      return;
    }
    mutation.mutate(verify);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 md:p-8">
        <p className=" text-2xl md:text-3xl font-semibold  text-center text-[#1850a3] mb-2">
          Verify OTP
        </p>
        <hr className="h-[2px] w-10 mx-auto bg-gray-800 mb-4 border-none"></hr>
        <p className="text-center text-sm text-gray-500 mb-6">{verify.email}</p>
        <div className="flex justify-center mb-4">
          {" "}
          <InputOTP
            maxLength={6}
            value={verify.otp}
            className="text-center"
            onChange={(val) => setVerify((prev) => ({ ...prev, otp: val }))}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-center text-sm mb-4">
          {verify.otp === "" ? (
            <>Nhập mã OTP của bạn.</>
          ) : (
            <>
              Bạn đã nhập:<span className="font-medium">{verify.otp}</span>{" "}
            </>
          )}
        </div>
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Xác thực
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
