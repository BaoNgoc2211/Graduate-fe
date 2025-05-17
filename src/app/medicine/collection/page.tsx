"use client";
import Filter from "@/components/filter/filter";
import MedicineItem from "@/components/medicine/medicine-item";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
const MedicinePage = () => {
  const [setType] = useState([]);
  const [fileterMedicine, setFilterMedicine] = useState<MedicineType[]>([]);
  const [medicine, setMedicine] = useState({
    thumbnail: "",
    name: "",
    price: Number,
  });
  console.log(medicine);
  const {data, isL}
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-5">
        {/* Filter left*/}
        <div className="min-w-60">
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
            filterDetail_01="Dưới 100.000 đ"
            filterDetail_02="100.000 đ - 300.000 đ"
            filterDetail_03="300.000 đ - 500.000 đ"
            filterDetail_04="Trên 500.000 đ"
          />
        </div>
        {/* Collection right */}
        <div className="flex-1">
          {/* select */}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to low</option>
          </select>
        </div>
        {/* map Medicine  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {fileterMedicine.map((item, index) => (
            <MedicineItem
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
          {/* <MedicineItem /> */}
        </div>
      </div>
    </>
  );
};
export default MedicinePage;
