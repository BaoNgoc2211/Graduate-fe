"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ClipboardCopy, Tag, Gift, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useVouchersValidate } from "@/hooks/voucher.hooks";

export function ClientVoucherList() {
  const { data: vouchersData, isLoading, error } = useVouchersValidate();
  const vouchers = vouchersData?.data || [];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDiscount = (discountType: string, discountValue: number) => {
    if (discountType === "PERCENTAGE") {
      return `${discountValue}%`;
    }
    return formatPrice(discountValue);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch {
      return dateString;
    }
  };

  const isVoucherExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const isVoucherExhausted = (usageLimit: number, usedCount: number) => {
    return usedCount >= usageLimit;
  };

  const getUsesLeft = (usageLimit: number, usedCount: number) => {
    return Math.max(0, usageLimit - usedCount);
  };

  const copyVoucherCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success(`Đã sao chép mã voucher: ${code}`);
      })
      .catch(() => {
        toast.error("Không thể sao chép mã voucher");
      });
  };

  const handleUseVoucher = (code: string) => {
    // This would typically apply the voucher to the cart
    toast.success(`Đã áp dụng mã voucher: ${code}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Mã giảm giá có sẵn
          </h2>
          <p className="text-gray-600">
            Sử dụng các mã giảm giá để tiết kiệm chi phí đơn hàng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Không thể tải mã giảm giá
        </h3>
        <p className="text-gray-600">Vui lòng thử lại sau</p>
      </div>
    );
  }

  if (!vouchers.length) {
    return (
      <div className="text-center py-12">
        <Gift className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Chưa có mã giảm giá
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Hiện tại chưa có mã giảm giá nào khả dụng. Hãy quay lại sau để không
          bỏ lỡ các ưu đãi hấp dẫn!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Mã giảm giá có sẵn
        </h2>
        <p className="text-gray-600">
          Sử dụng các mã giảm giá để tiết kiệm chi phí đơn hàng
        </p>
      </div>

      {/* Voucher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vouchers.map((voucher) => {
          const expired = isVoucherExpired(voucher.endDate);
          const exhausted = isVoucherExhausted(
            voucher.usageLimit,
            voucher.usedCount
          );
          const usesLeft = getUsesLeft(voucher.usageLimit, voucher.usedCount);
          const isDisabled = expired || exhausted || !voucher.isActive;

          return (
            <Card
              key={voucher._id}
              className={`border transition-all duration-200 hover:shadow-lg ${
                isDisabled
                  ? "border-gray-200 bg-gray-50 opacity-75"
                  : "border-blue-200 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle
                      className={`text-lg font-bold ${
                        isDisabled ? "text-gray-500" : "text-blue-900"
                      }`}
                    >
                      {voucher.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Tag className="h-3 w-3" />
                      <code className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded">
                        {voucher.code}
                      </code>
                    </CardDescription>
                  </div>
                  {!voucher.isActive && (
                    <Badge variant="secondary" className="text-xs">
                      Tạm dừng
                    </Badge>
                  )}
                  {expired && (
                    <Badge variant="destructive" className="text-xs">
                      Hết hạn
                    </Badge>
                  )}
                  {exhausted && !expired && (
                    <Badge variant="outline" className="text-xs">
                      Hết lượt
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Discount Value */}
                <div
                  className={`text-center p-3 rounded-lg ${
                    isDisabled ? "bg-gray-100" : "bg-blue-100"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isDisabled ? "text-gray-500" : "text-blue-900"
                    }`}
                  >
                    Giảm{" "}
                    {formatDiscount(
                      voucher.discountType,
                      voucher.discountValue
                    )}
                  </div>
                  {voucher.discountType === "PERCENTAGE" &&
                    voucher.maxDiscountValue > 0 && (
                      <div className="text-xs text-gray-600 mt-1">
                        Tối đa {formatPrice(voucher.maxDiscountValue)}
                      </div>
                    )}
                </div>

                {/* Voucher Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Đơn tối thiểu:</span>
                    <span className="font-medium">
                      {formatPrice(voucher.minOrderValue)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Còn lại:</span>
                    <span
                      className={`font-medium ${
                        usesLeft <= 5 ? "text-orange-600" : "text-green-600"
                      }`}
                    >
                      {usesLeft} lượt sử dụng
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">
                      {formatDate(voucher.startDate)} -{" "}
                      {formatDate(voucher.endDate)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {voucher.description && (
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    {voucher.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => copyVoucherCode(voucher.code)}
                    disabled={isDisabled}
                  >
                    <ClipboardCopy className="h-3 w-3 mr-1" />
                    Sao chép
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-900 hover:bg-blue-800"
                    onClick={() => handleUseVoucher(voucher.code)}
                    disabled={isDisabled}
                  >
                    Sử dụng ngay
                  </Button>
                </div>

                {/* Disabled Reason */}
                {isDisabled && (
                  <div className="text-xs text-gray-500 text-center pt-2 border-t">
                    {expired && "Voucher đã hết hạn"}
                    {exhausted && !expired && "Voucher đã hết lượt sử dụng"}
                    {!voucher.isActive &&
                      !expired &&
                      !exhausted &&
                      "Voucher tạm thời không khả dụng"}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
        <p>
          💡 Mẹo: Sao chép mã voucher và áp dụng tại trang thanh toán để được
          giảm giá
        </p>
      </div>
    </div>
  );
}
