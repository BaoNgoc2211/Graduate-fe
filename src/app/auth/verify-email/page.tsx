"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const VerifyEmail = () => {
  const [verify, setVerify] = useState({
    email: "",
    otp: "",
  });
  return (
    <div className="min-h-screen flex items-center justify-between px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-full p-8">
        <p className="text-center font-bold text-2xl text-[#1850a3] mb-1">
          Verify OTP
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800"></hr>
        <p>{verify.email}</p>
        <InputOTP
          maxLength={6}
          value={verify.otp}
          onChange={(value) => setVerify({ ...verify, otp: value })}
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
        <div className="text-center text-sm">
          {verify.otp === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {verify.otp}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
