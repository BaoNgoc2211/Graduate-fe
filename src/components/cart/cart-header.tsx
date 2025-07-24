"use client"

import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartHeaderProps {
  itemCount: number
  onClearCart: () => void
  isClearing: boolean
}

export default function CartHeader({ itemCount, onClearCart, isClearing }: CartHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Title */}
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-blue-900" />
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            {itemCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {/* Clear Cart Button */}
          {itemCount > 0 && (
            <Button
              variant="outline"
              onClick={onClearCart}
              disabled={isClearing}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
            >
              {isClearing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2" />
                  Clearing...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
