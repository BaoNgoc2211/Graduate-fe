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
      <div className="flex flex-col items-center justify-center bg-white shadow-xl w-full max-w-sm py-3 px-5 hover:border hover:border-blue-900 ">
        <div className=" overflow-hidden">
          <Image
            src={icon ?? "cart_icon.svg"}
            alt={name ?? "Medicine image"}
            width={30}
            height={30}
            className="hover:scale-110 transition ease-in-out"
          />
        </div>
        <p className="pt-3 text-[#00416A] pb-1 font-medium mt-5">{name}</p>
      </div>
    </Link>
  );
};
export default Medicine02Item;
