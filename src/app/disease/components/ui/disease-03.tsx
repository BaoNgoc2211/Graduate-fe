// import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
// import Disease03Item from "../layout/disease-03-item";
// import { useQuery } from "@tanstack/react-query";
// import { getAllDisCategoryAPI } from "@/api/disease/disease-category.api";

// const Disease03 = () => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["get-medicine-category"],
//     queryFn: () => getAllDisCategoryAPI(),
//   });
//   console.log("Data", data);

//   if (isLoading) return "isLoading...";
//   if (isError) return "Fetching data error";
//   return (
//     <section className="w-full">
//       <div className="flex gap-4 py-3 justify-between overflow-x-auto md:overflow-visible rounded-2xl ">
//         {data?.data?.map((item: IDiseaseUsageGroup, index: number) => (
//           // <Disease03Item key={index} name={item.name} icon={item.icon} />
//           <Disease03Item
//             key={index}
//             id={item._id}
//             name={item.name}
//             icon={item.icon}
//             /> 
//         ))}
//       </div>
//     </section>
//   );
// };
// export default Disease03;
import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
import Disease03Item from "../layout/disease-03-item";
import { useQuery } from "@tanstack/react-query";
import { getAllDisCategoryAPI } from "@/api/disease/disease-category.api";

const Disease03 = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-medicine-category"],
    queryFn: () => getAllDisCategoryAPI(),
  });

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";

  return (
    <section className="w-full">
      <div
        className="
          grid 
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-4
          py-3
          rounded-2xl
        "
      >
        {data?.data?.map((item: IDiseaseUsageGroup, index: number) => (
          <Disease03Item
            key={index}
            id={item._id}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Disease03;

