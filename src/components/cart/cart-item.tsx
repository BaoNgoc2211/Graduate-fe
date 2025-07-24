"use client";

import type React from "react";

import { useState } from "react";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ICartItem } from "@/interface/order/cart.interface";
import { useRemoveCart, useUpdateCart } from "@/hooks/order/cart.hooks";
import Image from "next/image";
import { formatPrice } from "@/lib/format-price";

interface CartItemProps {
  item: ICartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCartMutation = useUpdateCart();
  const removeCartMutation = useRemoveCart();

  const { medicine_id } = item;
  const sellingPrice = medicine_id.stock_id?.sellingPrice || 0;
  const totalPrice = sellingPrice * quantity;

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (newQuantity > 999) {
      toast.error("Quantity cannot exceed 999");
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
      setQuantity(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIncrease = () => {
    handleUpdateQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleUpdateQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1;
    if (value !== quantity) {
      handleUpdateQuantity(value);
    }
  };

  const handleRemove = () => {
    removeCartMutation.mutate(medicine_id._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={medicine_id.thumbnail || "/placeholder.svg?height=80&width=80"}
            alt={medicine_id.name}
            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
            width={80}
            height={80}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Name and Code */}
            <div className="flex-1">
              <h3
                className="text-lg font-semibold text-gray-900 truncate"
                title={medicine_id.name}
              >
                {medicine_id.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Code: {medicine_id.code}
              </p>
              <p className="text-lg font-bold text-blue-900 mt-2">
                {formatPrice(sellingPrice)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecrease}
                  disabled={quantity <= 1 || isUpdating}
                  className="h-10 w-10 p-0 hover:bg-gray-100"
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
                  className="w-16 h-10 text-center border-0 focus:ring-0"
                />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleIncrease}
                  disabled={quantity >= 999 || isUpdating}
                  className="h-10 w-10 p-0 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {isUpdating && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-900" />
              )}
            </div>

            {/* Price and Remove */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(totalPrice)}
                </p>
                <p className="text-sm text-gray-500">Total</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={removeCartMutation.isPending}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
              >
                {removeCartMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
