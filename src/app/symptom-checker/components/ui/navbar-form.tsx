"use client";
// import Link from "next/link";
// import { assets } from "../../../../../public/assets";
// import Image from "next/image";
type NavbarFormProps = {
  currentStep: number;
  onStepChange: (step: number) => void;
};

const NavbarForm = ({ currentStep, onStepChange }: NavbarFormProps) => {
  const steps = [
    { label: "Thông tin", value: 1 },
    { label: "Triệu chứng", value: 2 },
    { label: "Tình trạng", value: 3 },
    { label: "Chi tiết", value: 4 },
    { label: "Khuyến nghị", value: 5 },
  ];
  return (
    // <div className="">
    //   <ul className="flex flex-row gap-3 px-1 py-2 justify-center">
    //     <li className="">
    //       <Link
    //         href="/step-01"
    //         className="flex items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
    //       >
    //         <p>Thông tin</p>
    //       </Link>
    //     </li>
    //     <li className="">
    //       <Link
    //         href="/step-02"
    //         className="flex items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
    //       >
    //         <p className="text-xl">Triệu chứng</p>
    //       </Link>
    //     </li>
    //     <li className="">
    //       <Link
    //         href="/step-03"
    //         className="flex items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
    //       >
    //         <p>Tình trạng</p>
    //       </Link>
    //     </li>
    //     <li className="">
    //       <Link
    //         href="/step-04"
    //         className="flex items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
    //       >
    //         <p>Chi tiết</p>
    //       </Link>
    //     </li>
    //     <li className="">
    //       <Link
    //         href="/step-05"
    //         className="flex items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
    //       >
    //         <p>Khuyến nghị</p>
    //       </Link>
    //     </li>
    //   </ul>
    // </div>
    <ul className="flex flex-row gap-3 px-1 py-2 justify-center">
    {steps.map((step) => (
      <li key={step.value}>
        <button
          onClick={() => onStepChange(step.value)}
          className={`flex items-center gap-2 border px-3 py-2 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md ${
            currentStep === step.value
              ? "bg-[#00416A] text-white border-[#00416A]"
              : "border-[#00416A] hover:bg-[#00416A] hover:text-white"
          }`}
        >
          <p>{step.label}</p>
        </button>
      </li>
    ))}
  </ul>
  );
};
export default NavbarForm;
