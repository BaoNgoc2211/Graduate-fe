// import Title from "@/components/ui/title";
// import { ShopContext } from "@/context/ShopContext";
// import React, { useContext } from "react";
// // import Title from "./title";

// const CartTotal = () => {
//   const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)!;
//   return (
//     <div className="w-full">
//       <div className="text-2xl">
//         <Title text1={"CART"} text2={"TOTALS"} />
//       </div>
//       <div className="flex flex-col gap-2 mt-2 text-sm">
//         <div className="flex justify-between">
//           <p>Subtotal</p>
//           <p>
//             {currency}
//             {getCartAmount()}.00
//           </p>
//         </div>
//         <hr />
//         <div className="flex justify-between">
//           <p>Shipping Fee</p>
//           <p>
//             {currency}
//             {delivery_fee}.00
//           </p>
//         </div>
//         <hr />
//         <div className="flex justify-between">
//           <p>Total</p>
//           <p>
//             {currency}
//             {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartTotal;
import Title from "@/components/ui/title";
import { ShopContext } from "@/context/fakeShopProvider";
import React, { useContext } from "react";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)!;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={""} text2={"Tổng Đơn Hàng"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Tổng tiền sản phẩm</p>
          <p>
         
            {getCartAmount()}.00
            {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Phí vận chuyển</p>
          <p>
            {delivery_fee}.00
            {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Giảm giá phí vận chuyển</p>
          <p>
            {delivery_fee}.00
            {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Tổng cộng voucher giảm giá</p>
          <p>
            {delivery_fee}.00
            {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Tổng thanh toán</p>
          <p>
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
            {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
