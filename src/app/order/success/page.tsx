"use client"

import { CheckCircle, Package, Home, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleViewOrders = () => {
    window.location.href = "/orders"
  }

  const handleContinueShopping = () => {
    window.location.href = "/medicine"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card className="text-center shadow-lg">
          <CardContent className="p-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng và giao hàng trong thời gian sớm nhất.
            </p>

            {/* Order Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Thông tin đơn hàng</span>
              </div>
              <p className="text-sm text-blue-700">Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleViewOrders} className="w-full bg-blue-900 hover:bg-blue-800">
                <FileText className="h-4 w-4 mr-2" />
                Xem đơn hàng của tôi
              </Button>

              <Button onClick={handleContinueShopping} variant="outline" className="w-full bg-transparent">
                <Package className="h-4 w-4 mr-2" />
                Tiếp tục mua sắm
              </Button>

              <Button onClick={handleGoHome} variant="ghost" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
