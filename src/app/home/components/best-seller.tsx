"use client";
import { BestSellerCollectionAPI } from "@/api/home.api";
import MedicineItem from "@/app/medicine/collection/components/medicine-item";
import Title from "@/components/ui/title";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { useQuery } from "@tanstack/react-query";

const BestSeller = () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-Best-Seller-collection"],
    queryFn: () => BestSellerCollectionAPI(sevenDaysAgo),
  });

  console.log("Data", data);
  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div>
      <div className="text-center text-3xl py-8">
        <Title text1="BEST " text2="SELLERS" />
        <Title text1="BEST " text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
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
export default BestSeller;
