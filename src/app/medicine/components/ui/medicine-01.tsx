import Medicine01Item from "../layout/medicine-01-item";
import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";
import { useMedicineCategories } from "@/hooks/medicine/medicine-category.hook";

const Medicine01 = () => {
  const { data, isLoading, isError } = useMedicineCategories();
  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Thuốc theo nhóm điều trị</h2>
      <div className="flex flex-col  px-5 lg:flex-row items-center gap-3 5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md">
        {data?.data?.map((item: IMedicineCategory) => (
          <Medicine01Item
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
export default Medicine01;
