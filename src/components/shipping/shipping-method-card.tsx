"use client"

import { Check, Clock, MapPin, Package, Shield, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format-price"
import { IShipping } from "@/interface/order/shipping.interface"

interface ShippingMethodCardProps {
  shipping: IShipping
  isSelected: boolean
  onSelect: (shippingId: string) => void
  orderValue?: number
  disabled?: boolean
}

export default function ShippingMethodCard({
  shipping,
  isSelected,
  onSelect,
  orderValue = 0,
  disabled = false,
}: ShippingMethodCardProps) {
  const isEligible = !shipping.minOrderValue || orderValue >= shipping.minOrderValue
  const isFree = shipping.price === 0

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "truck":
        return <Truck className="h-5 w-5" />
      case "zap":
        return <Clock className="h-5 w-5" />
      case "rocket":
        return <Package className="h-5 w-5" />
      case "gift":
        return <Package className="h-5 w-5" />
      case "credit-card":
        return <Shield className="h-5 w-5" />
      default:
        return <Truck className="h-5 w-5" />
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200" : "hover:shadow-md border-gray-200"
      } ${disabled || !isEligible ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => {
        if (!disabled && isEligible) {
          onSelect(shipping._id!)
        }
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Icon */}
            <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
              {getIcon(shipping.icon || "truck")}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900">{shipping.type}</h4>
                {isFree && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    Miễn phí
                  </Badge>
                )}
                {shipping.type.includes("nhanh") && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                    Nhanh
                  </Badge>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-2">{shipping.description}</p>

              {/* Estimated time */}
              <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                <Clock className="h-4 w-4" />
                <span>{shipping.estimatedDays}</span>
              </div>

              {/* Coverage */}
              <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{shipping.coverage!.join(", ")}</span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {shipping.features!.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    {feature}
                  </Badge>
                ))}
                {shipping.features!.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    +{shipping.features!.length - 2} khác
                  </Badge>
                )}
              </div>

              {/* Min order value warning */}
              {!isEligible && shipping.minOrderValue && (
                <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                  Đơn hàng tối thiểu: {formatPrice(shipping.minOrderValue)}
                </div>
              )}
            </div>
          </div>

          {/* Price & Selection */}
          <div className="flex flex-col items-end space-y-2">
            <div className="text-right">
              <div className="text-lg font-bold text-blue-900">{isFree ? "Miễn phí" : formatPrice(shipping.price)}</div>
              {shipping.maxWeight && <div className="text-xs text-gray-500">Tối đa {shipping.maxWeight}kg</div>}
            </div>

            {isSelected && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
