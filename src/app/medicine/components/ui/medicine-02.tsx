import { useQuery } from "@tanstack/react-query";
import Medicine02Item from "../layout/medicine-02-item";
import { getALLMedCategoryAPI } from "@/api/medicine/medicine-category.api";
import { IMedicineCategory } from "@/interface/medicine/medicine-category";

// const categoriesAge = [
//   { name: "Thuốc ung thư", icon: "🩺" },
//   { name: "Thuốc tiết niệu", icon: "🔪" },
//   { name: "Thuốc cho nam giới", icon: "👂" },
//   { name: "Vitamin & Khoáng chất", icon: "🧴" },
//   { name: "Thuốc gia liễu", icon: "🧴" },
//   { name: "Thuốc dành cho nữ", icon: "🧴" },
//   { name: "Thuốc cảm lạnh, ho", icon: "🧴" },
//   { name: "Thuốc ngừa thai", icon: "🧴" },
// ];

const Medicine02 = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-medicine-category"],
    queryFn: () => getALLMedCategoryAPI(),
  });
  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      <div className="flex flex-row justify-between py-3 gap-4 r md:flex-wrap lg:flex-wrap rounded-2xl shadow-sm hover:shadow-md ">
        {data?.data?.map((item: IMedicineCategory, index: number) => (
          <Medicine02Item key={index} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
    // </div>
  );
};
export default Medicine02;
