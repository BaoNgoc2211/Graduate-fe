import Image from "next/image";
import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
}
//bg-gradient-to-r from-indigo-600 to-blue-600
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition"
    >
      <span>{props.title}</span>
      <span className="text-lg">
        <Image src="/icon/arrow-right.png" alt="" width={5} height={5} />
      </span>
    </button>
    // <button
    //   onClick={props.onClick}
    //   // className="w-full py-2 rounded-full bg-[#00416A] text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#00416A] hover:to-[#006994] active:translate-y-[1px] shadow-md hover:shadow-md"
    //   className={`w-full py-2 rounded-full
    //   bg-white text-[#00416A] border border-[#00416A]
    //   font-bold transition-all duration-300
    //   hover:bg-[#00416A] hover:text-white
    //   shadow-sm hover:shadow-md active:translate-y-[1px]  ${
    //     props.className || ""
    //   }`}
    // >
    //   {props.text}
    // </button>
  );
};

export default Button;
