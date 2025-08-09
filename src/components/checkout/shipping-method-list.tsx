"use client";

import { useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShippingMethods } from "@/hooks/shipping.hooks";
import { IShipping } from "@/interface/shipping.interface";
import { formatPrice } from "@/lib/format-price";

interface ShippingMethodListProps {
  selectedShipping?: string;
  onShippingChange?: (shippingId: string) => void;
}

export default function ShippingMethodList({
  selectedShipping,
  onShippingChange,
}: ShippingMethodListProps) {
  const { data, isLoading, error } = useShippingMethods();
  console.log(data);

  console.log("ShippingMethodList - Raw data:", data);
  console.log("ShippingMethodList - Selected shipping:", selectedShipping);
  console.log("CheckoutReviewPage - selectedShipping:", selectedShipping);
  // Wrap shippingMethods in useMemo to fix the warning
  const shippingMethods = useMemo(() => {
    const methods = data?.data || [];
    console.log("ShippingMethodList - Processed methods:", methods);
    return methods;
  }, [data?.data]);

  // Set mặc định shipping đầu tiên nếu chưa có selection
  useEffect(() => {
    if (shippingMethods.length > 0 && !selectedShipping && onShippingChange) {
      const firstActiveMethod = shippingMethods.find(
        (method: IShipping) => method.isActive
      );
      console.log(
        "ShippingMethodList - First active method:",
        firstActiveMethod
      );
      if (firstActiveMethod?._id) {
        onShippingChange(firstActiveMethod._id);
      }
    }
  }, [shippingMethods, selectedShipping, onShippingChange]);

  const handleShippingSelect = (methodId: string) => {
    console.log("ShippingMethodList - Method selected:", methodId);
    if (onShippingChange) {
      onShippingChange(methodId);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">
          Đang tải phương thức giao hàng...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Không thể tải phương thức giao hàng.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 underline mt-2"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (shippingMethods.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">
          Không có phương thức giao hàng khả dụng.
        </p>
      </div>
    );
  }

  const activeShippingMethods = shippingMethods.filter(
    (method: IShipping) => method.isActive
  );
  console.log("ShippingMethodList - Active methods:", activeShippingMethods);

  return (
    <div className="space-y-3">
      {activeShippingMethods.map((method: IShipping) => (
        <label
          key={method._id}
          htmlFor={`shipping-${method._id}`}
          className={`block cursor-pointer`}
        >
          <Card
            className={`border-2 transition-all duration-200 hover:shadow-md ${
              selectedShipping === method._id
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id={`shipping-${method._id}`}
                    name="shipping-method"
                    value={method._id}
                    checked={selectedShipping === method._id}
                    onChange={() => handleShippingSelect(method._id!)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      {method.icon && (
                        <span className="text-lg">{method.icon}</span>
                      )}
                      <p className="font-semibold text-gray-900">
                        {method.type}
                      </p>
                    </div>
                    {method.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {method.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {method.estimatedDays && (
                        <Badge variant="outline" className="text-xs">
                          {method.estimatedDays}
                        </Badge>
                      )}
                      {method.features && method.features.length > 0 && (
                        <div className="flex gap-1">
                          {method.features.slice(0, 2).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-blue-900">
                      {method.price === 0
                        ? "Miễn phí"
                        : formatPrice(method.price)}
                    </span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Giao hàng
                    </Badge>
                  </div>
                  {method.minOrderValue && method.minOrderValue > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Tối thiểu: {formatPrice(method.minOrderValue)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </label>
      ))}
    </div>
  );
}
