// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { assets } from "../../../public/assets";
// import NavItem from "../home/nav-item";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { logOutAPI } from "@/api/auth/auth.api";

// const Header = () => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logOutAPI();
//       toast.success("Đăng xuất thành công!");
//       router.push("/auth");
//     } catch {
//       toast.error("Có lỗi khi đăng xuất!");
//     }
//   };
//   return (
//     <div className="grid grid-cols-[auto_1fr_auto] font-medium border-b border-gray-300 px-4">
//       <div className="flex items-center">
//         <Link href="/">
//           <Image
//             src={assets.logoMedicine}
//             alt="Logo MediGo"
//             width={100}
//             height={50}
//           />
//         </Link>
//       </div>
//       <div className="flex flex-col gap-2 justify-center text-center">
//         <ul className="hidden sm:flex gap-5 text-md text-blue-900 justify-center text-center w-full">
//           <li>
//             <NavItem href="/" label="Trang chủ" />
//           </li>
//           <li>
//             <NavItem href="/medicine" label="Thuốc" />
//           </li>
//           <li>
//             <NavItem href="/disease" label="Bệnh" />
//           </li>
//           <li>
//             <NavItem href="/symptom-checker" label="Khuyến nghị thuốc" />
//           </li>
//           <li>
//             <NavItem href="/voucher" label="Mã giảm giá" />
//           </li>
//           <li>
//             <NavItem href="/about" label="Về chúng tôi" />
//           </li>
//         </ul>
//         {/* <SearchBar /> */}
//       </div>
//       <div className="flex items-center gap-6">
//         <div className="group relative">
//           <Link href="/profile">
//             <Image
//               src={assets.profile_icon}
//               alt="Profile icon"
//               width={20}
//               height={20}
//               className="cursor-pointer"
//             />
//           </Link>
//           <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
//             <div className="flex flex-col gap-2 w-50 py-3 px-5 bg-blue-600 text-white rounded">
//               <Link href="/profile">
//                 <p className="cursor-pointer hover:text-blue-900">
//                   Thông tin cá nhân
//                 </p>
//               </Link>
//               <Link href="/order-management">
//                 <p className="cursor-pointer hover:text-blue-900">
//                   Lịch sử đơn hàng
//                 </p>
//               </Link>
//               <p
//                 className="cursor-pointer hover:text-blue-900"
//                 onClick={handleLogout}
//               >
//                 Đăng xuất
//               </p>
//             </div>
//           </div>
//         </div>
//         <Link href="/cart" className="relative">
//           <Image
//             src={assets.cart_icon}
//             alt="Cart icon"
//             width={20}
//             height={20}
//             className="cursor-pointer"
//           />{" "}
//         </Link>
//         {/* <Link href="/" className="relative">
//           <Image
//             src={assets.stethoscope}
//             alt="Cart icon"
//             width={20}
//             height={20}
//             className="cursor-pointer"
//           />
//         </Link> */}
//       </div>
//     </div>
//   );
// };

// export default Header;
"use client";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../../public/assets";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logOutAPI } from "@/api/auth/auth.api";
import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOutAPI();
      toast.success("Đăng xuất thành công!");
      router.push("/auth");
    } catch {
      toast.error("Có lỗi khi đăng xuất!");
    }
  };

  const navigationItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/medicine", label: "Thuốc" },
    { href: "/disease", label: "Bệnh" },
    { href: "/symptom-checker", label: "Khuyến nghị thuốc" },
    { href: "/voucher", label: "Mã giảm giá" },
    { href: "/about", label: "Về chúng tôi" },
  ];

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src={assets.logoMedicine}
                  alt="Logo MediGo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <Link
                href="/cart"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {/* Cart Badge - uncomment when you have cart count */}
                {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span> */}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200 flex items-center space-x-1"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline-block text-sm font-medium">Tài khoản</span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      href="/order-management"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Lịch sử đơn hàng
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16"></div>

      {/* Overlay for mobile menu and profile dropdown */}
      {(isMenuOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;