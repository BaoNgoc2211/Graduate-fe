"use client";
import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";
import Image from "next/image";
import Link from "next/link";

const Medicine01Item: React.FC<Partial<IMedicineCategory>> = ({
  _id,
  name,
  icon,
}) => {
  return (
    <Link href={`/medicine/category/${_id}`}>
      <div className="min-w-[140px] md:min-w-0 w-fit flex items-center gap-2 border border-[#00416A] px-4 py-3 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">
        <Image
          src={icon ?? "cart_icon.svg"}
          alt={name ?? "Medicine image"}
          width={24}
          height={24}
        />
        <p className="text-sm font-medium">{name}</p>
      </div>
    </Link>
  );
};

export default Medicine01Item;
