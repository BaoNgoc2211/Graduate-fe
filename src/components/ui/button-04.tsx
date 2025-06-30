import { LoaderCircle } from "lucide-react";
import React from "react";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: (
    e?: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  className?: string;
  isLoading?: boolean;
}
const Button04 = (props: ButtonProps) => {
  return (
    <button
      className="ext-[14px] border border-blue-900 w-full p-1 bg-white text-blue-900 hover:bg-blue-900 hover:text-white"
      disabled={props.isLoading}
      onClick={props.onClick}
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

export default Button04;
