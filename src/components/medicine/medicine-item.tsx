// import Image from "next/image";
// import { assets } from "../../../public/assets";
"use client";
import Image from "next/image";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { assets } from "../../../public/assets";

const MedicineItem: React.FC<Partial<IMedicine>> = ({ name, thumbnail }) => {
  return (
    <>
      <div className="text-gray-700 bg-white rounded-xl shadow-md p-4 w-full max-w-[260px] relative cursor-copy">
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out "
            src={thumbnail ?? "/images/default-thumbnail.jpg"}
            alt={name ?? "Medicine image"}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 font-medium truncate mb-2">
              {name}
            </p>
          </div>

          <div className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition shrink-0">
            <Image
              src={assets.cart_icon}
              alt="Icon Cart"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
      {/* <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-[260px] relative cursor-copy">
       <div>
         {/* Best Seller Badge */}
      {/* <span className="absolute top-2 left-2 bg-gray-400 text-white text-xs font-medium px-2 py-0.5 rounded-md">
          Best Seller
        </span>  */}

      {/* Product Image */}
      {/* <div className="flex justify-center items-center mb-4 h-[120px]">
          <img
            className="hover:scale-110 transition ease-in-out w-[100px] h-[100px] object-cover" 
            src={thumbnail ?? "/images/default-thumbnail.jpg"}
            alt={name ?? "Medicine image"}
          /> */}
      {/* <Image
            src={assets.stethoscope}
            alt="Medicine Thumbnail"
            width={100}
            height={120}
            // className="object-contain"
            className="hover:scale-110 transition ease-in-out"
          /> */}
      {/* </div>

        {/* Product Info */}
      {/* <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 font-medium truncate mb-2">
              {name}
            </p>
            <p className="text-sm text-blue-900 font-bold">55.000 VND</p>
          </div> */}

      {/* Cart Icon */}
      {/* <div className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition shrink-0">
            <Image
              src={assets.cart_icon}
              alt="Icon Cart"
              width={18}
              height={18}
            />
          </div>
        </div>
       </div>
      </div> */}
    </>
  );
};
export default MedicineItem;
//----------------------------------
// import Image from "next/image";
// import { IMedicine } from "@/interface/medicine/medicine.interface";

// const MedicineItem: React.FC<Partial<IMedicine>> = ({ name, thumbnail }) => {
//   return (
//     <div className="text-gray-700 cursor-pointer">
//       <div className="overflow-hidden">
//         {/* <Image
//         className="hover:scale-110 transition ease-in-out"
//         src={thumbnail}
//         alt='Image'
//       /> */}
//         <Image
//           className="hover:scale-110 transition ease-in-out"
//           src={thumbnail}
//           alt="Image"
//           width={200}
//           height={200}
//         />
//       </div>
//       <p className="pt-3 pb-1 text-sm">{name}</p>
//       {/* <p className="text-sm font-medium">
//       {formatCurrency(price!)}
//     </p> */}
//     </div>

//   );
// };

//---------------------------------------------

// <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-[260px] relative cursor-copy">
//   {/* Best Seller Badge */}
//   <span className="absolute top-2 left-2 bg-gray-400 text-white text-xs font-medium px-2 py-0.5 rounded-md">
//     Best Seller
//   </span>

//   {/* Product Image */}
//   <div className="flex justify-center items-center mb-4 h-[120px]">
//     <Image
//       src={assets.stethoscope}
//       alt="Medicine Thumbnail"
//       width={100}
//       height={120}
//       // className="object-contain"
//       className="hover:scale-110 transition ease-in-out"
//     />
//   </div>

//   {/* Product Info */}
//   <div className="flex items-center justify-between gap-4">
//     <div className="flex-1 min-w-0">
//       <p className="text-sm text-gray-800 font-medium truncate mb-2">
//         Chuyên khoa nội tiết kéo dài rất dài abc xyz
//       </p>
//       <p className="text-sm text-blue-900 font-bold">55.000 VND</p>
//     </div>

//     {/* Cart Icon */}
//     <div className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition shrink-0">
//       <Image
//         src={assets.cart_icon}
//         alt="Icon Cart"
//         width={18}
//         height={18}
//       />
//     </div>
//   </div>
// </div>
