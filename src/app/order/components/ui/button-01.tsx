// import React from "react";

// interface ButtonProps {
//   text: string;
//   onClick?: () => void;
//   className?: string;
//   variant?: "primary" | "outline" | "danger";
// }
// const Button01 = (props: ButtonProps) => {
//   return (
//     <button
//       onClick={props.onClick}
//       className={`w-auto px-2 py-2 rounded-full text-center
//       bg-white text-[#00416A] border border-[#00416A]
//       font-bold transition-all duration-300
//       hover:bg-[#00416A] hover:text-white
//       shadow-sm hover:shadow-md active:translate-y-[1px]  ${
//         props.className || ""
//       }`}
//     >
//       {props.text}
//     </button>
//   );
// };

// export default Button01;
import React from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "danger";
}

const Button01 = ({
  text,
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) => {
  const baseStyle =
    "w-auto px-4 py-2 rounded-full text-center font-bold transition-all duration-300 shadow-sm hover:shadow-md active:translate-y-[1px]";

  const variantStyle = {
    primary: "bg-[#00416A] text-white hover:bg-[#003256]",
    outline:
      "bg-white text-[#00416A] border border-[#00416A] hover:bg-[#00416A] hover:text-white",
    danger:
      "bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyle, variantStyle[variant], className)}
    >
      {text}
    </button>
  );
};

export default Button01;
