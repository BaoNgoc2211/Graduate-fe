"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format-price";

interface PaymentResult {
  status: 'success' | 'failed' | 'cancelled' | 'pending';
  orderId: string;
  transactionId?: string;
  amount: number;
  paymentMethod: string;
  message: string;
}

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const processPaymentCallback = async () => {
      try {
        // Get URL parameters
        const vnpayResponseCode = searchParams.get('vnp_ResponseCode');
        const vnpayTransactionNo = searchParams.get('vnp_TransactionNo');
        // const vnpayOrderInfo = searchParams.get('vnp_OrderInfo');
        // const vnpayAmount = searchParams.get('vnp_Amount');
        
        const momoResultCode = searchParams.get('resultCode');
        const momoOrderId = searchParams.get('orderId');
        const momoTransId = searchParams.get('transId');
        const momoAmount = searchParams.get('amount');

        // Get pending payment info from localStorage
        const pendingPayment = localStorage.getItem("pendingPayment");
        if (!pendingPayment) {
          throw new Error("Không tìm thấy thông tin thanh toán");
        }

        const pendingPaymentData = JSON.parse(pendingPayment);
        
        let result: PaymentResult;

        // Process VNPay response
        if (vnpayResponseCode !== null) {
          if (vnpayResponseCode === '00') {
            // VNPay success
            result = {
              status: 'success',
              orderId: pendingPaymentData.orderId,
              transactionId: vnpayTransactionNo || undefined,
              amount: pendingPaymentData.amount,
              paymentMethod: 'VNPay',
              message: 'Thanh toán thành công qua VNPay'
            };
          } else {
            // VNPay failed
            const errorMessages: { [key: string]: string } = {
              '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
              '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
              '10': 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
              '11': 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
              '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
              '13': 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).',
              '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
              '51': 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
              '65': 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
              '75': 'Ngân hàng thanh toán đang bảo trì.',
              '79': 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định.'
            };

            result = {
              status: vnpayResponseCode === '24' ? 'cancelled' : 'failed',
              orderId: pendingPaymentData.orderId,
              transactionId: vnpayTransactionNo || undefined,
              amount: pendingPaymentData.amount,
              paymentMethod: 'VNPay',
              message: errorMessages[vnpayResponseCode] || 'Giao dịch không thành công'
            };
          }
        }
        // Process MoMo response
        else if (momoResultCode !== null) {
          if (momoResultCode === '0') {
            // MoMo success
            result = {
              status: 'success',
              orderId: momoOrderId || pendingPaymentData.orderId,
              transactionId: momoTransId || undefined,
              amount: parseInt(momoAmount || '0'),
              paymentMethod: 'MoMo',
              message: 'Thanh toán thành công qua MoMo'
            };
          } else {
            // MoMo failed
            const momoErrorMessages: { [key: string]: string } = {
              '1006': 'Giao dịch bị từ chối bởi người dùng',
              '1001': 'Giao dịch thất bại do lỗi hệ thống',
              '1002': 'Giao dịch bị từ chối do thông tin không hợp lệ',
              '1003': 'Giao dịch bị từ chối do tài khoản không đủ số dư',
              '1004': 'Giao dịch bị từ chối do vượt quá hạn mức',
              '1005': 'Giao dịch bị từ chối do lỗi bảo mật'
            };

            result = {
              status: momoResultCode === '1006' ? 'cancelled' : 'failed',
              orderId: momoOrderId || pendingPaymentData.orderId,
              transactionId: momoTransId || undefined,
              amount: parseInt(momoAmount || '0'),
              paymentMethod: 'MoMo',
              message: momoErrorMessages[momoResultCode] || 'Giao dịch không thành công'
            };
          }
        }
        else {
          throw new Error("Không nhận được phản hồi từ cổng thanh toán");
        }
        setPaymentResult(result);

        if (result.status === 'success') {
          localStorage.removeItem("pendingPayment");
          localStorage.removeItem("checkoutData");
          localStorage.removeItem("checkoutSession");
          localStorage.removeItem("orderReview");
        }

      } catch  {
        console.error("Payment callback error:");
        setPaymentResult({
          status: 'failed',
          orderId: 'unknown',
          amount: 0,
          paymentMethod: 'Unknown',
          message: 'Có lỗi xảy ra khi xử lý thanh toán'
        });
      } finally {
        setIsLoading(false);
      }
    };

    processPaymentCallback();
  }, [searchParams]);

  // Auto redirect countdown for success
  useEffect(() => {
    if (paymentResult?.status === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (paymentResult?.status === 'success' && countdown === 0) {
      router.push('/order/success');
    }
  }, [paymentResult, countdown, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'failed':
        return <XCircle className="h-16 w-16 text-red-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-16 w-16 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-16 w-16 text-blue-500" />;
      default:
        return <CreditCard className="h-16 w-16 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'failed':
        return 'border-red-200 bg-red-50';
      case 'cancelled':
        return 'border-yellow-200 bg-yellow-50';
      case 'pending':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusTitle = (status: string) => {
    switch (status) {
      case 'success':
        return 'Thanh toán thành công!';
      case 'failed':
        return 'Thanh toán thất bại';
      case 'cancelled':
        return 'Thanh toán đã bị hủy';
      case 'pending':
        return 'Đang xử lý thanh toán...';
      default:
        return 'Trạng thái không xác định';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Đang xử lý kết quả thanh toán...
          </h2>
          <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Lỗi xử lý thanh toán
          </h2>
          <p className="text-gray-600 mb-6">Không thể xác định kết quả thanh toán</p>
          <Button onClick={() => router.push('/cart')}>
            Quay lại giỏ hàng
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className={`${getStatusColor(paymentResult.status)} border-2`}>
          <CardContent className="p-8 text-center">
            {/* Status Icon */}
            <div className="mb-6">
              {getStatusIcon(paymentResult.status)}
            </div>

            {/* Status Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {getStatusTitle(paymentResult.status)}
            </h1>

            {/* Status Message */}
            <p className="text-gray-600 mb-6">
              {paymentResult.message}
            </p>

            {/* Payment Details */}
            <div className="bg-white rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-medium">{paymentResult.orderId}</span>
              </div>
              
              {paymentResult.transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-medium">{paymentResult.transactionId}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức:</span>
                <Badge variant="outline">{paymentResult.paymentMethod}</Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Số tiền:</span>
                <span className="font-bold text-lg">
                  {formatPrice(paymentResult.amount)}
                </span>
              </div>
            </div>

            {/* Auto redirect message for success */}
            {paymentResult.status === 'success' && countdown > 0 && (
              <div className="mb-6 p-3 bg-green-100 rounded-lg">
                <p className="text-green-700 text-sm">
                  Sẽ tự động chuyển đến trang thành công sau {countdown} giây...
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {paymentResult.status === 'success' ? (
                <>
                  <Button
                    onClick={() => router.push('/order/success')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Xem chi tiết đơn hàng
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/medicine')}
                    className="flex-1"
                  >
                    Tiếp tục mua sắm
                  </Button>
                </>
              ) : paymentResult.status === 'cancelled' ? (
                <>
                  <Button
                    onClick={() => router.push('/checkout/final')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Thử lại thanh toán
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/cart')}
                    className="flex-1"
                  >
                    Quay lại giỏ hàng
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => router.push('/checkout/review')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Đặt hàng lại
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/cart')}
                    className="flex-1"
                  >
                    Quay lại giỏ hàng
                  </Button>
                </>
              )}
            </div>

            {/* Support Contact */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Cần hỗ trợ? Liên hệ: 
                <a href="tel:1900-xxx-xxx" className="text-blue-600 ml-1">
                  1900-xxx-xxx
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}