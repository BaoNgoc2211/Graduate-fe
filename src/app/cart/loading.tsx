// export default function Loading() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
//         <p className="mt-4 text-gray-600">Đang tải giỏ hàng...</p>
//       </div>
//     </div>
//   )
// }
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
