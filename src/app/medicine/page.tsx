"use client";
import { getALLMedicineAPI } from "@/api/medicine/medicine.api";
import Filter from "@/components/filter/filter";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TitleFilter from "@/components/filter/title-filter";
import Button from "@/components/ui/button";
import MedicineItem from "./components/layout/medicine-item";
import Medicine01 from "./components/ui/medicine-01";
import Medicine02 from "./components/ui/medicine-02";
import TitleMedicine from "./components/layout/title";
import Title from "@/components/ui/title";
const MedicinePage = () => {
  const [setType] = useState([]);
  const { data, isLoading, isError } = useQuery<{ data: IMedicine[] }>({
    queryKey: ["get-latest-collection"],
    queryFn: () => getALLMedicineAPI(),
  });

  console.log("Category", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";

  return (
    <div className="min-h-screen mb-5">
      <div>
        <TitleMedicine text1="Tra cứu thuốc" />
        <Medicine01 />
      </div>
      <div className="pt-10">
        <TitleMedicine text1="Thuốc theo nhóm điều trị" />
        <Medicine02 />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 pt-10 lg:px-10 xl:px-20 items-center">
        <aside className="w-full lg:w-1/6">
          <TitleFilter title="Bộ lọc" />
          <Filter
            titleFilter="Khoảng giá"
            value="type"
            onChange={() => setType}
            filterDetail_01="Dưới 100.000 đ"
            filterDetail_02="100.000 đ - 300.000 đ"
            filterDetail_03="300.000 đ - 500.000 đ"
            filterDetail_04="Trên 500.000 đ"
          />
          <Filter
            titleFilter="Thương hiệu "
            value="type"
            onChange={() => setType}
            filterDetail_01="Panadol"
            filterDetail_02="Decolgen"
            filterDetail_03="Paracetamol"
            filterDetail_04="Efferalgan"
          />
        </aside>
        {/* Collection right */}
        <main className="w-full lg:flex-1">
          {/* flex-1 */}
          <div className="flex items-center justify-between mb-4">
            <Title text1="SẢN PHẨM" text2="CHÍNH HÃNG" />
            {/* select */}
            <select className="border-2 border-gray-300 text-sm px-2">
              <option value="relavent">Sắp xếp: Phù hợp</option>
              <option value="low-high">Giá: Thấp đến Cao</option>
              <option value="high-low">Giá: Cao đến Thấp</option>
            </select>
          </div>
          {/* map Medicine  */}
          {/* grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {/* {filterMedicine.map((item, index) => (
              <MedicineItem
              key={index}
              name={item.name}
              thumbnail={item.thumbnail}
            />
          ))} */}
            {data?.data?.map((item: IMedicine) => (
              <MedicineItem
                key={item._id}
                _id={item._id}
                name={item.name}
                thumbnail={item.thumbnail}
              />
            ))}
          </div>

          <div className="w-2xl mt-5 justify-center">
            <Button text="Xem thêm" />
          </div>
        </main>
      </div>
    </div>
  );
};
export default MedicinePage;
