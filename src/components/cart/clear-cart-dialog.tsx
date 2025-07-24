"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ClearCartDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemCount: number
  isClearing: boolean
}

export default function ClearCartDialog({ isOpen, onClose, onConfirm, itemCount, isClearing }: ClearCartDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">Clear Cart</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">This action cannot be undone</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to remove all {itemCount} {itemCount === 1 ? "item" : "items"} from your cart?
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isClearing} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isClearing}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {isClearing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Clearing...
              </>
            ) : (
              "Clear Cart"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
