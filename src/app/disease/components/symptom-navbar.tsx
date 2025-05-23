import Link from "next/link";
import { useState } from "react";

const SymptomNavbar = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  return (
    <>
      <div className="flex flex[3fr_1fr] px-5">
        <div className=""></div>
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex bg-[#eaecef] text-black"
        >
          <Link href="" className="px-5 py-2 hover:bg-while rounded transition">
            <div
              onClick={() => setActiveTab("info")}
              className={`px-5 py-2 rounded transition cursor-pointer ${
                activeTab === "info" ? "bg-white" : "hover:bg-white"
              }`}
            >
              <p>THÔNG TIN</p>
            </div>
          </Link>
          <Link href="" className="px-5 py-2 hover:bg-while rounded transition">
            <div
              onClick={() => setActiveTab("info")}
              className={`px-5 py-2 rounded transition cursor-pointer ${
                activeTab === "info" ? "bg-white" : "hover:bg-white"
              }`}
            >
              <p>TRIỆU CHỨNG</p>
            </div>
          </Link>
          <Link href="" className="px-5 py-2 hover:bg-while rounded transition">
            <div
              onClick={() => setActiveTab("info")}
              className={`px-5 py-2 rounded transition cursor-pointer ${
                activeTab === "info" ? "bg-white" : "hover:bg-white"
              }`}
            >
              <p>TÌNH TRẠNG</p>
            </div>
          </Link>
          <Link href="" className="px-5 py-2 hover:bg-while rounded transition">
            <div
              onClick={() => setActiveTab("info")}
              className={`px-5 py-2 rounded transition cursor-pointer ${
                activeTab === "info" ? "bg-white" : "hover:bg-white"
              }`}
            >
              <p>TÌNH TRẠNG</p>
            </div>
          </Link>
          <Link href="" className="px-5 py-2 hover:bg-while rounded transition">
            <div
              onClick={() => setActiveTab("info")}
              className={`px-5 py-2 rounded transition cursor-pointer ${
                activeTab === "info" ? "bg-white" : "hover:bg-white"
              }`}
            >
              <p>KHUYẾN NGHỊ</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default SymptomNavbar;
// import React, { useState } from "react";
// import { ChevronRight } from "lucide-react"; // Hoặc dùng biểu tượng tùy chọn

// const steps = ["INFO", "SYMPTOMS", "CONDITIONS", "DETAILS", "TREATMENT"];

// const Navbar = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between border-b border-gray-200 bg-white">
//       {/* Tabs */}
//       <ul className="flex">
//         {steps.map((step, index) => (
//           <li key={step} className="relative">
//             <button
//               className={`px-6 py-3 text-sm font-medium uppercase ${
//                 index === activeStep
//                   ? "text-black"
//                   : "text-gray-500 hover:text-black"
//               }`}
//             >
//               {step}
//             </button>
//             {index === activeStep && (
//               <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 rounded-t"></div>
//             )}
//           </li>
//         ))}
//       </ul>

//       {/* Arrow button */}
//       <div className="pr-4">
//         <button
//           onClick={handleNext}
//           className="p-2 rounded hover:bg-gray-100 transition"
//           disabled={activeStep >= steps.length - 1}
//         >
//           <ChevronRight className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
