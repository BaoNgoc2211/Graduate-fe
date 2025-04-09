import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
// import { login } from "./authAPI";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  // const [staySignedIn, setStaySignedIn] = useState(false);staySignedIn

  const handleSubmit = async () => {
    await login({ userId, password });
  };

  return (
    <div className="rounded-full w-[400px] h-[400px] bg-gradient-to-b from-slate-700 to-slate-900 flex flex-col justify-center items-center p-8 text-white">
      <div className="text-4xl mb-4">👤</div>
      <Input
        icon={<FaUser />}
        placeholder="User Name / ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <div className="h-4" />
      <Input
        icon={<FaLock />}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between text-sm my-2 w-full">
        <label>
          <input
            type="checkbox"
            // checked={staySignedIn}
            // onChange={() => setStaySignedIn(!staySignedIn)}
          />{" "}
          Stay signed in
        </label>
        <a href="#" className="underline">
          Forgot User ID or Password?
        </a>
      </div>
      <Button label="LOGIN"  onClick={handleSubmit}/>
      <div className="text-xs mt-2">
        Not registered yet?{" "}
        <a href="#" className="underline">
          Create your account
        </a>
      </div>
    </div>
  );
}
