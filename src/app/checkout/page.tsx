//#region
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
//#endregion
//#region Chưa gắn API
// import Title from "@/components/ui/title";
// import { useState } from "react";
// import SelectComponent from "./components/ui/select";
// import VoucherSelection from "./components/layout/voucher-selection";
// import CartTotal from "./components/layout/cart-total";
// import { assets } from "../../../public/assets";

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
//   // const navigate = useNavigate(); // <-- Dùng useNavigate thay vì context
//   const navigate = (path: string) => {
//     alert("Chuyển hướng đến: " + path);
//   };
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
//     <div className="flex flex-col sm:flex-row justify-between gap-4 sm:pt-8 min-h-[60vh] border border-blue-900 p-10">
//       {/* Left Side */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[500px]">
//         <Title text1="Thông tin đơn hàng" text2="" />

//         <div className="flex gap-3">
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="HỌ VÀ TÊN ĐỆM"
//           />
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="TÊN "
//           />
//         </div>

//         <input
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="text"
//           placeholder="Số nhà, đường, ấp, thị trấn "
//         />

//         <div className="flex gap-3">
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Phường/Xã"
//           />
//           <input
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             type="text"
//             placeholder="Thành phố"
//           />
//         </div>

//         <input
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           type="number"
//           placeholder="Số điện thoại"
//         />

//         <SelectComponent
//           label="Phương thứt vân chuyển "
//           options={ShippingOptions}
//           value={shipping}
//           onChange={setShipping}
//         />

//         <VoucherSelection vouchers={vouchers} />
//       </div>

//       {/* Right Side */}
//       <div className="">
//         <div className="min-w-80">
//           <CartTotal />
//         </div>

//         <div className="mt-12">
//           <Title text1="Phương thức " text2="Thanh Toán" />

//           <div className="flex gap-3 flex-col lg:flex-row mt-4">
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
//                 Thanh toán khi nhận hàng
//               </p>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-black text-white px-16 py-3 text-sm rounded hover:bg-gray-800"
//             >
//               Đặt hàng
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;
//#endregion
//#region mới
"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Package,
  ArrowLeft,
  Truck,
  User,
  MapPin,
  Phone,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import type { ICheckoutData } from "@/interface/order/cart.interface";
import type { ICheckoutPayload } from "@/interface/order/order.interface";
import { useShippingMethods } from "@/hooks/order/shipping.hooks";
import { useCheckoutOrder, useReviewOrder } from "@/hooks/order/order.hooks";
import OrderReviewComponent from "@/components/order/order-review";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";

export default function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState<ICheckoutData | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const [showOrderReview, setShowOrderReview] = useState(false);

  // Hooks
  const {
    data: shippingData,
    isLoading: isLoadingShipping,
    error: shippingError,
  } = useShippingMethods();
  const reviewOrderMutation = useReviewOrder();
  const checkoutMutation = useCheckoutOrder();

  const shippingMethods = shippingData?.data || [];

  useEffect(() => {
    // Lấy dữ liệu checkout từ localStorage
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      try {
        const data = JSON.parse(savedData) as ICheckoutData;
        setCheckoutData(data);
      } catch (error) {
        console.error("Error parsing checkout data:", error);
      }
    }
  }, []);

  // Set default shipping method khi data đã load
  useEffect(() => {
    if (shippingMethods.length > 0 && !selectedShipping) {
      setSelectedShipping(shippingMethods[0]._id || "");
    }
  }, [shippingMethods, selectedShipping]);

  const handleBackToCart = () => {
    window.location.href = "/cart";
  };

  const handleReviewOrder = () => {
    if (!checkoutData || !selectedShipping) {
      toast.error("Vui lòng chọn phương thức vận chuyển");
      return;
    }

    const payload: ICheckoutPayload = {
      selectItemIds: checkoutData.items.map((item) => item.medicine_id),
      shippingId: selectedShipping,
    };

    reviewOrderMutation.mutate(payload, {
      onSuccess: () => {
        setShowOrderReview(true);
      },
    });
  };

  const handlePlaceOrder = () => {
    if (!checkoutData || !selectedShipping) {
      return;
    }

    const payload: ICheckoutPayload = {
      selectItemIds: checkoutData.items.map((item) => item.medicine_id),
      shippingId: selectedShipping,
    };

    checkoutMutation.mutate(payload);
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không có dữ liệu thanh toán
            </h3>
            <p className="text-gray-500 mb-6">
              Vui lòng quay lại giỏ hàng và chọn sản phẩm
            </p>
            <Button
              onClick={handleBackToCart}
              className="bg-blue-900 hover:bg-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại giỏ hàng
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Hiển thị component review order nếu đã review
  if (showOrderReview && reviewOrderMutation.data) {
    return (
      <OrderReviewComponent
        orderReview={reviewOrderMutation.data}
        onBack={() => setShowOrderReview(false)}
        onPlaceOrder={handlePlaceOrder}
        isLoading={checkoutMutation.isPending}
      />
    );
  }

  const selectedShippingMethod = shippingMethods.find(
    (method) => method._id === selectedShipping
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">
                Thanh toán
              </h1>
            </div>
            <Button variant="outline" onClick={handleBackToCart}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Đơn hàng của bạn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkoutData.items.map((item) => (
                  <div
                    key={item.medicine_id}
                    className="flex items-center space-x-4"
                  >
                    <Image
                      src={
                        item.thumbnail || "/placeholder.svg?height=60&width=60"
                      }
                      alt={item.name}
                      className="w-15 h-15 object-cover rounded-lg border"
                      width={20}
                      height={20}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.packaging && (
                        <p className="text-sm text-gray-500">
                          {item.packaging}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-green-600">
                      {formatPrice(item.totalPrice)}
                    </span>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(checkoutData.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="text-blue-600">
                      {selectedShippingMethod
                        ? formatPrice(selectedShippingMethod.price)
                        : "Chọn phương thức"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-900">
                      {formatPrice(
                        checkoutData.totalAmount +
                          (selectedShippingMethod?.price || 0)
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment */}
          <div className="space-y-6">
            {/* Shipping Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Phương thức vận chuyển
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingShipping ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">
                      Đang tải phương thức vận chuyển...
                    </span>
                  </div>
                ) : shippingError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">
                      Không thể tải phương thức vận chuyển
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                      className="text-blue-600 border-blue-600"
                    >
                      Thử lại
                    </Button>
                  </div>
                ) : shippingMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Không có phương thức vận chuyển nào
                    </p>
                  </div>
                ) : (
                  <RadioGroup
                    value={selectedShipping}
                    onValueChange={setSelectedShipping}
                  >
                    <div className="space-y-4">
                      {shippingMethods.map((method) => (
                        <div
                          key={method._id}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <RadioGroupItem
                            value={method._id || ""}
                            id={method._id}
                          />
                          <Label
                            htmlFor={method._id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{method.type}</p>
                                <p className="text-sm text-gray-500">
                                  Phí vận chuyển
                                </p>
                              </div>
                              <span className="font-medium text-blue-900">
                                {formatPrice(method.price)}
                              </span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              </CardContent>
            </Card>

            {/* Customer Info Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Thông tin người nhận
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Họ tên:</span>
                    <span className="font-medium">
                      Sẽ được lấy từ thông tin tài khoản
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span className="font-medium">
                      Sẽ được lấy từ thông tin tài khoản
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Địa chỉ:</span>
                    <span className="font-medium">
                      Sẽ được lấy từ thông tin tài khoản
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review Order Button */}
            <Button
              onClick={handleReviewOrder}
              disabled={
                !selectedShipping ||
                reviewOrderMutation.isPending ||
                isLoadingShipping
              }
              className="w-full bg-blue-900 hover:bg-blue-800"
              size="lg"
            >
              {reviewOrderMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Xem trước đơn hàng
                </>
              )}
            </Button>

            {!selectedShipping && shippingMethods.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  💡 Vui lòng chọn phương thức vận chuyển để tiếp tục
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
