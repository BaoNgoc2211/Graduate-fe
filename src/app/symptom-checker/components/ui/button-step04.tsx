import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}
const ButtonStep = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="border border-gray-300 rounded-lg px-4 py-2  w-40
      bg-white text-[#00416A] 
      font-bold transition-all duration-300 
      hover:bg-[#00416A] hover:text-white 
      shadow-sm hover:shadow-md active:translate-y-[1px]"
    >
      {props.text}
    </button>
  );
};

export default ButtonStep;
