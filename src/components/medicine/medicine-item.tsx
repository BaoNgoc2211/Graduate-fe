// import Image from "next/image";
// import { assets } from "../../../public/assets";

// const MedicineItem = () => {
//   return (
//     <div>
//       {/* flex flex-col justify-center items-center rounded-xl shadow-xl w-full max-w-sm py-3 px-5  */}
//       <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-[220px] relative">
//         <span className="absolute top-2 left-2 bg-gray-300 text-xs text-white font-semibold px-2 py-1 rounded-full">
//           Best Seller
//         </span>
//         {/* overflow-hidden */}
//         <div className="flex justify-center items-center mb-4">
//           <Image
//             src={assets.stethoscope}
//             alt="Medicine Thumbnail"
//             width={150}
//             height={150}
//             // hover:scale-110 transition ease-in-out
//             className=" rounded-lg object-contain "
//           />
//         </div>
//         {/* flex flex-row justify-between grid-[3fr_1fr] rounded-xl shadow-xl bg-amber-100  py-3 px-5 */}
//         <div className="flex items-center justify-between mt-auto">
//           {/* flex flex-col */}
//           <div>
//             <p className="text-sm font-semibold text-gray-700">
//               Chuyen khoa noi{" "}
//             </p>
//             <p className="text-sm text-gray-500">55.000 VND</p>
//           </div>
//           <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
//             <Image
//               src={assets.cart_icon}
//               alt="Icon Cart"
//               width={24}
//               height={24}
//               // className="items-center py-y px-5"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MedicineItem;
import Image from "next/image";
import { assets } from "../../../public/assets";
import { IMedicine } from "@/interface/medicine/medicine.interface";

const MedicineItem: React.FC<Partial<IMedicine>> = ({
  name,
  price,
  thumbnail,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-[260px] relative">
      {/* Best Seller Badge */}
      <span className="absolute top-2 left-2 bg-gray-400 text-white text-xs font-medium px-2 py-0.5 rounded-md">
        Best Seller
      </span>

      {/* Product Image */}
      <div className="flex justify-center items-center mb-4 h-[120px]">
        <Image
          src={assets.stethoscope}
          alt="Medicine Thumbnail"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800 font-medium truncate mb-2">
            Chuyên khoa nội tiết kéo dài rất dài abc xyz
          </p>
          <p className="text-sm text-gray-500">55.000 VND</p>
        </div>

        {/* Cart Icon */}
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
  );
};

export default MedicineItem;
