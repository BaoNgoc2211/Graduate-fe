"use client";
import Input from "@/components/input";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { Mail, Lock, User } from "lucide-react"; //CircleCheckBig, Circle
import { assets } from "@/assets/assets";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-blue-500 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-1">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Join the community today!
        </p>

        <button className="w-full py-2 rounded-full border border-gray-300 text-sm text-blue-500 flex items-center justify-center gap-2 mb-4 shadow-sm hover:bg-gray-100 transition">
          <Image src={assets.logoGoogle} alt="Google" width={20} height={20} />
          <span>Use Google account</span>
        </button>

        <div className="text-center text-gray-400 text-sm mb-4">or</div>

        <form>
          <Input
            placeholder="Enter your name"
            type="text"
            label="Your Name"
            value={signUp.name}
            onChange={(text) =>
              setSignUp({ ...signUp, name: text.target.value })
            }
            icon={<User size={16} />}
          />
          <Input
            placeholder="Enter your mobile number or email"
            type="text"
            label="Mobile number or Email"
            value={signUp.email}
            onChange={(text) =>
              setSignUp({ ...signUp, email: text.target.value })
            }
            icon={<Mail size={16} />}
          />
          <Input
            placeholder=""
            type="password"
            label="Password"
            value={signUp.password}
            onChange={(password) =>
              setSignUp({ ...signUp, password: password.target.value })
            }
            icon={<Lock size={16} />}
          />
          <Button text="Sign up" onClick={() => alert("Signup clicked")} />
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already a member?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
