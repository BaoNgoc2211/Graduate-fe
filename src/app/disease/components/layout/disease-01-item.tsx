"use client";
import { IDisCategory } from "@/interface/disease/disease-category.interface";
import Image from "next/image";
import Link from "next/link";

const Disease01Item: React.FC<Partial<IDisCategory>> = ({
  _id,
  name,
  icon,
}) => {
  return (
    <Link href={`disease/category/${_id}`}>
      <div className="flex flex-col items-center justify-center bg-white  rounded-xl shadow-xl w-full max-w-sm py-2 px-2 hover:border hover:border-blue-900 ">
        <div className=" overflow-hidden">
          <Image
            src={icon ?? "cart_icon.svg"}
            alt={name ?? "Medicine image"}
            width={24}
            height={24}
            className="hover:scale-110 transition ease-in-out"
          />
        </div>
        <p className="h-16 text-center pt-3 text-[#00416A] pb-1 font-medium mt-5">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default Disease01Item;
