import { useQuery } from "@tanstack/react-query";
import Medicine02Item from "../layout/medicine-02-item";
import { getALLMedCategoryAPI } from "@/api/medicine/medicine-category.api";
import { IMedicineCategory } from "@/interface/medicine/medicine-category";

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
      <div className="flex flex-row justify-between py-3 px-5 gap-4 r md:flex-wrap lg:flex-wrap rounded-2xl ">
        {data?.data?.map((item: IMedicineCategory, index: number) => (
          <Medicine02Item key={index} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
    // </div>
  );
};
export default Medicine02;
