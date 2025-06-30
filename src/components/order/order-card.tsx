"use client";

import {
  Calendar,
  MapPin,
  Phone,
  User,
  Package,
  CreditCard,
  Eye,
  X,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IOrder,
  ORDER_STATUSES,
} from "@/interface/order/order-management.interface";

interface OrderCardProps {
  order: IOrder;
  onViewDetails: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onReview?: (orderId: string) => void;
}

export default function OrderCard({
  order,
  onViewDetails,
  onCancelOrder,
  onReview,
}: OrderCardProps) {
  const statusInfo = ORDER_STATUSES.find((s) => s.value === order.status);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-blue-900" />
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  #{order._id}
                </h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
            <Badge className={`${statusInfo?.color} border-0 font-medium`}>
              {statusInfo?.label}
            </Badge>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">
                {order.shippingAddress.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">
                {order.shippingAddress.phone}
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span className="text-gray-700 text-sm">
                {order.shippingAddress.address}, {order.shippingAddress.ward},{" "}
                {order.shippingAddress.district}, {order.shippingAddress.city}
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Số sản phẩm:</span>
              <span className="font-medium">
                {order.orderItems.length} sản phẩm
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng tiền hàng:</span>
              <span className="font-medium">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Phí vận chuyển:</span>
              <span className="font-medium text-blue-600">
                {order.shippingFee === 0
                  ? "Miễn phí"
                  : formatCurrency(order.shippingFee)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Giảm giá:</span>
                <span className="font-medium text-green-600">
                  -{formatCurrency(order.discount)}
                </span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Tổng thanh toán:
              </span>
              <span className="text-xl font-bold text-blue-900">
                {formatCurrency(order.finalAmount)}
              </span>
            </div>
          </div>

          {/* Payment & Shipping Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Thanh toán:</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Vận chuyển:</span>
              <span className="font-medium">{order.shippingMethod}</span>
            </div>
          </div>

          {/* Tracking Number */}
          {order.trackingNumber && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Mã vận đơn:</strong> {order.trackingNumber}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(order._id)}
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
            >
              <Eye className="h-4 w-4 mr-2" />
              Xem chi tiết
            </Button>

            {order.status === "Pending Confirmation" && onCancelOrder && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancelOrder(order._id)}
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              >
                <X className="h-4 w-4 mr-2" />
                Hủy đơn hàng
              </Button>
            )}

            {order.status === "Completed" && !order.isReviewed && onReview && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReview(order._id)}
                className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
              >
                <Star className="h-4 w-4 mr-2" />
                Đánh giá
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
