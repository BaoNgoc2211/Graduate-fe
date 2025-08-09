"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Calendar,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useOrderById } from "@/hooks/order/order-management";
import { ORDER_STATUSES } from "@/interface/order/order-management.interface";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const { data: order, isLoading, error, refetch } = useOrderById(id);

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

  const handleTrackOrder = () => {
    if (order?.trackingNumber) {
      // In production, this would open tracking page or external tracking site
      window.open(
        `https://tracking.example.com/${order.trackingNumber}`,
        "_blank"
      );
    }
  };

  const statusInfo = order ? ORDER_STATUSES.find((s) => s.value === order.status) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/order-management">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            <span className="ml-3 text-gray-600">
              Đang tải thông tin đơn hàng...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/order-management">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Không thể tải thông tin đơn hàng: {error.message}
              <Button
                variant="link"
                size="sm"
                onClick={() => refetch()}
                className="ml-2 p-0 h-auto text-red-600 underline"
              >
                Thử lại
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/order-management">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy đơn hàng
            </h3>
            <p className="text-gray-500 mb-4">
              Đơn hàng với ID #{id} không tồn tại hoặc đã bị xóa
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/order-management">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-blue-900" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Chi tiết đơn hàng #{order._id}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Làm mới
              </Button>
              {order.trackingNumber && (
                <Button
                  onClick={handleTrackOrder}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Theo dõi đơn hàng
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status & Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Thông tin đơn hàng</span>
                  {statusInfo && (
                    <Badge className={`${statusInfo.color} border-0 font-medium`}>
                      {statusInfo.label}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Ngày đặt:</span>
                      <span className="font-medium">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Thanh toán:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Vận chuyển:</span>
                      <span className="font-medium">{order.shippingMethod}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {order.estimatedDelivery && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Dự kiến giao:</span>
                        <span className="font-medium">{formatDate(order.estimatedDelivery)}</span>
                      </div>
                    )}
                    {order.deliveredDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Đã giao:</span>
                        <span className="font-medium text-green-600">{formatDate(order.deliveredDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-medium">
                      Mã vận đơn: {order.trackingNumber}
                    </p>
                  </div>
                )}

                {order.status === "Cancelled" && order.cancelReason && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-800 font-medium mb-1">
                      Lý do hủy: {order.cancelReason}
                    </p>
                    {order.cancelledDate && (
                      <p className="text-xs text-red-600">
                        Ngày hủy: {formatDate(order.cancelledDate)}
                      </p>
                    )}
                  </div>
                )}

                {order.notes && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Ghi chú:</p>
                    <p className="text-sm text-gray-700">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Sản phẩm đã đặt ({order.orderItems.length} sản phẩm)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={item._id || `item-${index}`}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src={item.medicine_id.thumbnail || "/placeholder.svg"}
                        alt={item.medicine_id.name}
                        className="w-16 h-16 object-cover rounded-lg border flex-shrink-0"
                        width={64}
                        height={64}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {item.medicine_id.name}
                        </h4>
                        {item.medicine_id.code && (
                          <p className="text-sm text-gray-500 mb-1">
                            Mã sản phẩm: {item.medicine_id.code}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mb-2">
                          Dạng bào chế: {item.medicine_id.dosageForm}
                        </p>
                        {item.note && (
                          <p className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Ghi chú: {item.note}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-medium text-lg">
                          {formatCurrency(item.price)}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                          Số lượng: {item.quantity}
                        </p>
                        <p className="font-semibold text-blue-600">
                          {formatCurrency(item.totalAmount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Customer Info */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Thông tin người nhận
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium">
                    {order.shippingAddress.name || order.user_id.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span>
                    {order.shippingAddress.phone || order.user_id.phone}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    {order.shippingAddress.address ? (
                      <>
                        <p className="break-words">{order.shippingAddress.address}</p>
                        {(order.shippingAddress.ward || order.shippingAddress.district || order.shippingAddress.city) && (
                          <p className="text-sm text-gray-600 mt-1">
                            {[
                              order.shippingAddress.ward,
                              order.shippingAddress.district,
                              order.shippingAddress.city
                            ].filter(Boolean).join(', ')}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="break-words">{order.user_id.address}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền hàng:</span>
                    <span className="font-medium">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-blue-600">
                      {order.shippingFee === 0
                        ? "Miễn phí"
                        : formatCurrency(order.shippingFee)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="font-medium text-green-600">
                        -{formatCurrency(order.discount)}
                      </span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Tổng thanh toán:
                  </span>
                  <span className="text-2xl font-bold text-blue-900">
                    {formatCurrency(order.finalAmount)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}