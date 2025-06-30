"use client";

import type React from "react";

import { useState } from "react";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useUpdateCart, useRemoveCart } from "@/hooks/useCart"
import type { ICartItem } from "@/interface/order/cart.interface";
// import { formatPrice } from "@/lib/formatPrice"
import { toast } from "sonner";
import { useRemoveCart, useUpdateCart } from "@/hooks/order/cart.hooks";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";

interface CartItemCardProps {
  item: ICartItem;
  isSelected: boolean;
  onSelect: (medicineId: string, checked: boolean) => void;
}

export default function CartItemCard({
  item,
  isSelected,
  onSelect,
}: CartItemCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  // Hooks
  const updateCartMutation = useUpdateCart();
  const removeCartMutation = useRemoveCart();

  const { medicine_id } = item;

  // Lấy giá bán từ stock_id.sellingPrice
  const sellingPrice = medicine_id.stock_id?.sellingPrice || 0;
  const lineTotal = sellingPrice * quantity;

  /**
   * Cập nhật số lượng
   */
  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Số lượng phải lớn hơn 0");
      return;
    }

    if (newQuantity > 999) {
      toast.error("Số lượng không được vượt quá 999");
      return;
    }

    setIsUpdating(true);
    setQuantity(newQuantity);

    try {
      await updateCartMutation.mutateAsync({
        medicine_id: medicine_id._id,
        quantity: newQuantity,
      });
    } catch {
      // Revert quantity on error
      setQuantity(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Tăng số lượng
   */
  const handleIncrease = () => {
    handleUpdateQuantity(quantity + 1);
  };

  /**
   * Giảm số lượng
   */
  const handleDecrease = () => {
    if (quantity > 1) {
      handleUpdateQuantity(quantity - 1);
    }
  };

  /**
   * Thay đổi số lượng từ input
   */
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1;
    if (value !== quantity) {
      handleUpdateQuantity(value);
    }
  };

  /**
   * Xóa sản phẩm
   */
  const handleRemove = () => {
    removeCartMutation.mutate({ medicine_id: medicine_id._id! });
  };

  return (
    <Card
      className={`transition-all duration-200 ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(medicine_id._id, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          {/* Product Image */}
          <div className="flex-shrink-0">
            <Image
              src={
                medicine_id.thumbnail || "/placeholder.svg?height=80&width=80"
              }
              alt={medicine_id.name}
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              width={20}
              height={20}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Name & Code */}
              <div className="lg:col-span-2">
                <h3
                  className="text-lg font-medium text-gray-900 truncate"
                  title={medicine_id.name}
                >
                  {medicine_id.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Mã: {medicine_id.code}
                </p>
                <p className="text-lg font-semibold text-blue-900 mt-2">
                  {formatPrice(sellingPrice)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">
                  Số lượng
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDecrease}
                    disabled={quantity <= 1 || isUpdating}
                    className="h-8 w-8 p-0 bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Input
                    type="number"
                    min="1"
                    max="999"
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={isUpdating}
                    className="w-16 h-8 text-center"
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleIncrease}
                    disabled={quantity >= 999 || isUpdating}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {isUpdating && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  </div>
                )}
              </div>

              {/* Total & Actions */}
              <div className="flex flex-col items-end space-y-2">
                <div className="text-right">
                  <span className="text-sm text-gray-500">Thành tiền</span>
                  <p className="text-xl font-bold text-green-600">
                    {formatPrice(lineTotal)}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={removeCartMutation.isPending}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {removeCartMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span className="ml-1">Xóa</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
