// export interface IShipping {
//   _id?: string;
//   type: string;
//   price: number;
// }
export interface IShipping {
  _id?: string
  type: string // Tên phương thức vận chuyển
  price: number // Phí vận chuyển
  description?: string // Mô tả chi tiết
  estimatedDays?: string // Thời gian giao hàng ước tính
  icon?: string // Icon cho UI
  isActive: boolean // Trạng thái hoạt động
  minOrderValue?: number // Giá trị đơn hàng tối thiểu (nếu có)
  maxWeight?: number // Trọng lượng tối đa (kg)
  coverage?: string[] // Khu vực phủ sóng
  features?: string[] // Tính năng đặc biệt
}

// Interface cho response từ API
export interface IShippingResponse {
  success: boolean
  data: IShipping[]
  message?: string
}

// Interface cho shipping calculation
export interface IShippingCalculation {
  shippingId: string
  shippingMethod: string
  shippingPrice: number
  estimatedDays: string
  totalWeight?: number
  destination?: string
}
