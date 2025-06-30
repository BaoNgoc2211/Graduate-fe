// import { LoaderCircle } from "lucide-react";
// import React from "react";

// interface ButtonProps {
//   text?: string;
//   type?: "button" | "submit" | "reset";
//   onClick?: (e?: React.FormEvent) => void;
//   className?: string;
//   isLoading?: boolean;
//   disabled?: boolean;
//   children?: React.ReactNode;
//   size?: "sm" | "md" | "lg";
//   variant?: "primary" | "outline" | "ghost" | "destructive";
// }
// const Button = (props: ButtonProps) => {
//   const getSizeClass = (size: ButtonProps["size"] = "md") => {
//     switch (size) {
//       case "sm":
//         return "text-sm py-1 px-3";
//       case "lg":
//         return "text-lg py-3 px-6";
//       default:
//         return "text-base py-2 px-4";
//     }
//   };
//   const getVariantClass = (variant: ButtonProps["variant"] = "primary") => {
//     switch (variant) {
//       case "outline":
//         return "bg-white text-[#00416A] border border-[#00416A] hover:bg-[#00416A] hover:text-white";
//       case "primary":
//       default:
//         return "bg-[#00416A] text-white hover:bg-[#006994]";
//     }
//   };
//   return (
//     <button
//       type={props.type}
//       onClick={props.onClick}
//       className={`w-full py-2 rounded-full 
//       bg-white text-[#00416A] border border-[#00416A] 
//       font-bold transition-all duration-300 
//       hover:bg-[#00416A] hover:text-white 
//       shadow-sm hover:shadow-md active:translate-y-[1px]   
//       ${getSizeClass(props.size)}
//     ${getVariantClass(props.variant)} 
//     ${props.className || ""}`}
//     >
//       {props.isLoading && <LoaderCircle className="animate-spin h-4 w-4" />}
//       {props.isLoading ? "Vui lòng chờ..." : props.children ?? props.text}
//     </button>
//   );
// };

// export default Button;
import { LoaderCircle } from "lucide-react";
import React from "react";

interface ButtonProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: React.FormEvent) => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost" | "destructive";
}

const Button = (props: ButtonProps) => {
  const {
    type = "button",
    onClick,
    className,
    isLoading,
    disabled,
    children,
    text,
    size = "md",
    variant = "primary",
  } = props;

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm py-1 px-3";
      case "lg":
        return "text-lg py-3 px-6";
      default:
        return "text-base py-2 px-4";
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "bg-white text-[#00416A] border border-[#00416A] hover:bg-[#00416A] hover:text-white";
      case "ghost":
        return "bg-transparent text-[#00416A] hover:bg-[#f0f0f0]";
      case "destructive":
        return "bg-red-600 text-white hover:bg-red-700";
      case "primary":
      default:
        return "bg-[#00416A] text-white hover:bg-[#006994]";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full rounded-full
        font-bold transition-all duration-300 
        shadow-sm hover:shadow-md active:translate-y-[1px]
        flex items-center justify-center gap-2
        ${getSizeClass()}
        ${getVariantClass()}
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${className || ""}
      `}
    >
      {isLoading && <LoaderCircle className="animate-spin h-4 w-4" />}
      {isLoading ? "Vui lòng chờ..." : children ?? text}
    </button>
  );
};

export default Button;
