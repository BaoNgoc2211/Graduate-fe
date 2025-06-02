import {
  getALLMedCategoryAPI,
  getMedCategoryAPI,
} from "@/api/medicine/medicine-category.api";
import Medicine01Item from "../layout/medicine-01-item";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IMedicineCategory } from "@/interface/medicine/medicine-category";

// const categories = [
//   { title: "Thuốc kê đơn", icon: "🩺" },
//   { title: "Thuốc không kê đơn", icon: "🔪" },
//   { title: "Thực phẩm chức năng", icon: "👂" },
//   { title: "Vắc-xin – Sinh phẩm", icon: "🧴" },
//   { title: "Thuốc Đông y – Dược liệu", icon: "🧴" },
//   { title: "Thiết bị y tế", icon: "🧴" },
// ];
const Medicine01 = () => {
  // const [type, setType] = useState([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-medicine-category"],
    queryFn: () => getALLMedCategoryAPI(),
  });
  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      {/*  md:flex-col gap-4 p-4 w-max md:w-full */}
      <div className="flex flex-col  px-5 lg:flex-row items-center gap-3 5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md">
        {data?.data?.map((item: IMedicineCategory, index: number) => (
          <Medicine01Item key={index} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};
export default Medicine01;
