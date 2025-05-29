import Title from "@/components/ui/title";
import { ShopContext } from "@/context/ShopContext";
import React, { useContext } from "react";


const CartTotal = () => {
  const shippingDiscount = 32000;
  const voucherDiscount = 10000;
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)!;
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        {shippingDiscount ? (
          <div className="flex justify-between text-green-500">
            <p>Voucher Shipping Fee</p>
            <p>
              -{currency}
              {shippingDiscount}.00
            </p>
          </div>
        ) : null}
        {voucherDiscount ? (
          <div className="flex justify-between text-green-500">
            <p>Voucher Fee</p>
            <p>
              -{currency}
              {voucherDiscount}.00
            </p>
          </div>
        ) : null}
        <div className="flex justify-between">
          <p>Voucher Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
