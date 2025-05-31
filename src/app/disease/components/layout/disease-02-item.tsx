interface IDiseaseUsageGroup {
  name: string;
  icon: string;
}

const Disease02Item = ({ name, icon }: IDiseaseUsageGroup) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white  rounded-xl shadow-xl w-full max-w-sm py-3 px-5 ">
      <div className=" overflow-hidden">
        {/* <image src={icon} className="hover:scale-110 transition ease-in-out" /> */}
        <img
          src={icon}
          alt={name}
          width={24}
          height={24}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 text-[#00416A] pb-1 font-medium mt-5">{name}</p>
    </div>
  );
};
export default Disease02Item;
