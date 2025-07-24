//#region
// "use client";

// import { CreditCard, ShoppingBag, Calculator } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import type { ICheckoutData } from "@/interface/order/cart.interface";
// import { formatPrice } from "@/lib/format-price";

// interface CartSummaryProps {
//   checkoutData: ICheckoutData;
//   onCheckout: () => void;
// }

// export default function CartSummary({
//   checkoutData,
//   onCheckout,
// }: CartSummaryProps) {
//   const { items, totalAmount, selectedCount } = checkoutData;

//   return (
//     <Card className="shadow-lg">
//       <CardHeader className="bg-blue-50 border-b">
//         <CardTitle className="text-blue-900 flex items-center">
//           <Calculator className="h-5 w-5 mr-2" />
//           Tóm tắt đơn hàng
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <div className="space-y-4">
//           {/* Selected Items Count */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <ShoppingBag className="h-4 w-4 text-gray-500" />
//               <span className="text-sm text-gray-600">Sản phẩm đã chọn:</span>
//             </div>
//             <span className="font-medium">{selectedCount} sản phẩm</span>
//           </div>

//           {/* Selected Items List */}
//           {selectedCount > 0 && (
//             <div className="space-y-2">
//               <h4 className="text-sm font-medium text-gray-700">Chi tiết:</h4>
//               <div className="max-h-40 overflow-y-auto space-y-2">
//                 {items.map((item) => (
//                   <div
//                     key={item.medicine_id}
//                     className="flex justify-between items-center text-sm"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <p className="truncate font-medium" title={item.name}>
//                         {item.name}
//                       </p>
//                       <p className="text-gray-500">
//                         {formatPrice(item.price)} x {item.quantity}
//                       </p>
//                     </div>
//                     <span className="font-medium text-green-600 ml-2">
//                       {formatPrice(item.totalPrice)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <Separator />

//           {/* Total Amount */}
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600">Tạm tính:</span>
//               <span className="font-medium">{formatPrice(totalAmount)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600">Phí vận chuyển:</span>
//               <span className="font-medium text-green-600">Miễn phí</span>
//             </div>
//             <Separator />
//             <div className="flex justify-between items-center">
//               <span className="text-lg font-semibold text-gray-900">
//                 Tổng thanh toán:
//               </span>
//               <span className="text-2xl font-bold text-blue-900">
//                 {formatPrice(totalAmount)}
//               </span>
//             </div>
//           </div>

//           {/* Checkout Button */}
//           <Button
//             onClick={onCheckout} // ĐÃ ĐÚNG - gọi hàm onCheckout được truyền từ parent
//             disabled={selectedCount === 0}
//             className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
//             size="lg"
//           >
//             <CreditCard className="h-5 w-5 mr-2" />
//             {selectedCount === 0
//               ? "Chọn sản phẩm để thanh toán"
//               : `Tiến hành thanh toán (${selectedCount} sản phẩm)`}
//           </Button>

//           {/* Continue Shopping - ĐÃ ĐÚNG, GIỮ NGUYÊN */}
//           <Button
//             variant="outline"
//             onClick={() => (window.location.href = "/medicine")}
//             className="w-full"
//           >
//             Tiếp tục mua sắm
//           </Button>

//           {/* Note */}
//           {selectedCount === 0 && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//               <p className="text-sm text-yellow-800">
//                 💡 Vui lòng chọn ít nhất một sản phẩm để tiến hành thanh toán
//               </p>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
//#endregion
"use client";

import { ShoppingBag, CreditCard } from "lucide-react";
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
  onReviewOrder,
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
            <span className="text-gray-600">Items ({totalItems})</span>
            <span className="font-medium text-gray-900">
              {formatPrice(totalAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-900">
                {formatPrice(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Review Order Button */}
        <Button
          onClick={onReviewOrder}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 text-lg"
          size="lg"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Review Order
        </Button>

        {/* Continue Shopping */}
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/medicine")}
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Continue Shopping
        </Button>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure checkout with SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}
