"use client";
import { useQuery } from "@tanstack/react-query";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import MedicineItem from "@/app/medicine/components/layout/medicine-item";
import Title from "../ui/title";
import { LatestCollectionAPI } from "@/api/home.api";
const LatestCollection = () => {
  const createAdd = new Date();
  createAdd.setDate(createAdd.getDate() - 30);
  const formattedDate = createAdd.toISOString().split("T")[0];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-Best-Seller-collection", formattedDate],
    queryFn: () => LatestCollectionAPI(formattedDate),
  });
  console.log("Data", data);
  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"CẬP NHẬT SẢN PHẨM "} text2={"MỚI NHẤT"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Khám phá ngay các sản phẩm thuốc và thực phẩm chức năng được cập nhật
          liên tục. Công nghệ thông minh giúp bạn dễ dàng chọn đúng sản phẩm,
          chuẩn theo nhu cầu sức khỏe và xu hướng hiện đại.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {data?.data?.map((item: IMedicine, index: number) => (
          <MedicineItem
            key={index}
            name={item.name}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>
      
    </div>
  );
};

export default LatestCollection;
