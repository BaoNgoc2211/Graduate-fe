import Disease02Item from "../layout/disease-02-item";
import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
import { useQuery } from "@tanstack/react-query";
import { getAllMDisUsageAPI } from "@/api/disease/disease-usage.api";
interface Props {
  usageGroupId: string;
}
const Disease02: React.FC<Props> = () => {
  const { data, isLoading, isError } = useQuery<{ data: IDiseaseUsageGroup[] }>(
    {
      queryKey: ["disease-usage-id"],
      queryFn: () => getAllMDisUsageAPI(),
    }
  );
  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      <div className="flex flex-row gap-4 py-3 justify-between md:flex-wrap lg:flex-wrap rounded-2xl  ">
        {data?.data?.map((item: IDiseaseUsageGroup) => (
          <Disease02Item
            key={item._id}
            _id={item._id}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};
export default Disease02;
