import { ICart } from "@/interface/order/cart.interface";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  item: ICart;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const medicine = item.medicine_item.medicine_id;
  const quantity = item.quantity || 1; // Default to 1 if quantity is not provided
  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_2fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex items-start gap-4">
        <Image
          src={medicine.thumbnail || "/icon/icon_default_medicine.png"}
          alt={medicine.name}
          width={80}
          height={80}
          className="rounded"
        />
        <div>
          <p className="text-xs sm:text-lg font-medium">
            {medicine.name}
          </p>
          <div className="flex items-center gap-5 mt-2">
            <p>{medicine.price.toLocaleString()} VND</p>
           
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
          type="number"
          min={1}
          defaultValue={quantity}
          disabled
        />
      </div>
      <div className="flex flex-row items-center">
        <button
          onClick={() => console.log(`Xoá ${medicine.name}`)} // TODO: handle delete
          className="cursor-pointer"
        >
          <Image
            src="/icon/icon_trash.png"
            alt="delete"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
