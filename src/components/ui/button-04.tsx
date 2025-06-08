import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}
//bg-gradient-to-r from-indigo-600 to-blue-600
const Button04 = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="ext-[14px] border border-blue-900 w-full p-1 bg-white text-blue-900 hover:bg-blue-900 hover:text-white"
    >
      {props.text}
    </button>
  );
};

export default Button04;
