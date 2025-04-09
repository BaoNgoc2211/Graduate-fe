import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold hover:opacity-90 transition"
    >
      {props.text}
    </button>
  );
};

export default Button;
