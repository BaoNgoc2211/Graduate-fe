import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
import Disease03Item from "../layout/disease-03-item";
import { useQuery } from "@tanstack/react-query";
import { getALLDisCategoryAPI } from "@/api/disease/disease-category.api";

const Disease03 = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-medicine-category"],
    queryFn: () => getALLDisCategoryAPI(),
  });
  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <section className="w-full">
      <div className="flex gap-4 py-3 justify-between overflow-x-auto md:overflow-visible rounded-2xl ">
        {data?.data?.map((item: IDiseaseUsageGroup, index: number) => (
          <Disease03Item key={index} name={item.name} icon={item.icon} />
        ))}
      </div>
    </section>
  );
};
export default Disease03;
