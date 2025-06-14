"use client";
import { getAllCartAPI } from "@/api/cart/cart.api";
//#region  version 01 full
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Title from "@/components/ui/title";
// import { assets } from "../../../public/assets";
// import { useNavigate } from "react-router-dom";
// import CartTotal from "./components/cart-total";

// const Cart = () => {
//   const [navigate] = useNavigate;
//   const [cartData, setCartData] = useState<
//     { _id: string; size: string; quantity: number }[]
//   >([]);
//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <Title text1={"Giỏ Hàng"} text2={"Của Bạn"} />
//       </div>
//       <div>
//         {cartData.map((item, index) => {
//           const productData = products.find(
//             (product) => product._id === item._id
//           );
//           if (!productData) {
//             return null; // hoặc hiển thị một thông báo lỗi
//           }
//           return (
//             <div
//               key={index}
//               className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//             >
//               <div className="flex items-start gap-6">
//                 <img
//                   className="w-16 sm:w-20"
//                   src={productData.image[0]}
//                   alt=""
//                 />
//                 <div>
//                   <p className="text-xs sm:text-lg font-medium">
//                     {productData.name}
//                   </p>
//                   <div className="flex items-center gap-5 mt-2">
//                     <p>
//                       {currency}
//                       {productData.price}
//                     </p>
//                     <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
//                       {item.size}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <input
//                 onChange={(e) =>
//                   e.target.value === `` || e.target.value === "0"
//                     ? null
//                     : updateQuantity(
//                         item._id,
//                         item.size,
//                         Number(e.target.value)
//                       )
//                 }
//                 className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                 type="number"
//                 min={1}
//                 defaultValue={item.quantity}
//               />
//               <img
//                 onClick={() => updateQuantity(item._id, item.size, 0)}
//                 className="w-4 mr-4 sm:w-5 cursor-pointer"
//                 src={assets.bin_icon}
//                 alt=""
//               />
//             </div>
//           );
//         })}
//         <div className="flex justify-end my-20">
//           <div className="w-full sm:w-[450px]">
//             <CartTotal />
//             <div className="w-full text-end">
//               <button
//                 onClick={() => navigate("/place-order")}
//                 className="bg-black text-white text-sm my-8 px-8 py-3 "
//               >
//                 THANH TOÁN
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Cart;
//#endregion
import Title from "@/components/ui/title";
import { ICart } from "@/interface/order/cart.interface";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";
import CartItem from "./components/cart-item";
const Cart = () => {
  // const [setType] = useState([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-cart"],
    queryFn: () => getAllCartAPI(),
  });
  const cartItems: ICart[] = data?.data || [];
  // Tính tổng tiền
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (acc, item) =>
        acc + item.medicine_item.price * item.medicine_item.quantity,
      0
    );
  }, [cartItems]);

  // if (isLoading) {
  //   return (
  //     <div className="border-t pt-14 text-center">
  //       <p className="text-gray-500">Đang tải giỏ hàng...</p>
  //     </div>
  //   );
  // }
  if (isError) {
    return (
      <div className="border-t pt-14 text-center">
        <p className="text-red-500">
          Không thể tải dữ liệu giỏ hàng. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }
  console.log("Category", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Giỏ Hàng"} text2={" Của Bạn"} />
      </div>

      {/* {mockCartData.map((item, index) => (
        <div
          key={index}
          className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_2fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
        >
          <div className="flex items-start gap-4">
            <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
            <div>
              <p className="text-xs sm:text-lg font-medium">{item.name}</p>
              <div className="flex items-center gap-5 mt-2">
                <p>{item.price.toLocaleString()} VND</p>
                <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                  {item.size}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <Image
              src="/icon/icon_minus.png"
              alt="icon minus"
              width={24}
              height={24}
            />
            <input
              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 mr-2"
              type="number"
              min={1}
              defaultValue={item.quantity}
              disabled
            />{" "}
            <Image
              src="/icon/icon_plus.png"
              alt="icon plus"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-row">
            <p className="mr-5">300.000VND</p>{" "}
            <img
              className="w-6 mr-4 sm:w-5 opacity-30"
              src="/icon/icon_trash.png"
              alt="delete"
            />
          </div>
        </div>
      ))} */}
      {/* Danh sách sản phẩm */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem key={item.medicine_item._id} item={item} />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Giỏ hàng của bạn đang trống.
        </p>
      )}
      {/* <div
        key={index}
        className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_2fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
      >
      </div>
      {data?.data?.map((item: ICart> (
        <MedicineItem
          key={item._id}
          _id={item._id}
          name={item.name}
          thumbnail={item.thumbnail}
        />
      ))} */}
      {/* Tổng tiền và nút thanh toán */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="border p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm font-semibold">
              <span>Tổng tiền:</span>
              <span>{totalPrice.toLocaleString()} VND</span>
            </div>
          </div>
          <div className="w-full text-end">
            <Link href="/checkout">
              {" "}
              {/* <button
                className="bg-black text-white text-sm my-8 px-8 py-3 cursor-not-allowed opacity-50"
                disabled
              >
                THANH TOÁN
              </button> */}
              <button
                className={`bg-black text-white text-sm my-8 px-8 py-3 ${
                  cartItems.length === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={cartItems.length === 0}
              >
                THANH TOÁN
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// //#region version 02
// /* eslint-disable react/no-unescaped-entities */
// // import React, { useState } from "react";
// // import Image from "next/image";
// // import { useRouter } from "next/navigation";

// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import {
// //   AlertDialog,
// //   AlertDialogTrigger,
// //   AlertDialogContent,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// // } from "@/components/ui/alert-dialog";
// // import { Input } from "@/components/ui/input";
// // import { LoaderCircle, Minus, Plus, Trash2 } from "lucide-react";

// // import { useAppSelector, useAppDispatch } from "@/lib/hooks";
// // import { updateCart } from "@/lib/features/cart/cartSlice";
// // import { CartType } from "@/types/cart";
// // import BreadCrumb from "@/app/cart/components/bread-crumb";
// // const emptyCart = "/assets/images/empt-cart.jpg";

// // export default function CartPage() {
// //   const dispatch = useAppDispatch();
// //   const router = useRouter();
// //   const [isDeleting, setIsDeleting] = useState(false);
// //   const [isUpdating, setIsUpdating] = useState(false);
// //   const [showConfirmDialog, setShowConfirmDialog] = useState<{
// //     [id: string]: boolean;
// //   }>({});
// //   const cartArray: CartType[] = useAppSelector((state) => state.cart.cart);

// //   const updateQuantity = (id: string, newQuantity: number) => {
// //     if (newQuantity < 1 || newQuantity > 20) return;
// //     const updatedCart = cartArray.map((item) =>
// //       item.id === id ? { ...item, quantity: newQuantity } : item
// //     );
// //     dispatch(updateCart(updatedCart));
// //   };

// //   const removeItem = (id: string) => {
// //     setIsDeleting(true);
// //     setTimeout(() => {
// //       const updatedCart = cartArray.filter((item: CartType) => item.id !== id);
// //       dispatch(updateCart(updatedCart));
// //       setIsDeleting(false);
// //     }, 2000);
// //   };

// //   const calculateTotal = () => {
// //     const total = cartArray.reduce(
// //       (total, item) => total + item.price * item.quantity,
// //       0
// //     );
// //     return total;
// //   };

// //   const handleCheckout = () => {
// //     setIsUpdating(true);
// //     dispatch(updateCart(cartArray));
// //     setTimeout(() => {
// //       router.push("/cart/checkout");
// //       setIsUpdating(false);
// //     }, 1000);
// //   };

// //   return (
// //     <div className="container mx-auto px-4 min-h-[100vh]">
// //       <BreadCrumb />
// //       {cartArray.length === 0 ? (
// //         <div className="flex flex-col items-center">
// //           <div className=" w-[200px] h-[200px] md:w-[350px] md:h-[350px] relative">
// //             <Image
// //               src={emptyCart}
// //               alt="empty cart"
// //               fill={true}
// //               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
// //               className=" object-contain rounded-xl"
// //             />
// //           </div>
// //           <p className="text-gray-600 mb-8">
// //             Chưa có sản phẩm nào trong giỏ hàng hết bạn ơi !
// //           </p>
// //           <Button onClick={() => router.push("/iphone")}>
// //             Tiếp tục mua sắm nhé!
// //           </Button>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="space-y-4">
// //             {cartArray.map((item) => (
// //               <Card key={item.id}>
// //                 <CardContent className="flex flex-col md:flex-row justify-between gap-3 items-center p-4">
// //                   <div className="flex items-center justify-between">
// //                     <div className="relative h-24 w-24 flex-shrink-0">
// //                       <Image
// //                         src={item.image}
// //                         alt={item.name}
// //                         fill
// //                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
// //                         className="object-contain rounded-md"
// //                       />
// //                     </div>
// //                     <div className="ml-4 flex-grow">
// //                       <h3 className="font-semibold">{item.name}</h3>
// //                       <p className="text-gray-600">
// //                         {item.price.toLocaleString()} VND
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <Button
// //                         variant="outline"
// //                         size="icon"
// //                         onClick={() =>
// //                           updateQuantity(item.id, item.quantity - 1)
// //                         }
// //                         disabled={item.quantity === 1}
// //                       >
// //                         <Minus className={`h-4 w-4 `} />
// //                       </Button>
// //                       <Input
// //                         type="number"
// //                         min="1"
// //                         max="20"
// //                         value={item.quantity}
// //                         onChange={(e) =>
// //                           updateQuantity(
// //                             item.id,
// //                             Math.min(parseInt(e.target.value), 20)
// //                           )
// //                         }
// //                         className="text-xs w-10 md:w-16 text-center"
// //                       />
// //                       <Button
// //                         variant="outline"
// //                         size="icon"
// //                         disabled={item.quantity === 20}
// //                         onClick={() =>
// //                           updateQuantity(item.id, item.quantity + 1)
// //                         }
// //                       >
// //                         <Plus className="h-4 w-4" />
// //                       </Button>
// //                     </div>
// //                     <div className="ml-4 text-right flex items-center">
// //                       <p className="font-semibold text-xs md:text-base">
// //                         {(item.price * item.quantity).toLocaleString()} VND
// //                       </p>
// //                       <AlertDialog
// //                         open={!!showConfirmDialog[item.id]}
// //                         onOpenChange={(open) => {
// //                           setShowConfirmDialog((prev) => ({
// //                             ...prev,
// //                             [item.id]: open,
// //                           }));
// //                         }}
// //                       >
// //                         <AlertDialogTrigger asChild>
// //                           <Button
// //                             variant="ghost"
// //                             size="sm"
// //                             className="text-red-500 hover:text-red-700 cursor-pointer"
// //                           >
// //                             <Trash2 className="h-4 w-4" />
// //                           </Button>
// //                         </AlertDialogTrigger>
// //                         <AlertDialogContent>
// //                           <AlertDialogHeader>
// //                             <AlertDialogTitle>
// //                               Xác nhận xóa sản phẩm khỏi giỏ hàng
// //                             </AlertDialogTitle>
// //                             <AlertDialogDescription>
// //                               Bạn có chắc chắn muốn xóa khỏi giỏ hàng không?
// //                             </AlertDialogDescription>
// //                           </AlertDialogHeader>
// //                           <AlertDialogFooter>
// //                             <Button
// //                               variant="secondary"
// //                               onClick={() =>
// //                                 setShowConfirmDialog((prev) => ({
// //                                   ...prev,
// //                                   [item.id]: false,
// //                                 }))
// //                               }
// //                               disabled={isDeleting || isUpdating}
// //                             >
// //                               Hủy
// //                             </Button>
// //                             <Button
// //                               onClick={() => removeItem(item.id)}
// //                               className="text-white"
// //                               disabled={isDeleting || isUpdating}
// //                             >
// //                               {isDeleting ? (
// //                                 <LoaderCircle className="animate-spin" />
// //                               ) : (
// //                                 "Xác nhận"
// //                               )}
// //                             </Button>
// //                           </AlertDialogFooter>
// //                         </AlertDialogContent>
// //                       </AlertDialog>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //           <div className="mt-8 flex justify-between items-center">
// //             <div>
// //               <p className="text-sm md:text-lg font-semibold">Tổng đơn hàng:</p>
// //               <p className="text-sm md:text-2xl font-bold">
// //                 {calculateTotal().toLocaleString()} VND
// //               </p>
// //             </div>
// //             <Button size="lg" onClick={handleCheckout} disabled={isUpdating}>
// //               {isUpdating ? (
// //                 <>
// //                   <LoaderCircle className="animate-spin" />{" "}
// //                   <div>Chờ tí nhé...</div>
// //                 </>
// //               ) : (
// //                 "Tiến hành thanh toán"
// //               )}
// //             </Button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// //#endregion
