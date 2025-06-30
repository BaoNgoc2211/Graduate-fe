import { Package } from "lucide-react"

export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">Quản lý đơn hàng</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <div className="h-8 w-12 bg-gray-300 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-300 rounded mx-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-10 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 bg-white border border-gray-200 rounded-lg p-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Content Loading */}
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            <span className="ml-3 text-gray-600">Đang tải dữ liệu đơn hàng...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
