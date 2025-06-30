"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Trash2, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type {
  ICartItem,
  ICheckoutData,
  ICheckoutItem,
} from "@/interface/order/cart.interface";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCarts, useClearCart } from "@/hooks/order/cart.hooks";
import CartSummary from "@/components/cart/cart-summary";
import CartItemCard from "@/components/cart/cart-item-card";

export default function CartPage() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  // Lấy dữ liệu giỏ hàng
  const { data: cartData, isLoading } = useCarts();
  const cartItems = cartData?.data?.[0]?.medicine_item || [];

  // Hook xóa toàn bộ giỏ hàng
  const clearCartMutation = useClearCart();

  // Tính toán tổng tiền cho các sản phẩm được chọn
  const checkoutData: ICheckoutData = useMemo(() => {
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.has(item.medicine_id._id)
    );

    const items: ICheckoutItem[] = selectedCartItems.map((item) => {
      const sellingPrice = item.medicine_id.stock_id?.sellingPrice || 0;
      return {
        medicine_id: item.medicine_id._id,
        name: item.medicine_id.name,
        price: sellingPrice,
        thumbnail: item.medicine_id.thumbnail,
        packaging: item.medicine_id.code, // Sử dụng code thay vì packaging
        quantity: item.quantity,
        totalPrice: sellingPrice * item.quantity,
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    return {
      items,
      totalAmount,
      selectedCount: selectedCartItems.length,
    };
  }, [cartItems, selectedItems]);

  /**
   * Xử lý chọn/bỏ chọn sản phẩm
   */
  const handleSelectItem = (medicineId: string, checked: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    if (checked) {
      newSelectedItems.add(medicineId);
    } else {
      newSelectedItems.delete(medicineId);
    }
    setSelectedItems(newSelectedItems);
  };

  /**
   * Chọn/b�� chọn tất cả
   */
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(cartItems.map((item) => item.medicine_id._id));
      setSelectedItems(allIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  /**
   * Xử lý xóa toàn bộ giỏ hàng
   */
  const handleClearCart = () => {
    clearCartMutation.mutate(undefined, {
      onSuccess: () => {
        setSelectedItems(new Set());
        setIsClearDialogOpen(false);
      },
    });
  };

  /**
   * Xử lý thanh toán
   */
  const handleCheckout = () => {
    if (checkoutData.selectedCount === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }

    // Lưu dữ liệu checkout vào localStorage để sử dụng ở trang checkout
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // Chuyển đến trang checkout (SỬA LẠI TỪ /medicine THÀNH /checkout)
    window.location.href = "/checkout";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải giỏ hàng...</p>
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
              <ShoppingCart className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">
                Giỏ hàng của bạn
              </h1>
              {cartItems.length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {cartItems.length} sản phẩm
                </span>
              )}
            </div>
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setIsClearDialogOpen(true)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa toàn bộ
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Giỏ hàng trống
              </h3>
              <p className="text-gray-500 mb-6">
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </p>
              <Button
                onClick={() => (window.location.href = "/medicine")}
                className="bg-blue-900 hover:bg-blue-800"
              >
                Tiếp tục mua sắm
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Select All */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.size === cartItems.length &&
                          cartItems.length > 0
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Chọn tất cả ({cartItems.length} sản phẩm)
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Đã chọn: {selectedItems.size}/{cartItems.length}
                    </span>
                  </div>
                </CardHeader>
              </Card>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item: ICartItem) => (
                  <CartItemCard
                    key={item.medicine_id._id}
                    item={item}
                    isSelected={selectedItems.has(item.medicine_id._id)}
                    onSelect={handleSelectItem}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CartSummary
                  checkoutData={checkoutData}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Dialog */}
      <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa toàn bộ giỏ hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa toàn bộ {cartItems.length} sản phẩm
              trong giỏ hàng? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsClearDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearCart}
              disabled={clearCartMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {clearCartMutation.isPending ? "Đang xóa..." : "Xóa toàn bộ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
