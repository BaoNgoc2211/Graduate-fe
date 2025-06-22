import Medicine02Item from "../layout/medicine-02-item";
import { IMedicineUsageGroup } from "@/interface/medicine/medicine-usage.interface";
import { useMedicineUsageGroup } from "@/hooks/medicine/medicine-usage.hooks";

const Medicine02 = () => {
  const { data, isLoading, isError } = useMedicineUsageGroup();
  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      <div className="flex flex-row justify-between py-3 px-5 gap-4 r md:flex-wrap lg:flex-wrap rounded-2xl ">
        {data?.data?.map((item: IMedicineUsageGroup) => (
          <Medicine02Item
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
export default Medicine02;
