"use client";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { useState } from "react";

const NavbarInfo: React.FC<Partial<IMedicine>> = ({
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
  medCategory_id,
  medUsage_id,
  manufacturer_id,
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
    
    // Helper functions để xử lý cả array và object
    const getCategoryName = () => {
      if (Array.isArray(medCategory_id) && medCategory_id.length > 0) {
        return medCategory_id[0]?.name;
      }
      if (medCategory_id && typeof medCategory_id === 'object' && 'name' in medCategory_id) {
        return medCategory_id.name;
      }
      return fallback;
    };

    const getUsageName = () => {
      if (Array.isArray(medUsage_id) && medUsage_id.length > 0) {
        return medUsage_id[0]?.name;
      }
      if (medUsage_id && typeof medUsage_id === 'object' && 'name' in medUsage_id) {
        return medUsage_id.name;
      }
      return fallback;
    };

    const getManufacturerName = () => {
      if (Array.isArray(manufacturer_id) && manufacturer_id.length > 0) {
        return manufacturer_id[0]?.nameCo;
      }
      if (manufacturer_id && typeof manufacturer_id === 'object' && 'nameCo' in manufacturer_id) {
        return manufacturer_id.nameCo;
      }
      return fallback;
    };

    switch (activeTab) {
      case "description":
        return (
          <>
            <p>
              <strong>Thuộc danh mục thuốc:</strong>{" "}
              {getCategoryName()}
            </p>
            <p>
              <strong>Thuộc nhóm thuốc:</strong>{" "}
              {getUsageName()}
            </p>
            <p>
              <strong>Thuộc nhà sản xuất:</strong>{" "}
              {getManufacturerName()}
            </p>
          </>
        );
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