// import Medicine01Item from "../layout/medicine-01-item";
// import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";
// import { useMedicineCategories } from "@/hooks/medicine/medicine-category.hook";

// const Medicine01 = () => {
//   const { data, isLoading, isError } = useMedicineCategories();
//   console.log("Data", data);

//   if (isLoading) return "isLoading...";
//   if (isError) return "Fetching data error";
//   return (
//     <div className="w-full overflow-x-auto md:overflow-x-visible">
//       <h2 className="text-xl font-bold text-blue-900 mb-4">Thuốc theo danh mục</h2>
//       <div className="flex flex-col  px-5 lg:flex-row items-center gap-3 5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md">
//         {data?.data?.map((item: IMedicineCategory) => (
//           <Medicine01Item
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
// export default Medicine01;
import Medicine01Item from "../layout/medicine-01-item";
import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";
import { useMedicineCategories } from "@/hooks/medicine/medicine-category.hook";

const Medicine01 = () => {
  const { data, isLoading, isError } = useMedicineCategories();
  
  // Debug logs
  console.log("Raw data:", data);
  console.log("data?.data:", data?.data);
  console.log("Is data?.data an array?", Array.isArray(data?.data));
  console.log("Type of data?.data:", typeof data?.data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Fetching data error</div>;
  
  // Safe check for data existence and array type
  const categories = data?.data;
  if (!categories || !Array.isArray(categories)) {
    console.error("Categories data is not an array:", categories);
    return <div>No categories available</div>;
  }

  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Thuốc theo danh mục</h2>
      <div className="flex flex-col px-5 lg:flex-row items-center gap-3 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md">
        {categories.map((item: IMedicineCategory) => (
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
