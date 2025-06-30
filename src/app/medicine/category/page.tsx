"use client";
import { getMedCateById } from "@/api/medicine/medicine-category.api";
import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";
import { useQuery } from "@tanstack/react-query";
import TitleFilter from "@/components/filter/title-filter";
import Filter from "@/components/filter/filter";
import Title from "@/components/ui/title";
import Button from "@/components/ui/button-01";
import Medicine01 from "../components/ui/medicine-01";
import Medicine02 from "../components/ui/medicine-02";
import TitleMedicine from "../components/layout/title";
import MedicineItem from "../components/layout/medicine-item";

interface Props {
  categoryId: string;
}

const MedicinePage: React.FC<Props> = ({ categoryId }) => {
  const { data, isLoading, isError } = useQuery<{ data: IMedicineCategory }>({
    queryKey: ["get-medicine-for-category", categoryId],
    queryFn: () => getMedCateById(categoryId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.data) return <p>Error loading data</p>;

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
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 pt-10 lg:px-5 xl:px-10 items-center">
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
            {data.data.medicine.map((item) => (
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
