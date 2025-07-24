"use client"

import { ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Looks like you have not added any medicines to your cart yet. Start shopping to find the products you need.
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => (window.location.href = "/medicine")}
          className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3"
          size="lg"
        >
          Start Shopping
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Need help finding products?</p>
          <p>Browse our categories or use the search function.</p>
        </div>
      </div>
    </div>
  )
}
