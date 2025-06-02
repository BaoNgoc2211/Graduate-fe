interface IDisCategory {
  name: string;
  icon: string;
}

const Disease01Item = ({ name, icon }: IDisCategory) => {
  return (
    // <div className="min-w-[140px] md:min-w-0 w-fit flex items-center gap-2 border border-[#00416A] px-4 py-3 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">
    //   <img src={icon} alt={name} width={26} height={26} className="text-xl" />
    //   <p className="text-sm font-medium">{name}</p>
    // </div>
    <div className="flex flex-col items-center justify-center bg-white  rounded-xl shadow-xl w-full max-w-sm py-2 px-2 hover:border hover:border-blue-900 ">
      <div className=" overflow-hidden">
        <img
          src={icon}
          alt={name}
          width={50}
          height={50}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="h-16 text-center pt-3 text-[#00416A] pb-1 font-medium mt-5">{name}</p>
    </div>
  );
};

export default Disease01Item;
