import Image from "next/image";
import { useState } from "react";
interface Props {
  name: string;
  icon: string;
}
const Medicine01Item = ({ name, icon }: Props) => {
  const [activeIcon] = useState(icon);
  return (
    <div className="min-w-[140px] md:min-w-0 w-fit flex items-center gap-2 border border-[#00416A] px-4 py-3 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">
      <Image
        src={activeIcon ?? "/images/default-thumbnail.jpg"}
        alt={`Icon for ${name}`}
        width={24}
        height={24}
        className="text-xl"
      />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
};

export default Medicine01Item;
