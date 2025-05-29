import Disease02Item from "../layout/disease-02-item";
const categoriesAge = [
  { title: "Nội khoa", icon: "🩺" },
  { title: "Ngoại khoa", icon: "🔪" },
  { title: "Tai mũi họng", icon: "👂" },
  { title: "Da liễu", icon: "🧴" },
];
const Disease02 = () => {
  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible">
      <div className="flex flex-row gap-4 p-4 justify-center md:flex-wrap lg:flex-wrap rounded-2xl shadow-sm hover:shadow-md ">
        {categoriesAge.map((category, index) => (
          <Disease02Item key={index} title={category.title} icon={category.icon} />
        ))}
      </div>
    </div>
    // <div className="lg:w-full sm:w-full md:w-full lg:flex-r sm:flex-wrap md:flex-row items-center gap-2 border border-[#00416A] px-5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md ">
    //   <div className="mb-5">
    //     <Disease02 />
    //   </div>
    //   <div className="mb-5">
    //     <Disease02 />
    //   </div>
    //   <div className=" mb-5">
    //     <Disease02 />
    //   </div>
    //   <div className=" mb-5">
    //     <Disease02 />
    //   </div>
    // </div>
  );
};
export default Disease02;
