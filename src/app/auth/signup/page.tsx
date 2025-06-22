"use client";
import Input from "@/components/input";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import { assets } from "../../../../public/assets";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signupAPI } from "@/api/auth.api";
import { toast } from "sonner";
import Link from "next/link";
const SignUp = () => {
  const router = useRouter();
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const mutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: () => signupAPI(signUp),
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(signUp.email)}`
      );
    },
    onError: () => {
      toast.error("Đăng ký thất bại ");
    },
  });
  const handleSignUp = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  //bg-gradient-to-br from{#7BAFD4} to-blue-500 #1850a3 #00416A #628CA9 #628CA9
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#67b448] mb-1">
          Create Account
        </h2>
        <p className="text-center text-sm text-[#70b678] mb-6">
          Join the community today!
        </p>

        <button className="w-full py-2 rounded-full font-extrabold border border-gray-300 text-sm text-[#67b448] flex items-center justify-center gap-2 mb-4 shadow-sm hover:bg-gray-100 transition">
          <Image src={assets.logoGoogle} alt="Google" width={28} height={28} />
          <span>Use Google account</span>
        </button>

        <div className="text-center text-[#70b678] text-sm mb-4">or</div>

        <form onSubmit={handleSignUp}>
          <Input
            placeholder="Enter your name"
            type="text"
            label="Your Name"
            value={signUp.name}
            onChange={(text) =>
              setSignUp({ ...signUp, name: text.target.value })
            }
            icon={<User size={16} className="text-[#628CA9] opacity-80" />}
          />
          <Input
            placeholder="Enter your mobile number or email"
            type="text"
            label="Mobile number or Email"
            value={signUp.email}
            onChange={(text) =>
              setSignUp({ ...signUp, email: text.target.value })
            }
            icon={<Mail size={16} className="text-[#628CA9] opacity-80" />}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            label="Password"
            value={signUp.password}
            onChange={(password) =>
              setSignUp({ ...signUp, password: password.target.value })
            }
            icon={<Lock size={16} className="text-[#628CA9] opacity-80" />}
          />
          <Button text="Sign up" type="submit" isLoading={mutation.isPending} />
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already a member?{" "}
          <Link href={"/auth"}>
            {" "}
            <span className="text-[#628CA9] hover:underline cursor-pointer">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
