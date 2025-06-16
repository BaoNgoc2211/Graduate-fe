import Image from "next/image";
import { useState } from "react";
interface Props {
  name: string;
  icon: string;
}
const Medicine02Item = ({ name, icon }: Props) => {
  const [activeIcon] = useState(icon);
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-xl w-full max-w-sm py-3 px-5 hover:border hover:border-blue-900 ">
      <div className=" overflow-hidden">
        <Image
          src={activeIcon ?? "/images/default-thumbnail.jpg"}
          alt={name}
          width={40}
          height={40}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 text-[#00416A] pb-1 font-medium mt-5">{name}</p>
    </div>
  );
};
export default Medicine02Item;
