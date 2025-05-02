"use client";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../../public/assets";
import SearchBar from "./search-bar";

const Header = () => {
  return (
    <div className="flex items-center justify-around py-5 font-medium">
      <Link href="">
        <Image
          src={assets.logoMedicine}
          alt="Logo MediGo"
          width={80}
          height={80}
        />
      </Link>
      <div className="flex flex-col gap-2 py-3 px-5">
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <li>
            <Link href="/home" className="flex flex-col items-center gap-1">
              <p>Trang chủ</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/home" className="flex flex-col items-center gap-1">
              <p>Thuốc</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/home" className="flex flex-col items-center gap-1">
              <p>Bệnh</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/home" className="flex flex-col items-center gap-1">
              <p>Mã giảm giá</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/home" className="flex flex-col items-center gap-1">
              <p>Về chúng tôi</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </Link>
          </li>
          <li>
            <Link href="/home" className="flex flex-col items-center gap-1">
              <p>Bảng tin</p>
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
        <Link href="/" className="relative">
          <Image
            src={assets.cart_icon}
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
