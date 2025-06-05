"use client";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../../public/assets";
import SearchBar from "./search-bar";
import NavItem from "../home/nav-item";
import DropMenu from "../home/drop-menu";
// import DropdownMenu from "../home/drop-dow";
// import { useContext } from "react";

const Header = () => {
  // const cart: ICart = {
  // user_id: String,
  // medicine_item: String,
  // };
  // const { getCartCount } = useContext(ShopContext);
  return (
    <div className="grid grid-cols-[auto_1fr_auto] font-medium border-b px-4">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={assets.logoMedicine}
            alt="Logo MediGo"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2 py-3 px-5">
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700 justify-center w-full">
          <li>
            <NavItem href="/" label="Trang chủ" />
          </li>
          <li>
            <NavItem href="/medicine" label="Thuốc" />
          </li>
          <li>
            <NavItem href="/" label="Bệnh" />
          </li>
          <li>
            <NavItem href="/" label="Khuyến nghị thuốc" />
          </li>
          <li>
            <NavItem href="/" label="Mã giảm giá" />
          </li>
          <li>
            <NavItem href="/" label="Về chúng tôi" />
          </li>
        </ul>
        <SearchBar />
      </div>
      <div className="flex items-center gap-6">
        <div className="group relative">
          <Link href="/home">
            <Image
              src={assets.profile_icon}
              alt="Profile icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </Link>
          {/* <DropdownMenu /> */}
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
            <DropMenu />
          </div>
          {/* <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-50 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">
                Thông tin cá nhân
              </p>
              <p className="cursor-pointer hover:text-black">
                Lịch sử đơn hàng
              </p>
              <p className="cursor-pointer hover:text-black">Mã giảm giá</p>
              <p className="cursor-pointer hover:text-black">Đăng xuất</p>
            </div>
          </div> */}
        </div>
        <Link href="/cart" className="relative">
          <Image
            src={assets.cart_icon}
            alt="Cart icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />{" "}
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {/* {getCartCount(cart)} */}2
          </p>
        </Link>
        <Link href="/" className="relative">
          <Image
            src={assets.stethoscope}
            alt="Cart icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* sidebar menu for small screens */}
      {/* <div className="">
        <div className="flex flex-col text-gray-600">
          <div className="flex items-center gap-4 p-3 cursor-pointer"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
