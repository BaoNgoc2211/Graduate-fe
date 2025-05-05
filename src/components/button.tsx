import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}
//bg-gradient-to-r from-indigo-600 to-blue-600
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full py-2 rounded-full bg-[#00416A] text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#00416A] hover:to-[#006994] active:translate-y-[1px] shadow-md hover:shadow-md"
    >
      {props.text}
    </button>
  );
};

export default Button;
