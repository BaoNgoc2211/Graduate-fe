import { useQuery } from "@tanstack/react-query";
import Medicine02Item from "../layout/medicine-02-item";
import { IMedicineUsageGroup } from "@/interface/medicine/medicine-usage";
import { getAllMedUsageAPI } from "@/api/medicine/medicine-usage.api";

const Medicine02 = () => {
  const { data, isLoading, isError } = useQuery<{
    data: IMedicineUsageGroup[];
  }>({
    queryKey: ["get-medicine-category"],
    queryFn: () => getAllMedUsageAPI(),
  });
  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      <div className="flex flex-row justify-between py-3 px-5 gap-4 r md:flex-wrap lg:flex-wrap rounded-2xl ">
        {data?.data?.map((item: IMedicineUsageGroup, index: number) => (
          <Medicine02Item key={index} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
    // </div>
  );
};
export default Medicine02;
