import React from "react";

interface Input {
  label?: string;
  placeholder: string;
  type: "text" | "password";
  value?: string;
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = (props: Input) => {
  return (
    <>
      <div className="flex flex-col mb-4">
        {props.label && (<label className="text-black font-medium text-sm mb-1">{props.label}</label>)}
        
        <div className="flex items-center border-b border-gray-300 border-0 focus-within:border-blue-500 mb-5">
          <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className="flex-1 px-2 py-2 text-sm text-black bg-transparent focus:outline-none"
          />
          {props.icon && <div className="mr-2 text-gray-400">{props.icon}</div>}
        </div>
      </div>
    </>
  );
};

export default Input;
