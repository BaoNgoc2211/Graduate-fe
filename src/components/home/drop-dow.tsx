'use client';
import Link from "next/link";

const DropdownMenu = () => {
  return (
    <div className="relative group">
      <button className="px-4 py-2 text-gray-700 hover:text-black">Tài khoản</button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-white shadow-lg rounded-xl p-4 w-48 z-50">
        <Link
          href="/profile"
          className="text-sm text-gray-600 hover:text-black py-1 transition-colors duration-200"
        >
          Thông tin cá nhân
        </Link>
        <Link
          href="/orders"
          className="text-sm text-gray-600 hover:text-black py-1 transition-colors duration-200"
        >
          Lịch sử đơn hàng
        </Link>
        <Link
          href="/coupons"
          className="text-sm text-gray-600 hover:text-black py-1 transition-colors duration-200"
        >
          Mã giảm giá
        </Link>
        <Link
          href="/sign-in"
          className="text-sm text-gray-600 hover:text-black py-1 transition-colors duration-200"
        >
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
