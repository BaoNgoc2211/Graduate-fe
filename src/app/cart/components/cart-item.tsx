"use client";
//#region version 01
// import { ICart } from "@/interface/order/cart.interface";
// import Image from "next/image";
// import React from "react";

// interface CartItemProps {
//   item: ICart;
// }

// const CartItem: React.FC<CartItemProps> = ({ item }) => {
//   const medicine = item.medicine_item.medicine_id;
//   const quantity = item.quantity || 1; // Default to 1 if quantity is not provided
//   return (
//     <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_2fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
//       <div className="flex items-start gap-4">
//         <Image
//           src={medicine.thumbnail || "/icon/icon_default_medicine.png"}
//           alt={medicine.name}
//           width={80}
//           height={80}
//           className="rounded"
//         />
//         <div>
//           <p className="text-xs sm:text-lg font-medium">
//             {medicine.name}
//           </p>
//           <div className="flex items-center gap-5 mt-2">
//             <p>{medicine.price.toLocaleString()} VND</p>

//           </div>
//         </div>
//       </div>
//       <div className="flex items-center gap-2">
//         <input
//           className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
//           type="number"
//           min={1}
//           defaultValue={quantity}
//           disabled
//         />
//       </div>
//       <div className="flex flex-row items-center">
//         <button
//           onClick={() => console.log(`Xoá ${medicine.name}`)} // TODO: handle delete
//           className="cursor-pointer"
//         >
//           <Image
//             src="/icon/icon_trash.png"
//             alt="delete"
//             width={24}
//             height={24}
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
//#endregion
//#region version 02
// import { ICart } from "@/interface/order/cart.interface";
// import Image from "next/image";
// import React from "react";

// interface CartItemProps {
//   item: ICart;
// }

// const CartItem: React.FC<CartItemProps> = ({ item }) => {
//   return (
//     <div className="space-y-4">
//       {item.medicine_item.map((medItem, index) => {
//         const med = medItem.medicine_id;

//         if (!med || !med.name || !med.thumbnail || !med.price) {
//           console.warn("Missing data:", med);
//           return null;
//         }

//         const price =
//           typeof med.price === "string" ? parseFloat(med.price) : med.price;

//         return (
//           <div
//             key={med._id + index}
//             className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_2fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//           >
//             <div className="flex items-start gap-4">
//               <Image
//                 src={med.thumbnail || "/icon/icon_default_medicine.png"}
//                 alt={med.name}
//                 width={80}
//                 height={80}
//                 className="rounded"
//               />
//               <div>
//                 <p className="text-xs sm:text-lg font-medium">{med.name}</p>
//                 <div className="flex items-center gap-5 mt-2">
//                   <p>{price.toLocaleString()} VND</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <input
//                 className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
//                 type="number"
//                 min={1}
//                 defaultValue={medItem.quantity}
//                 disabled
//               />
//             </div>
//             <div className="flex flex-row items-center">
//               <button
//                 onClick={() => console.log(`Xoá ${med.name}`)}
//                 className="cursor-pointer"
//               >
//                 <Image
//                   src="/icon/icon_trash.png"
//                   alt="delete"
//                   width={24}
//                   height={24}
//                 />
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       {/* {item.medicine_item.map((medItem, index) => {
//         const med = medItem.medicine_id;

//         if (!med || typeof med.price !== "number") {
//           return null;
//         }

//         return (
//           <div
//             key={med._id + index}
//             className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_2fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//           >
//             <div className="flex items-start gap-4">
//               <Image
//                 src={med.thumbnail || "/icon/icon_default_medicine.png"}
//                 alt={med.name}
//                 width={80}
//                 height={80}
//                 className="rounded"
//               />
//               <div>
//                 <p className="text-xs sm:text-lg font-medium">{med.name}</p>
//                 <div className="flex items-center gap-5 mt-2">
//                   <p>{med.price.toLocaleString()} VND</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <input
//                 className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
//                 type="number"
//                 min={1}
//                 defaultValue={medItem.quantity}
//                 disabled
//               />
//             </div>
//             <div className="flex flex-row items-center">
//               <button
//                 onClick={() => console.log(`Xoá ${med.name}`)}
//                 className="cursor-pointer"
//               >
//                 <Image
//                   src="/icon/icon_trash.png"
//                   alt="delete"
//                   width={24}
//                   height={24}
//                 />
//               </button>
//             </div>
//           </div>
//         );
//       })} */}
//     </div>
//   );
// };

// export default CartItem;
//#endregion
//#region version 03

"use client";
import { ICart, ICartItem } from "@/interface/order/cart.interface";
import Image from "next/image";
import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemProps {
  item: ICart;
  onChangeQuantity: (medicineId: string, newQuantity: number) => void;
  onRemoveItem?: (medicineId: string) => void;
}

interface CartItemInfoProps {
  itemInfo: ICartItem;
  total: number;
  onChangeQuantity: (newQuantity: number) => void;
  onRemoveItem?: () => void;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({
  itemInfo,
  total,
  onChangeQuantity,
  onRemoveItem,
}) => {
  const { medicine_id, quantity } = itemInfo;
  return (
    <div className="flex flex-1 flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-0">
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-gray-900 truncate">
          {medicine_id.name}
        </p>
        {medicine_id.packaging && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            {medicine_id.packaging}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Đơn giá:{" "}
          <span className="font-semibold text-blue-700">
            {typeof medicine_id.price === "number"
              ? medicine_id.price.toLocaleString()
              : "0"}{" "}
            VND
          </span>
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition disabled:opacity-50"
          onClick={() => onChangeQuantity(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Giảm số lượng"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <input
          className="w-10 h-8 text-center border border-gray-200 rounded-md bg-gray-50 font-semibold text-gray-900 text-base focus:outline-blue-400 transition"
          type="number"
          min={1}
          value={quantity}
          readOnly
          style={{ MozAppearance: "textfield" }}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
          onClick={() => onChangeQuantity(quantity + 1)}
          aria-label="Tăng số lượng"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="flex flex-col items-end gap-1 min-w-[90px]">
        <p className="text-base font-bold text-gray-900">
          {total.toLocaleString()} VND
        </p>
        <button
          onClick={onRemoveItem}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 transition"
          aria-label="Xóa sản phẩm"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onChangeQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="space-y-4">
      {item.medicine_item.map((medItem, index) => {
        const { medicine_id, quantity } = medItem;
        const price =
          typeof medicine_id.price === "string"
            ? parseFloat(medicine_id.price)
            : medicine_id.price;

        const total =
          typeof price === "number" && !isNaN(price) ? price * quantity : 0;

        return (
          <div
            key={medicine_id._id + index}
            className="flex flex-row items-center bg-white rounded-md border border-gray-200 p-4 mb-2 gap-4"
          >
            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-50 border border-gray-200 flex-shrink-0">
              <Image
                src={medicine_id.thumbnail || "/icon/icon_default_medicine.png"}
                alt={medicine_id.name}
                fill
                className="object-contain"
              />
            </div>
            <CartItemInfo
              itemInfo={medItem}
              total={total}
              onChangeQuantity={(newQuantity) =>
                onChangeQuantity(medicine_id._id, newQuantity)
              }
              onRemoveItem={
                onRemoveItem ? () => onRemoveItem(medicine_id._id) : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;

//#endregion
