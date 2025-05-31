import { getALLDisCategoryAPI } from "@/api/disease/disease-category.api";
import Disease01Item from "../layout/disease-01-item";
import { useQuery } from "@tanstack/react-query";
import { IDisCategory } from "@/interface/disease/disease-category.interface";

const Disease01 = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-medicine-category"],
    queryFn: () => getALLDisCategoryAPI(),
  });
  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      {/*  md:flex-col gap-4 p-4 w-max md:w-full */}
      <div className="flex flex-col lg:flex-row justify-between  items-center gap-2 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md">
        {data?.data?.map((item: IDisCategory, index: number) => (
          <Disease01Item key={index} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};
export default Disease01;
