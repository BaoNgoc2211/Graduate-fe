import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}
//bg-gradient-to-r from-indigo-600 to-blue-600
const Button02 = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`w-auto px-4 py-2 rounded-full text-center
      bg-white text-red-600 border border-red-600 
      font-bold transition-all duration-300 
      hover:bg-red-600 hover:text-white 
      shadow-sm hover:shadow-md active:translate-y-[1px]  ${
        props.className || ""
      }`}
    >
      {props.text}
    </button>
  );
};

export default Button02;
