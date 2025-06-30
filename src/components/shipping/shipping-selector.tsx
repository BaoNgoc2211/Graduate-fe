// "use client"

// import { useEffect } from "react"
// import { Loader2, AlertCircle, Truck } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// // import { useShippingMethods } from "@/hooks/useShipping"
// // import ShippingMethodCard from "./ShippingMethodCard"
// // import type { IShipping } from "@/interface/shipping/shipping.interface"

// interface ShippingSelectorProps {
//   selectedShippingId: string
//   onShippingSelect: (shippingId: string) => void
//   orderValue?: number
//   destination?: string
//   weight?: number
//   className?: string
// }

// export default function ShippingSelector({
//   selectedShippingId,
//   onShippingSelect,
//   orderValue = 0,
//   destination,
//   weight = 1,
//   className = "",
// }: ShippingSelectorProps) {
//   const { data: shippingMethods, isLoading, error, refetch } = useShippingMethods()

//   // Filter shipping methods based on criteria
//   const availableShippingMethods =
//     shippingMethods?.filter((shipping: IShipping) => {
//       // Check weight limit
//       if (shipping.maxWeight && weight > shipping.maxWeight) return false

//       // Check coverage (simplified)
//       if (destination && !shipping.coverage.includes("Toàn quốc")) {
//         const coverageMatch = shipping.coverage.some((area) => destination.toLowerCase().includes(area.toLowerCase()))
//         if (!coverageMatch) return false
//       }

//       return true
//     }) || []

//   // Auto-select first available method if none selected
//   useEffect(() => {
//     if (availableShippingMethods.length > 0 && !selectedShippingId) {
//       // Prioritize free shipping if eligible
//       const freeShipping = availableShippingMethods.find(
//         (s) => s.price === 0 && (!s.minOrderValue || orderValue >= s.minOrderValue),
//       )

//       if (freeShipping) {
//         onShippingSelect(freeShipping._id!)
//       } else {
//         onShippingSelect(availableShippingMethods[0]._id!)
//       }
//     }
//   }, [availableShippingMethods, selectedShippingId, onShippingSelect, orderValue])

//   if (isLoading) {
//     return (
//       <Card className={className}>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Truck className="h-5 w-5 mr-2" />
//             Phương thức vận chuyển
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-center py-8">
//             <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
//             <span className="text-gray-600">Đang tải phương thức vận chuyển...</span>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (error) {
//     return (
//       <Card className={className}>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Truck className="h-5 w-5 mr-2" />
//             Phương thức vận chuyển
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-8">
//             <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//             <p className="text-red-600 mb-4">Không thể tải phương thức vận chuyển</p>
//             <Button variant="outline" onClick={() => refetch()} className="text-blue-600 border-blue-600">
//               Thử lại
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (availableShippingMethods.length === 0) {
//     return (
//       <Card className={className}>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Truck className="h-5 w-5 mr-2" />
//             Phương thức vận chuyển
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-8">
//             <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">Không có phương thức vận chuyển phù hợp</p>
//             <p className="text-sm text-gray-400 mt-2">
//               Vui lòng kiểm tra lại địa chỉ giao hàng hoặc trọng lượng đơn hàng
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card className={className}>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Truck className="h-5 w-5 mr-2" />
//           Phương thức vận chuyển
//         </CardTitle>
//         <p className="text-sm text-gray-600 mt-1">Chọn phương thức giao hàng phù hợp với bạn</p>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           {availableShippingMethods.map((shipping) => (
//             <ShippingMethodCard
//               key={shipping._id}
//               shipping={shipping}
//               isSelected={selectedShippingId === shipping._id}
//               onSelect={onShippingSelect}
//               orderValue={orderValue}
//             />
//           ))}
//         </div>

//         {/* Summary */}
//         <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//           <p className="text-sm text-blue-800">
//             💡 <strong>Mẹo:</strong> Đơn hàng từ 1.000.000đ được miễn phí vận chuyển toàn quốc
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
