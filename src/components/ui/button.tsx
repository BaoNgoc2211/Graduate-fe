import { LoaderCircle } from "lucide-react";
import React from "react";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: (e?: React.FormEvent) => void;
  className?: string;
  isLoading?: boolean;
}
const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      // className="w-full py-2 rounded-full bg-[#00416A] text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#00416A] hover:to-[#006994] active:translate-y-[1px] shadow-md hover:shadow-md"
      className={`w-full py-2 rounded-full 
      bg-white text-[#00416A] border border-[#00416A] 
      font-bold transition-all duration-300 
      hover:bg-[#00416A] hover:text-white 
      shadow-sm hover:shadow-md active:translate-y-[1px]  ${
        props.className || ""
      }`}
    >
      {props.isLoading ? (
        <div className="flex gap-x-2 w-full items-center justify-center">
          <LoaderCircle className="animate-spin text-white" />
          Please wait
        </div>
      ) : (
        props.text
      )}
    </button>
  );
};

export default Button;
