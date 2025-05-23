import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}
const ButtonStep = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      // className="w-full py-2 rounded-full bg-[#00416A] text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#00416A] hover:to-[#006994] active:translate-y-[1px] shadow-md hover:shadow-md"
      className="border border-gray-300 rounded-lg px-6 py-2  w-full
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
