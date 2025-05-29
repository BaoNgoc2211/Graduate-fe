"use client";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../../public/assets";
import SearchBar from "./search-bar";
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
            <Link href="/" className="flex flex-col items-center gap-1">
              <p>Trang chủ</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/medicine" className="flex flex-col items-center gap-1">
              <p>Thuốc</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/disease" className="flex flex-col items-center gap-1">
              <p>Bệnh</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>

          <li>
            <Link href="/symptom-checker" className="flex flex-col items-center gap-1">
              <p>Khuyến nghị thuốc</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/voucher" className="flex flex-col items-center gap-1">
              <p>Mã giảm giá</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex flex-col items-center gap-1">
              <p>Về chúng tôi</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
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
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">
                Thông tin cá nhân
              </p>
              <p className="cursor-pointer hover:text-black">
                Lịch sử đơn hàng
              </p>
              <p className="cursor-pointer hover:text-black">Mã giảm giá</p>
              <p className="cursor-pointer hover:text-black">Đăng xuất</p>
            </div>
          </div>
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
