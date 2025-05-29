// import { IDisCategory } from "@/interface/disease/disease-category.interface";
// import { assets } from "../../../../../public/assets";

// const DisCategoryCard: React.FC<Partial<IDisCategory>> = ({
//   name,
//   icon,
// }) => {
//   return (
//     <div className="flex items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">
//       <p className="text-sm font-medium">{name ?? "Tên danh mục"}</p>
//       <img
//         className="w-6 h-6 object-cover rounded-full"
//         src={icon ?? "/images/default-thumbnail.jpg"}
//         alt={name ?? "icon disease category"}
//       />
//     </div>
//   );
// };
interface Props {
  title: string;
  icon: string;
}
// const DisCateCardItem = () => {
//   return (
// <div className="w-full sm:w-fit flex lg:flex-row  sm:flex-row md:flex-row items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">
//   <p className="text-sm font-medium">Chuyên khoa nội khoa</p>
//   <img
//     className="w-6 h-6 object-cover rounded-full hidden lg:block"
//     src={assets.duoc_lieu}
//     alt=""
//   />
// </div>
//     <div className="w-full overflow-x-auto md:overflow-x-visible">
//       <div className="flex flex-row md:flex-col gap-4 p-4 w-max md:w-full">
//         {categories.map((category, index) => (
//           <DisCateCardItem
//             key={index}
//             title={category.title}
//             icon={category.icon}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default DisCateCardItem;
const Disease01Item = ({ title, icon }: Props) => {
  return (
    <div className="min-w-[140px] md:min-w-0 w-fit flex items-center gap-2 border border-[#00416A] px-4 py-3 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">
      <span className="text-xl">{icon}</span>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};

export default Disease01Item;
