import React from "react";

interface CartSummaryProps {
  subtotal: number;
  discount?: number;
  productDiscount?: number;
  total: number;
  itemCount: number;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  discount = 0,
  productDiscount = 0,
  total,
  itemCount,
  onCheckout,
}) => {
  
  return (
    <div className="bg-white rounded-md border border-gray-200 p-5 w-full shadow-sm hover:shadow transition">
      <div className="flex justify-between text-base mb-2">
        <span>Tạm tính</span>
        <span>{subtotal.toLocaleString()} đ</span>
      </div>
      <div className="flex justify-between text-base mb-2">
        <span>Giảm giá ưu đãi</span>
        <span>{discount ? `- ${discount.toLocaleString()} đ` : "-"}</span>
      </div>
      <div className="flex justify-between text-base mb-2">
        <span>Giảm giá sản phẩm</span>
        <span>{productDiscount ? `- ${productDiscount.toLocaleString()} đ` : "-"}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between items-end mb-3">
        <span className="text-lg font-bold text-gray-900">Tổng tiền</span>
        <span className="text-red-600 text-2xl font-bold">{total.toLocaleString()} đ</span>
      </div>
      <button
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-2 rounded mt-2 transition ${
          itemCount === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={itemCount === 0}
        onClick={onCheckout}
      >
        Mua hàng ({itemCount})
      </button>
    </div>
  );
};

export default CartSummary; 