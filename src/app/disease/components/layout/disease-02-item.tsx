// import { IDisCategory } from "@/interface/disease/disease-category.interface";

// >>
interface Props {
  title: string;
  icon: string;
}
// const DisCateCardAgeItem:React.FC<Partial<IDisCategory ({ name, icon }) => {
//   return (
//     <>
//       <div className="flex flex-col items-center justify-center bg-white  rounded-xl shadow-xl w-full max-w-sm py-3 px-5 ">
//         <div className=" overflow-hidden">
//           <Image
//             className="hover:scale-110 transition ease-in-out"
//             src={assets.stethoscope}
//             alt="Image"
//             width={50}
//             height={50}
//           />
//         </div>
//         <p className="pt-3 text-[#00416A] pb-1 font-medium mt-5">
//           Chuyên khoa nội
//         </p>
//       </div>

//     </>
//   );
// };
const Disease02Item = ({ title, icon }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white  rounded-xl shadow-xl w-full max-w-sm py-3 px-5 ">
      <div className=" overflow-hidden">
        <image src={icon} className="hover:scale-110 transition ease-in-out" />
      </div>
      <p className="pt-3 text-[#00416A] pb-1 font-medium mt-5">{title}</p>
    </div>
  );
};
export default Disease02Item;
