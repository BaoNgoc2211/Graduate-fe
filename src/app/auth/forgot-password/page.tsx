import { forgotPasswordAPI } from "@/api/auth.api";
import { assets } from "@/assets/assets";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [forgot, setForgot] = useState({
    email: "",
  });
  console.log(forgot);
  const mutation = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: () => forgotPasswordAPI({ email: forgot.email }),
    onSuccess: () => {
      toast({
        title: "OTP sent email",
        description: `Hi ${forgot.email}, we have sent you an email.`,
      });
      navigate("/reset-password", { state: { email: forgot.email } });
    },
  });

  return (
    <div className=" w-50 sm:grid grid-cols-[1fr_1fr]">
      {/* left reset password */}
      <div className="flex flex-col justify-center items-center py-3 px-4 mt-5 border m-1">
        <div className="max-w-sm w-full">
          <h2 className="text-2xl font-semibold">Forgot password?</h2>
          <p className="text-gray-500 text-sm mb-4">
            No worries, we'll send you reset instructions.
          </p>
          <InputComponent
            type="text"
            placeholder="Enter your email"
            value={forgot.email}
            onChange={(text) =>
              setForgot({ ...forgot, email: text.target.value })
            }
          />
          <div className="mb-4">
            <ButtonComponent
              name="Reset password"
              isLoading={mutation.isPending}
              onClick={() => mutation.mutate()}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <img className=" w-5 " src={assets.dropdown_icon} alt="" />
            <Link to="/login" className="">
              Back to log in
            </Link>
          </div>
        </div>
      </div>
      {/* right reset password */}
      <div className="items-center w-2/4">
        <img src={assets.forgot_password} alt="" />
      </div>
    </div>
  );
};

export default ForgotPassword;