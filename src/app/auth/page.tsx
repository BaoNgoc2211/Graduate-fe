"use client";
import { assets } from "../../../public/assets";
import Button from "@/components/ui/button-01";
import Input from "@/components/input";
import { Lock, Phone } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signInAPI } from "@/api/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const mutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: () => signInAPI(signIn),
    onSuccess: () => {
      toast.success("Đăng nhập thành công");
      router.push("/");
    },
    onError: () => {
      toast.error("Đăng nhập thất bại: " + "Email hoặc mật khẩu không đúng");
    },
  });
  const handleSignIn = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    mutation.mutate();
  };
  return (
    <div className="min-h-screen flex items-center bg-gray-100 justify-center px-4">
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
        <form className="mb-2" onSubmit={handleSignIn}>
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
          <Button text="Sign In" isLoading={mutation.isPending} type="submit" />
        </form>
        <p className="text-sm text text-center text-gray-700 mb-4">
          Join the community today!
          <Link href={"/auth/signup"}>
            <span className="ml-1 text-[#628CA9] hover:underline cursor-pointer">
              Sign Up
            </span>{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
