"use client";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";

interface CartSummaryProps {
  totalItems: number;
  totalAmount: number;
  onReviewOrder: () => void;
}

export default function CartSummary({
  totalItems,
  totalAmount,
  // onReviewOrder,
}: CartSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-blue-900" />
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
        </div>

        {/* Summary Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Số lượng sản phẩm({totalItems})</span>
            <span className="font-medium text-gray-900">
              {formatPrice(totalAmount)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Tổng tiền</span>
              <span className="text-2xl font-bold text-blue-900">
                {formatPrice(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Review Order Button */}
        {/* <Button
          onClick={onReviewOrder}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 text-lg"
          size="lg"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Review Order
        </Button> */}

        {/* Continue Shopping */}
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/medicine")}
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Tiếp tục mua sắm
        </Button>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {/* 🔒 Secure checkout with SSL encryption */}
            Thanh toán an toàn với MoMo và VN Pay
          </p>
        </div>
      </div>
    </div>
  );
}
//#endregion
