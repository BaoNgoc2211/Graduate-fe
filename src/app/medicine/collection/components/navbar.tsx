import Image from "next/image";
import { assets } from "../../../../../public/assets";
const navItems = [
  {
    label: "Thuốc kê đơn",
    image: assets.thuoc_ke_don,
  },
  {
    label: "Thuốc không kê đơn",
    image: assets.thuoc_khong_ke_don,
  },
  {
    label: "Thực phẩm chức năng",
    image: assets.thuc_pham_chuc_nang,
  },
  {
    label: "Dược liệu",
    image: assets.duoc_lieu,
  },
];
const NavItem = ({ label, image }: { label: string; image: string }) => (
  <div className="flex items-center gap-2 border border-[#00416A] px-3 py-2 rounded-2xl hover:bg-[#00416A] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md">
    <p className="text-sm font-medium">{label}</p>
    <Image src={image} alt={label} width={20} height={20} />
  </div>
);
const Navbar = () => {
  return (
    <div className="flex flex-row gap-3 px-1 py-2 justify-center">
      {navItems.map((item) => (
        <NavItem key={item.label} label={item.label} image={item.image} />
      ))}
    </div>
  );
  // return (
  //   <div className="flex flex-row px-1 py-2 mr-4">
  //     <div className="flex border border-blue-900 px-2 py-1 rounded-2xl">
  //       <p className="">Thuốc kê đơn</p>
  //       <div className="">
  //         <Image
  //           src={assets.thuoc_ke_don}
  //           alt="Thuốc kê đơn"
  //           width={20}
  //           height={20}
  //         />
  //       </div>
  //     </div>
  //     <div className="flex border border-blue-900 px-2 py-1 rounded-2xl">
  //       <p>Thuốc không kê đơn</p>
  //       <div>
  //         <Image
  //           src={assets.thuoc_khong_ke_don}
  //           alt="Thuốc không kê đơn"
  //           width={20}
  //           height={20}
  //         />
  //       </div>
  //     </div>
  //     <div className="flex border border-blue-900 px-2 py-1 rounded-2xl">
  //       <p>Thực phẩm chức năng</p>
  //       <div>
  //         {" "}
  //         <Image
  //           src={assets.thuc_pham_chuc_nang}
  //           alt="Thực phẩm chức năng"
  //           width={20}
  //           height={20}
  //         />
  //       </div>
  //     </div>
  //     <div className="flex border border-blue-900 px-2 py-1 rounded-2xl">
  //       <p>Dược liệu</p>
  //       <div>
  //         <Image
  //           src={assets.duoc_lieu}
  //           alt="Dược liệu"
  //           width={20}
  //           height={20}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default Navbar;
