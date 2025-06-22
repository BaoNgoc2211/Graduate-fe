"use client";
import {
  Home,
  TicketPercent,
  Bell,
  WalletCards,
  LogOut,
  Logs,
  MapPinHouse,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

const sidebarItems = [
  { label: "Thông tin cá nhân", icon: Home, href: "/profile" },
  { label: "Lịch sử đơn hàng", icon: Logs, href: "/profile/order" },
  { label: "Mã giảm giá", icon: TicketPercent, href: "/coupons" },
  { label: "Thông báo của tôi", icon: Bell, href: "/notifications" },
  { label: "Quản lý thanh toán", icon: WalletCards, href: "/payments" },
  { label: "Đơn thuốc của tôi", icon: ClipboardList, href: "/prescriptions" },
  { label: "Sổ địa chỉ nhận hàng", icon: MapPinHouse, href: "/prescriptions" },
  { label: "Đăng xuất", icon: LogOut },
];

const SidebarProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // Thêm logic thực tế như xóa token, gọi API logout, điều hướng về trang login
  };

  return (
    <aside
      className={clsx(
        "h-screen bg-white text-blue-900 flex flex-col justify-between transition-all duration-300",
        collapsed ? "w-[60px]" : "w-64"
      )}
    >
      <div className="p-4 space-y-2">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-900 hover:text-white transition-colors"
              >
                <Icon size={20} />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 p-2 rounded-md hover:bg-red-600 hover:text-white transition-colors"
              >
                <Icon size={20} />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center h-10 bg-blue-900 hover:bg-gray-700 transition"
        >
          {collapsed ? (
            <ChevronRight size={24} className="text-white" />
          ) : (
            <ChevronLeft size={24} className="text-white" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SidebarProfile;
