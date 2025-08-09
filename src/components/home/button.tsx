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
  );
};

export default Button;
