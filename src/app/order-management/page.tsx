"use client";

import { useState, useMemo } from "react";
import {
  Package,
  Search,
  Filter,
  BarChart3,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ORDER_STATUSES } from "@/interface/order/order-management.interface";
import { toast } from "sonner";
import {
  useCancelOrder,
  useOrdersByStatus,
  useOrderStats,
} from "@/hooks/order/order-management";
import OrderCard from "@/components/order/order-card";
import OrderDetailsDialog from "@/components/order/order-detail-dialog";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Hooks for data fetching
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useOrdersByStatus(activeTab);

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useOrderStats();

  const cancelOrderMutation = useCancelOrder();

  // Filter orders by search term
  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    if (!searchTerm.trim()) return orders;

    const searchLower = searchTerm.toLowerCase();
    return orders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchLower) ||
        order.shippingAddress.name.toLowerCase().includes(searchLower) ||
        order.shippingAddress.phone.includes(searchTerm) ||
        order.user_id.name.toLowerCase().includes(searchLower) ||
        order.user_id.email.toLowerCase().includes(searchLower)
    );
  }, [orders, searchTerm]);

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsOpen(true);
  };

  const handleCancelOrder = (orderId: string) => {
    setCancelOrderId(orderId);
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (cancelOrderId && cancelReason.trim()) {
      cancelOrderMutation.mutate(
        { orderId: cancelOrderId, reason: cancelReason },
        {
          onSuccess: () => {
            setIsCancelDialogOpen(false);
            setCancelOrderId(null);
            setCancelReason("");
          },
        }
      );
    } else {
      toast.error("Vui lòng nhập lý do hủy đơn hàng");
    }
  };

  const handleReview = (orderId: string) => {
    // Navigate to review page or open review dialog
    console.log("Review order:", orderId);
    toast.info("Chức năng đánh giá đang được phát triển");
  };

  const handleRefresh = () => {
    refetchOrders();
    refetchStats();
    toast.success("Đã làm mới dữ liệu");
  };

  const getTabCount = (status: string) => {
    if (!stats) return 0;
    switch (status) {
      case "all":
        return stats.total;
      case "Pending Confirmation":
        return stats.pending;
      case "Awaiting Shipment":
        return stats.awaiting;
      case "Shipping":
        return stats.shipping;
      case "Completed":
        return stats.completed;
      case "Cancelled":
        return stats.cancelled;
      default:
        return 0;
    }
  };

  // Loading state for initial load
  if (ordersLoading && !orders) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <Package className="h-6 w-6 text-blue-900" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Quản lý đơn hàng
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            <span className="ml-3 text-gray-600">
              Đang tải dữ liệu đơn hàng...
            </span>
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
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">
                Quản lý đơn hàng
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={ordersLoading || statsLoading}
                className="bg-transparent"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    ordersLoading || statsLoading ? "animate-spin" : ""
                  }`}
                />
                Làm mới
              </Button>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Tổng: {statsLoading ? "..." : stats?.total || 0} đơn hàng
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alerts */}
        {(ordersError || statsError) && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {ordersError?.message ||
                statsError?.message ||
                "Có lỗi xảy ra khi tải dữ liệu"}
              <Button
                variant="link"
                size="sm"
                onClick={handleRefresh}
                className="ml-2 p-0 h-auto text-red-600 underline"
              >
                Thử lại
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-900">
                {statsLoading ? "..." : stats?.total || 0}
              </div>
              <div className="text-sm text-blue-700">Tổng đơn hàng</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-800">
                {statsLoading ? "..." : stats?.pending || 0}
              </div>
              <div className="text-sm text-yellow-700">Chờ xác nhận</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-800">
                {statsLoading ? "..." : stats?.awaiting || 0}
              </div>
              <div className="text-sm text-blue-700">Chờ giao hàng</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-800">
                {statsLoading ? "..." : stats?.shipping || 0}
              </div>
              <div className="text-sm text-purple-700">Đang giao</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-800">
                {statsLoading ? "..." : stats?.completed || 0}
              </div>
              <div className="text-sm text-green-700">Hoàn thành</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-800">
                {statsLoading ? "..." : stats?.cancelled || 0}
              </div>
              <div className="text-sm text-red-700">Đã hủy</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn hàng, tên người nhận, số điện thoại hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white border border-gray-200">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
            >
              Tất cả
              <Badge variant="secondary" className="ml-2">
                {getTabCount("all")}
              </Badge>
            </TabsTrigger>
            {ORDER_STATUSES.map((status) => (
              <TabsTrigger
                key={status.value}
                value={status.value}
                className="data-[state=active]:bg-blue-900 data-[state=active]:text-white text-xs lg:text-sm"
              >
                <span className="hidden sm:inline">{status.label}</span>
                <span className="sm:hidden">{status.label.split(" ")[0]}</span>
                <Badge variant="secondary" className="ml-1 lg:ml-2">
                  {getTabCount(status.value)}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {ordersLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                <span className="ml-3 text-gray-600">Đang tải đơn hàng...</span>
              </div>
            ) : ordersError ? (
              <Card>
                <CardContent className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Lỗi tải dữ liệu
                  </h3>
                  <p className="text-gray-500 mb-4">{ordersError.message}</p>
                  <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Thử lại
                  </Button>
                </CardContent>
              </Card>
            ) : filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có đơn hàng nào
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? "Không tìm thấy đơn hàng phù hợp với từ khóa tìm kiếm"
                      : "Chưa có đơn hàng nào được tạo"}
                  </p>
                  {searchTerm && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchTerm("")}
                      className="mt-4"
                    >
                      Xóa bộ lọc
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onViewDetails={handleViewDetails}
                    onCancelOrder={handleCancelOrder}
                    onReview={handleReview}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {ORDER_STATUSES.map((status) => (
            <TabsContent
              key={status.value}
              value={status.value}
              className="space-y-4"
            >
              {ordersLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                  <span className="ml-3 text-gray-600">
                    Đang tải đơn hàng...
                  </span>
                </div>
              ) : ordersError ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Lỗi tải dữ liệu
                    </h3>
                    <p className="text-gray-500 mb-4">{ordersError.message}</p>
                    <Button onClick={handleRefresh} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Thử lại
                    </Button>
                  </CardContent>
                </Card>
              ) : filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Không có đơn hàng {status.label.toLowerCase()}
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm
                        ? "Không tìm thấy đơn hàng phù hợp với từ khóa tìm kiếm"
                        : `Chưa có đơn hàng nào ở trạng thái ${status.label.toLowerCase()}`}
                    </p>
                    {searchTerm && (
                      <Button
                        variant="outline"
                        onClick={() => setSearchTerm("")}
                        className="mt-4"
                      >
                        Xóa bộ lọc
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                      onViewDetails={handleViewDetails}
                      onCancelOrder={handleCancelOrder}
                      onReview={handleReview}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        orderId={selectedOrderId}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedOrderId(null);
        }}
      />

      {/* Cancel Order Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hủy đơn hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn hủy đơn hàng #{cancelOrderId}? Vui lòng cho
              biết lý do hủy.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cancelReason">Lý do hủy đơn hàng</Label>
              <Textarea
                id="cancelReason"
                placeholder="Nhập lý do hủy đơn hàng..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
            >
              Không hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              disabled={cancelOrderMutation.isPending || !cancelReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancelOrderMutation.isPending ? "Đang hủy..." : "Xác nhận hủy"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
