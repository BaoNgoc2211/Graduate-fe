import Disease01Item from "../layout/disease-01-item";
const categories = [
  { title: "Nội khoa", icon: "🩺" },
  { title: "Ngoại khoa", icon: "🔪" },
  { title: "Tai mũi họng", icon: "👂" },
  { title: "Da liễu", icon: "🧴" },
];
const Disease01 = () => {
  // return (
  //   <div className="flex flex-row w-full lg:w-auto sm:w-full md:w-full sm:gird-col-2 md:flex-col items-center gap-2 border border-[#00416A] px-5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md ">
  //     <div className="mb-5">
  //       <Disease01 />
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      {/*  md:flex-col gap-4 p-4 w-max md:w-full */}
      <div className="flex flex-col lg:flex-row  items-center gap-2 px-5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md">
        {categories.map((category, index) => (
          <Disease01Item
            key={index}
            title={category.title}
            icon={category.icon}
          />
        ))}
      </div>
    </div>
  );
};
export default Disease01;
