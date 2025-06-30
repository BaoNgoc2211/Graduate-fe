"use client";
import TitleFilter from "@/components/filter/title-filter";
import Filter from "@/components/filter/filter";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button-01";
import { useMedicineUsageGroupById } from "@/hooks/medicine/medicine-usage.hooks";
import MedicineItemUsage from "../../components/layout/medicine-item-usage";

const MedicineCategoryPage = () => {
  const { data, isLoading, isError } = useMedicineUsageGroupById();
  const usage = data?.data;
  if (isLoading) return <p>Loading...</p>;
  if (isError || !usage?.medicine) return <p>Error loading data</p>;

  return (
    <div className="min-h-screen mb-5">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 pt-10  items-center">
        <aside className="w-full lg:w-1/6">
          <TitleFilter title="Bộ lọc" />
          <Filter
            titleFilter="Khoảng giá"
            value="type"
            onChange={() => {}}
            filterDetail_01="Dưới 100.000 đ"
            filterDetail_02="100.000 đ - 300.000 đ"
            filterDetail_03="300.000 đ - 500.000 đ"
            filterDetail_04="Trên 500.000 đ"
          />
          <Filter
            titleFilter="Thương hiệu "
            value="type"
            onChange={() => {}}
            filterDetail_01="Panadol"
            filterDetail_02="Decolgen"
            filterDetail_03="Paracetamol"
            filterDetail_04="Efferalgan"
          />
        </aside>

        <main className="w-full lg:flex-1">
          <div className="flex items-center justify-between mb-4">
            <Title text1="SẢN PHẨM" text2="CHÍNH HÃNG" />
            <select className="border-2 border-gray-300 text-sm px-2">
              <option value="relavent">Sắp xếp: Phù hợp</option>
              <option value="low-high">Giá: Thấp đến Cao</option>
              <option value="high-low">Giá: Cao đến Thấp</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {usage.medicine.map((item) => (
              <MedicineItemUsage
                key={item._id}
                _id={item._id}
                name={item.name}
                medicine={item}
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

export default MedicineCategoryPage;
