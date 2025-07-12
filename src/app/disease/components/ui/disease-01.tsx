// import Disease01Item from "../layout/disease-01-item";
// import { IDisCategory } from "@/interface/disease/disease-category.interface";
// import { useDiseaseCategories } from "@/hooks/disease/disease-category.hooks";

// const Disease01 = () => {
//   const { data, isLoading, isError } = useDiseaseCategories();
//   console.log("Data", data);

//   if (isLoading) return "isLoading...";
//   if (isError) return "Fetching data error";
//   return (
//     <div className="w-full overflow-x-auto md:overflow-x-visible">
//       <div className="flex flex-col lg:flex-row justify-between  items-center gap-2 py-3 rounded-2xl transition-all cursor-pointer ">
//         {data?.data?.map((item: IDisCategory) => (
//           <Disease01Item
//             key={item._id}
//             _id={item._id}
//             name={item.name}
//             icon={item.icon}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Disease01;
import Disease01Item from "../layout/disease-01-item";
import { IDisCategory } from "@/interface/disease/disease-category.interface";
import { useDiseaseCategories } from "@/hooks/disease/disease-category.hooks";

const Disease01 = () => {
  const { data, isLoading, isError } = useDiseaseCategories();

  if (isLoading) return "Đang tải dữ liệu...";
  if (isError) return "Lỗi khi tải dữ liệu";

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Bệnh theo chuyên khoa</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((item: IDisCategory) => (
          <Disease01Item
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

export default Disease01;
