"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IShipping } from "@/interface/shipping.interface";
import { formatPrice } from "@/lib/format-price";

interface ShippingMethodCardProps {
  method: IShipping;
  selected: boolean;
  onSelect: (methodId: string) => void;
}

export default function ShippingMethodCard({ 
  method, 
  selected, 
  onSelect 
}: ShippingMethodCardProps) {
  return (
    <label
      htmlFor={`shipping-card-${method._id}`}
      className="block cursor-pointer"
    >
      <Card
        className={`border-2 transition-all ${
          selected 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id={`shipping-card-${method._id}`}
                name="shipping-method-card"
                value={method._id}
                checked={selected}
                onChange={() => onSelect(method._id!)}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <p className="font-semibold text-gray-900">{method.type}</p>
                <p className="text-sm text-gray-500">
                  Phí vận chuyển: {formatPrice(method.price)}
                </p>
              </div>
            </div>
            <Badge className="bg-blue-900 text-white text-xs">
              Giao hàng
            </Badge>
          </div>
        </CardContent>
      </Card>
    </label>
  );
}