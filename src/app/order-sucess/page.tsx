// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   CheckCircle,
//   Package,
//   Truck,
//   ShoppingBag,
//   Clock,
//   Phone,
//   Mail,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import confetti from "canvas-confetti";
// import { formatPrice } from "@/lib/format-price";

// interface OrderInfo {
//   orderId: string;
//   totalAmount: number;
//   paymentMethod: string;
//   customerName?: string;
//   customerPhone?: string;
// }

// export default function OrderSuccessPage() {
//   const router = useRouter();
//   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

//   useEffect(() => {
//     // Try to get order info from various sources
//     const getOrderInfo = () => {
//       // From payment callback
//       const pendingPayment = localStorage.getItem("pendingPayment");
//       if (pendingPayment) {
//         try {
//           const payment = JSON.parse(pendingPayment);
//           return {
//             orderId: payment.orderId,
//             totalAmount: payment.amount,
//             paymentMethod: payment.paymentMethod,
//           };
//         } catch (error) {
//           console.error("Error parsing pending payment:", error);
//         }
//       }

//       // From checkout session
//       const checkoutSession = localStorage.getItem("checkoutSession");
//       const orderReview = localStorage.getItem("orderReview");
      
//       if (checkoutSession && orderReview) {
//         try {
//           const session = JSON.parse(checkoutSession);
//           const review = JSON.parse(orderReview);
//           return {
//             orderId: `ORD-${Date.now().toString().slice(-6)}`, // Generate temp order ID
//             totalAmount: session.finalAmount,
//             paymentMethod: session.paymentMethod,
//             customerName: review.userInfo?.name,
//             customerPhone: review.userInfo?.phone,
//           };
//         } catch (error) {
//           console.error("Error parsing checkout data:", error);
//         }
//       }

//       return null;
//     };

//     const info = getOrderInfo();
//     setOrderInfo(info);

//     // Trigger confetti animation
//     const duration = 3000;
//     const end = Date.now() + duration;

//     const frame = () => {
//       confetti({
//         particleCount: 2,
//         angle: 60,
//         spread: 55,
//         origin: { x: 0 },
//         colors: ["#3B82F6", "#10B981", "#F59E0B"],
//       });
//       confetti({
//         particleCount: 2,
//         angle: 120,
//         spread: 55,
//         origin: { x: 1 },
//         colors: ["#3B82F6", "#10B981", "#F59E0B"],
//       });

//       if (Date.now() < end) {
//         requestAnimationFrame(frame);
//       }
//     };
//     frame();

//     // Clean up localStorage
//     setTimeout(() => {
//       localStorage.removeItem("checkoutData");
//       localStorage.removeItem("checkoutSession");
//       localStorage.removeItem("orderReview");
//       localStorage.removeItem("pendingPayment");
//     }, 1000);
//   }, []);

//   const getPaymentMethodName = (method: string) => {
//     switch (method?.toLowerCase()) {
//       case "vnpay":
//         return "VNPay";
//       case "momo":
//         return "MoMo";
//       case "cod":
//         return "Thanh toán khi nhận hàng";
//       default:
//         return method || "Không xác định";
//     }
//   };

//   const getPaymentIcon = (method: string) => {
//     switch (method?.toLowerCase()) {
//       case "vnpay":
//         return "💳";
//       case "momo":
//         return "📱";
//       case "cod":
//         return "💵";
//       default:
//         return "💳";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center space-y-8">
//           {/* Success Icon and Message */}
//           <div className="space-y-4">
//             <div className="relative">
//               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//                 <CheckCircle className="h-16 w-16 text-green-600" />
//               </div>
//               <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <Package className="h-5 w-5 text-blue-600" />
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <h1 className="text-4xl font-bold text-gray-900">
//                 Đặt hàng thành công! 🎉
//               </h1>
//               <p className="text-xl text-gray-600">
//                 Cảm ơn bạn đã tin tướng và mua sắm tại cửa hàng của chúng tôi
//               </p>
//             </div>
//           </div>

//           {/* Order Information */}
//           {orderInfo && (
//             <Card className="border-green-200 bg-white max-w-md mx-auto">
//               <CardContent className="p-6">
//                 <h3 className="font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h3>
//                 <div className="space-y-3 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Mã đơn hàng:</span>
//                     <span className="font-medium">{orderInfo.orderId}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Tổng tiền:</span>
//                     <span className="font-bold text-green-600">
//                       {formatPrice(orderInfo.totalAmount)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Thanh toán:</span>
//                     <Badge variant="outline" className="text-blue-600">
//                       {getPaymentIcon(orderInfo.paymentMethod)} {getPaymentMethodName(orderInfo.paymentMethod)}
//                     </Badge>
//                   </div>
//                   {orderInfo.customerName && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Khách hàng:</span>
//                       <span className="font-medium">{orderInfo.customerName}</span>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Order Status Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//             <Card className="border-green-200 bg-green-50">
//               <CardContent className="p-6 text-center">
//                 <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
//                 <h3 className="font-semibold text-green-800 mb-2">
//                   Đơn hàng đã được xác nhận
//                 </h3>
//                 <p className="text-sm text-green-700">
//                   Chúng tôi đã nhận được đơn hàng của bạn
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-blue-200 bg-blue-50">
//               <CardContent className="p-6 text-center">
//                 <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//                 <h3 className="font-semibold text-blue-800 mb-2">
//                   Đang chuẩn bị hàng
//                 </h3>
//                 <p className="text-sm text-blue-700">
//                   Đơn hàng đang được đóng gói cẩn thận
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-yellow-200 bg-yellow-50">
//               <CardContent className="p-6 text-center">
//                 <Truck className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
//                 <h3 className="font-semibold text-yellow-800 mb-2">
//                   Sẽ được giao sớm
//                 </h3>
//                 <p className="text-sm text-yellow-700">
//                   Dự kiến giao hàng trong 2-3 ngày
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Next Steps */}
//           <Card className="mt-12">
//             <CardContent className="p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Bước tiếp theo là gì?
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-blue-600 font-bold">1</span>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         Kiểm tra email xác nhận
//                       </h3>
//                       <p className="text-gray-600 text-sm">
//                         Chúng tôi đã gửi email xác nhận đơn hàng với thông tin chi tiết
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-blue-600 font-bold">2</span>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         Theo dõi đơn hàng
//                       </h3>
//                       <p className="text-gray-600 text-sm">
//                         Bạn có thể theo dõi tình trạng đơn hàng trong tài khoản của mình
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-blue-600 font-bold">3</span>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         Chuẩn bị nhận hàng
//                       </h3>
//                       <p className="text-gray-600 text-sm">
//                         Đảm bảo có người nhận hàng tại địa chỉ đã cung cấp
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-blue-600 font-bold">4</span>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         Đánh giá sản phẩm
//                       </h3>
//                       <p className="text-gray-600 text-sm">
//                         Chia sẻ trải nghiệm của bạn để giúp khách hàng khác
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
//             <Button
//               onClick={() => router.push("/orders")}
//               className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3"
//             >
//               <Package className="h-5 w-5 mr-2" />
//               Xem đơn hàng của tôi
//             </Button>
            
//             <Button
//               variant="outline"
//               onClick={() => router.push("/medicine")}
//               className="border-blue-200 text-blue-900 hover:bg-blue-50 font-semibold px-8 py-3"
//             >
//               <ShoppingBag className="h-5 w-5 mr-2" />
//               Tiếp tục mua sắm
//             </Button>
            
//             <Button
//               variant="outline"
//               onClick={() => router.push("/")}
//               className="border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3"
//             >
//               <Home className="h-5 w-5 mr-2" />
//               Về trang chủ
//             </Button>
//           </div>

//           {/* Contact Support */}
//           <Card className="mt-12 border-gray-200">
//             <CardContent className="p-6">
//               <div className="text-center">
//                 <h3 className="font-semibold text-gray-900 mb-2">
//                   Cần hỗ trợ?
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Nếu bạn có bất kỳ câu hỏi nào về đơn hàng, vui lòng liên hệ với chúng tôi
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Button variant="outline" className="text-blue-600 border-blue-200">
//                     <Phone className="h-4 w-4 mr-2" />
//                     Hotline: 1900-xxx-xxx
//                   </Button>
//                   <Button variant="outline" className="text-blue-600 border-blue-200">
//                     <Mail className="h-4 w-4 mr-2" />
//                     Email: support@pharmacy.com
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Additional Information */}
//           <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//             <div className="flex items-center justify-center gap-2 text-blue-700">
//               <Clock className="h-4 w-4" />
//               <span className="text-sm">
//                 Thời gian xử lý đơn hàng: Thứ 2 - Thứ 6 (8:00 - 17:00)
//               </span>
//             </div>
//           </div>

//           {/* Order Number Display */}
//           {orderInfo && (
//             <div className="text-center mt-8">
//               <p className="text-sm text-gray-500">
//                 Mã đơn hàng: <span className="font-mono font-semibold">{orderInfo.orderId}</span>
//               </p>
//               <p className="text-xs text-gray-400 mt-1">
//                 Vui lòng lưu lại mã này để tra cứu đơn hàng
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Package,
  Truck,
  // CreditCard,
  Home,
  ShoppingBag,
  // Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#3B82F6", "#10B981", "#F59E0B"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#3B82F6", "#10B981", "#F59E0B"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Clean up localStorage
    localStorage.removeItem("checkoutData");
    localStorage.removeItem("checkoutSession");
    localStorage.removeItem("orderReview");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          {/* Success Icon and Message */}
          <div className="space-y-4">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">
                Đặt hàng thành công! 🎉
              </h1>
              <p className="text-xl text-gray-600">
                Cảm ơn bạn đã tin tướng và mua sắm tại cửa hàng của chúng tôi
              </p>
            </div>
          </div>

          {/* Order Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-green-800 mb-2">
                  Đơn hàng đã được xác nhận
                </h3>
                <p className="text-sm text-green-700">
                  Chúng tôi đã nhận được đơn hàng của bạn
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-blue-800 mb-2">
                  Đang chuẩn bị hàng
                </h3>
                <p className="text-sm text-blue-700">
                  Đơn hàng đang được đóng gói cẩn thận
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Sẽ được giao sớm
                </h3>
                <p className="text-sm text-yellow-700">
                  Dự kiến giao hàng trong 2-3 ngày
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mt-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Bước tiếp theo là gì?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Kiểm tra email xác nhận
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Chúng tôi đã gửi email xác nhận đơn hàng và hướng dẫn thanh toán
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Theo dõi đơn hàng
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Bạn có thể theo dõi tình trạng đơn hàng trong tài khoản của mình
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Chuẩn bị nhận hàng
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Đảm bảo có người nhận hàng tại địa chỉ đã cung cấp
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Đánh giá sản phẩm
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Chia sẻ trải nghiệm của bạn để giúp khách hàng khác
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              onClick={() => router.push("/orders")}
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3"
            >
              <Package className="h-5 w-5 mr-2" />
              Xem đơn hàng của tôi
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push("/medicine")}
              className="border-blue-200 text-blue-900 hover:bg-blue-50 font-semibold px-8 py-3"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Tiếp tục mua sắm
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3"
            >
              <Home className="h-5 w-5 mr-2" />
              Về trang chủ
            </Button>
          </div>

          {/* Contact Support */}
          <Card className="mt-12 border-gray-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cần hỗ trợ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Nếu bạn có bất kỳ câu hỏi nào về đơn hàng, vui lòng liên hệ với chúng tôi
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="text-blue-600 border-blue-200">
                    📞 Hotline: 1900-xxx-xxx
                  </Button>
                  <Button variant="outline" className="text-blue-600 border-blue-200">
                    📧 Email: support@pharmacy.com
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Number Display */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Mã đơn hàng: <span className="font-mono font-semibold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}