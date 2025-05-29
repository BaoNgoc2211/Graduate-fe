export interface DiseaseCategory {
  id: string;
  name: string;
  icon: string; // path đến icon SVG
}
import Image from "next/image";

interface Props {
  category: DiseaseCategory;
}

const Disease03Item = ({ category }: Props) => {
  return (
    // w-28 sm:w-32
    <div
      className="flex flex-col items-center justify-center gap-2  min-w-[6.5rem] sm:min-w-[7.5rem] md:min-w-[8.5rem]
        max-w-[9rem]p-3  transition cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="w-14 h-14 relative">
        <Image
          src={category.icon}
          alt=""
          fill
          className="object-contain rounded-full"
        />
      </div>
      <p className="text-sm text-center font-medium text-gray-800">
        {category.name}
      </p>
    </div>
  );
};

export default Disease03Item;
