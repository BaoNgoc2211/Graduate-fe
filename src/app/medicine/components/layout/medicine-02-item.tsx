import { IMedicineUsageGroup } from "@/interface/medicine/medicine-usage.interface";
import Image from "next/image";
import Link from "next/link";

const Medicine02Item: React.FC<Partial<IMedicineUsageGroup>> = ({
  _id,
  name,
  icon,
}) => {
  return (
    <Link href={`/medicine/usage/${_id}`}>
      <div className="flex flex-col items-center justify-center bg-white shadow-xl w-[160px] h-[180px] py-4 px-4 hover:border hover:border-blue-900 rounded-lg transition-all">
   
        <div className="relative w-[50px] h-[50px]">
          <Image
            src={icon && icon.startsWith("http") ? icon : "/cart_icon.png"}
            alt={name ?? "Medicine image"}
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-4 text-sm font-medium text-center text-[#00416A] line-clamp-2 min-h-[3rem]">
          {name ?? "Không rõ tên"}
        </p>
      </div>
    </Link>
  );
};

export default Medicine02Item;
