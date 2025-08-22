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