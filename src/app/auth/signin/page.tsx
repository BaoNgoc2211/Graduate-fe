"use client";
import { assets } from "../../../../public/assets";
import Button from "@/components/ui/button";
import Input from "@/components/input";
import { Lock, Phone } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
const SignIn = () => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  // bg-gradient-to-br from-green-200 to-green-500
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00416A] px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <h2 className="font-bold text-center text-2xl text-[#1850a3] mb-1">
          Sign In
        </h2>
        <p className="text-center text-sm text-[#628CA9] mb-6">
          Join the community today!
        </p>
        <button className="w-full py-2 rounded-full font-bold border border-gray-300 text-[#1850a3]  flex items-center justify-center gap-1 mb-4 shadow-sm hover:bg-gray-100 transition">
          <Image src={assets.logoGoogle} alt="Google" width={20} height={20} />
          <span>Use Google account</span>
        </button>
        <div className="text-center text-[#628CA9] text-sm mb-4">or</div>
        <form className="mb-2">
          <Input
            placeholder="Enter your mobile or email"
            type="text"
            label="Mobile number or Email"
            value={signIn.email}
            onChange={(text) =>
              setSignIn({ ...signIn, email: text.target.value })
            }
            icon={<Phone size={16} className="text-[#628CA9] opacity-80" />}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            label="Password"
            value={signIn.password}
            onChange={(password) =>
              setSignIn({ ...signIn, password: password.target.value })
            }
            icon={<Lock size={16} className="text-[#628CA9] opacity-80" />}
          />
          <Button text="Sign In" onClick={() => alert("SignIn Click")} />
        </form>
        <p className="text-sm text text-center text-gray-700 mb-4">
          Join the community today!
          <span className="ml-1 text-[#628CA9] hover:underline cursor-pointer">
            Sign Up
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
