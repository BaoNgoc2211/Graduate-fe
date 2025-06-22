// ;import Title from "@/components/ui/title";
// import { ShopContext } from "@/context/ShopContext";
// import { useContext, useState } from "react";
// import SelectComponent from "./components/ui/select";
// import VoucherSelection from "./components/layout/voucher-selection";
// import CartTotal from "./components/layout/cart-total";
// import { assets } from "../../../../public/assets";

// interface ShippingOption {
//   value: string;
//   label: string;
//   price: number;
//   description: string;
// }

// interface Voucher {
//   _id: string;
//   code: string;
//   name: string;
//   description: string;
//   discountType: string;
//   discountValue: number;
//   minOrderValue: number;
//   maxDiscountValue: number;
// }

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const { navigate } = useContext(ShopContext)!;
//   const [shipping, setShipping] = useState("");

//   const ShippingOptions: ShippingOption[] = [
//     {
//       value: "standard",
//       label: "Standard",
//       price: 5,
//       description: "Giao hàng tiêu chuẩn trong 1 - 2 ngày",
//     },
//     {
//       value: "express",
//       label: "Express",
//       price: 10,
//       description: "Giao hàng nhanh chóng trong 1 ngày",
//     },
//     {
//       value: "priority",
//       label: "Priority",
//       price: 15,
//       description: "Giao hàng hỏa tốc trong vòng 12 giờ",
//     },
//   ];

//   const vouchers: Voucher[] = [
//     {
//       _id: "67db44428dc5637cdf7b2cbe",
//       code: "SUMMER2024",
//       name: "Giảm giá mùa hè",
//       description: "Giảm 20% cho tất cả sản phẩm",
//       discountType: "percentage",
//       discountValue: 20,
//       minOrderValue: 100000,
//       maxDiscountValue: 500000,
//     },
//   ];

//   const handlePlaceOrder = () => {
//     if (!shipping) {
//       alert("Vui lòng chọn hình thức giao hàng.");
//       return;
//     }
//     navigate("/order");
//   };

//   return (
//     <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
//       {/* Left Side */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <Title text1="DELIVERY" text2="INFORMATION" />

//         <div className="flex gap-3">
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="First name"
//           />
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Last name"
//           />
//         </div>

//         <input
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="text"
//           placeholder="Street address"
//         />

//         <div className="flex gap-3">
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="City"
//           />
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Country"
//           />
//         </div>

//         <input
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="number"
//           placeholder="Phone number"
//         />

//         <SelectComponent
//           label="Shipping Option"
//           options={ShippingOptions}
//           value={shipping}
//           onChange={setShipping}
//         />

//         <VoucherSelection vouchers={vouchers} />
//       </div>

//       {/* Right Side */}
//       <div className="mt-8">
//         <div className="min-w-80">
//           <CartTotal />
//         </div>

//         <div className="mt-12">
//           <Title text1="PAYMENT" text2="METHOD" />

//           <div className="flex gap-3 flex-col lg:flex-row mt-4">
//             {/* Stripe */}
//             <div
//               onClick={() => setMethod("stripe")}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <span
//                 className={`w-4 h-4 border rounded-full ${
//                   method === "stripe" ? "bg-green-400" : ""
//                 }`}
//               ></span>
//               <img className="h-5 mx-4" src={assets.logoMoMo} alt="Stripe" />
//             </div>

//             {/* PayPal */}
//             <div
//               onClick={() => setMethod("paypal")}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <span
//                 className={`w-4 h-4 border rounded-full ${
//                   method === "paypal" ? "bg-green-400" : ""
//                 }`}
//               ></span>
//               <img className="h-5 mx-4" src={assets.logo_vnpay} alt="PayPal" />
//             </div>

//             {/* COD */}
//             <div
//               onClick={() => setMethod("cod")}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <span
//                 className={`w-4 h-4 border rounded-full ${
//                   method === "cod" ? "bg-green-400" : ""
//                 }`}
//               ></span>
//               <p className="text-gray-500 text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </p>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-black text-white px-16 py-3 text-sm rounded hover:bg-gray-800"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;
"use client";

import Title from "@/components/ui/title";
// import { ShopContext } from "@/context/ShopContext";
import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // <-- Thêm dòng này
import SelectComponent from "./components/ui/select";
import VoucherSelection from "./components/layout/voucher-selection";
import CartTotal from "./components/layout/cart-total";
import { assets } from "../../../public/assets";

interface ShippingOption {
  value: string;
  label: string;
  price: number;
  description: string;
}

interface Voucher {
  _id: string;
  code: string;
  name: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscountValue: number;
}

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  // const navigate = useNavigate(); // <-- Dùng useNavigate thay vì context
  const navigate = (path: string) => {
    alert("Chuyển hướng đến: " + path);
  };
  const [shipping, setShipping] = useState("");

  const ShippingOptions: ShippingOption[] = [
    {
      value: "standard",
      label: "Standard",
      price: 5,
      description: "Giao hàng tiêu chuẩn trong 1 - 2 ngày",
    },
    {
      value: "express",
      label: "Express",
      price: 10,
      description: "Giao hàng nhanh chóng trong 1 ngày",
    },
    {
      value: "priority",
      label: "Priority",
      price: 15,
      description: "Giao hàng hỏa tốc trong vòng 12 giờ",
    },
  ];

  const vouchers: Voucher[] = [
    {
      _id: "67db44428dc5637cdf7b2cbe",
      code: "SUMMER2024",
      name: "Giảm giá mùa hè",
      description: "Giảm 20% cho tất cả sản phẩm",
      discountType: "percentage",
      discountValue: 20,
      minOrderValue: 100000,
      maxDiscountValue: 500000,
    },
  ];

  const handlePlaceOrder = () => {
    if (!shipping) {
      alert("Vui lòng chọn hình thức giao hàng.");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:pt-8 min-h-[60vh] border border-blue-900 p-10">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[500px]">
        <Title text1="Thông tin đơn hàng" text2="" />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="HỌ VÀ TÊN ĐỆM"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="TÊN "
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Số nhà, đường, ấp, thị trấn "
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Phường/Xã"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Thành phố"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Số điện thoại"
        />

        <SelectComponent
          label="Phương thứt vân chuyển "
          options={ShippingOptions}
          value={shipping}
          onChange={setShipping}
        />

        <VoucherSelection vouchers={vouchers} />
      </div>

      {/* Right Side */}
      <div className="">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="Phương thức " text2="Thanh Toán" />

          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <span
                className={`w-4 h-4 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></span>
              <img className="h-5 mx-4" src={assets.logoMoMo} alt="Stripe" />
            </div>

            <div
              onClick={() => setMethod("paypal")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <span
                className={`w-4 h-4 border rounded-full ${
                  method === "paypal" ? "bg-green-400" : ""
                }`}
              ></span>
              <img className="h-5 mx-4" src={assets.logo_vnpay} alt="PayPal" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <span
                className={`w-4 h-4 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></span>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Thanh toán khi nhận hàng
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm rounded hover:bg-gray-800"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
