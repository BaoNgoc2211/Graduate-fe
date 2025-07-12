"use client";

import Image from "next/image";
import Link from "next/link";

interface DiseaseItemProps {
  _id?: string;
  name?: string;
  icon?: string;
}

const Disease01Item: React.FC<DiseaseItemProps> = ({ _id, name, icon }) => {
  return (
    <Link href={`/disease/category/${_id ?? "#"}`}>
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md w-full py-4 px-3 hover:border hover:border-blue-900 transition">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
          <Image
            src={icon ?? "/placeholder.svg"}
            alt={name ?? "Disease category"}
            width={64}
            height={64}
            className="object-contain transition-transform group-hover:scale-110"
          />
        </div>
        <p className="text-center mt-4 text-blue-900 font-medium text-sm line-clamp-2">
          {name ?? "Danh mục bệnh"}
        </p>
      </div>
    </Link>
  );
};
export default Disease01Item;
