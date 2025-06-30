import Medicine02Item from "../layout/medicine-02-item";
import { IMedicineUsageGroup } from "@/interface/medicine/medicine-usage.interface";
import { useMedicineUsageGroup } from "@/hooks/medicine/medicine-usage.hooks";

const Medicine02 = () => {
  const { data, isLoading, isError } = useMedicineUsageGroup();

  if (isLoading)
    return (
      <div className="text-center text-blue-900 py-4 font-medium">
        Đang tải dữ liệu nhóm thuốc...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 py-4 font-medium">
        Lỗi khi lấy dữ liệu nhóm thuốc.
      </div>
    );

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Thuốc theo nhóm điều trị</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4 py-6">
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
