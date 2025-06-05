import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}
const Button01 = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`w-auto px-1 py-1 rounded-full 
      bg-white text-[#00416A] border border-[#00416A] 
      font-bold transition-all duration-300 
      hover:bg-[#00416A] hover:text-white 
      shadow-sm hover:shadow-md active:translate-y-[1px]  ${
        props.className || ""
      }`}
    >
      {props.text}
    </button>
  );
};

export default Button01;
