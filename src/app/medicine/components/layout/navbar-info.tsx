// import React, { useState } from "react";

import { IMedicine } from "@/interface/medicine/medicine.interface";
import { useState } from "react";
const NavbarInfo: React.FC<Partial<IMedicine>> = ({
  note,
  use,
  dosage,
  indication,
  adverse,
  precaution,
  contraindication,
  ability,
  pregnancy,
  storage,
  drugInteractions,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { key: "description", label: "Mô tả" },
    { key: "usage", label: "Liều dùng & Chỉ định" },
    { key: "adverse", label: "Tác dụng phụ & Chống chỉ định" },
    { key: "storage", label: "Bảo quản & Tương tác thuốc" },
  ];

  const renderContent = () => {
    const fallback = "Đang cập nhật.";
    switch (activeTab) {
      case "description":
        return <p>{note && note !== "Không" ? note : fallback}</p>;
      case "usage":
        return (
          <>
            <p>
              <strong>Cách dùng:</strong> {use || fallback}
            </p>
            <p>
              <strong>Liều dùng:</strong> {dosage || fallback}
            </p>
            <p>
              <strong>Công dụng:</strong> {indication || fallback}
            </p>
          </>
        );
      case "adverse":
        return (
          <>
            <p>
              <strong>Tác dụng phụ:</strong> {adverse || fallback}
            </p>
            <p>
              <strong>Chống chỉ định:</strong> {contraindication || fallback}
            </p>
            <p>
              <strong>Thận trọng khi sử dụng:</strong> {precaution || fallback}
            </p>
            <p>
              <strong>Khả năng lái xe và vận hành máy móc:</strong>{" "}
              {ability || fallback}
            </p>
            <p>
              <strong>Thời kỳ mang thai và cho con bú:</strong>{" "}
              {pregnancy || fallback}
            </p>
          </>
        );
      case "storage":
        return (
          <>
            <p>
              <strong>Bảo quản:</strong> {storage || fallback}
            </p>
            <p>
              <strong>Tương tác thuốc:</strong> {drugInteractions || fallback}
            </p>
          </>
        );
      default:
        return <p>{fallback}</p>;
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-4 transition-colors duration-200 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-900 font-bold"
                : "text-gray-600 hover:text-blue-700"
            }`}
            onClick={() => setActiveTab(tab.key)}
            role="tab"
            aria-selected={activeTab === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 text-gray-700 text-sm space-y-3">
        {renderContent()}
      </div>
    </div>
  );
};

export default NavbarInfo;
