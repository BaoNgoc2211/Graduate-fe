"use client";
import Image from "next/image";
import { IMedicineItem } from "@/interface/medicine/medicine.interface";
import { assets } from "../../../../../public/assets";
import Link from "next/link";
import { toast } from "sonner";
import { useAddToCart } from "@/hooks/order/cart.hooks";
const MedicineItem: React.FC<Partial<IMedicineItem>> = ({
  _id,
  name,
  thumbnail,
}) => {
  const mutation = useAddToCart();
  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!_id) {
      toast.error("Thiếu ID thuốc", { duration: 2000 });
      return;
    }
    mutation.mutate({ medicine_id: _id, quantity: 1 });
  };

  return (
    <Link href={`/medicine/${_id}`}>
      <div className="text-gray-700 bg-white rounded-xl shadow-md p-4 w-full max-w-[260px] relative cursor-copy">
        <div className="overflow-hidden">
          <Image
            className="hover:scale-110 transition ease-in-out "
            src={thumbnail ?? "/images/default-thumbnail.jpg"}
            alt={name ?? "Medicine image"}
            width={260}
            height={260}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 font-medium truncate mb-2">
              {name}
            </p>
          </div>

          <div
            className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition shrink-0"
            onClick={handleAddToCart}
          >
            <Image
              src={assets.cart_icon}
              alt="Icon Cart"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default MedicineItem;
