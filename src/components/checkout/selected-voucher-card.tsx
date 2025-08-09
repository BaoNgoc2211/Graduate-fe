"use client";

import { IVoucher } from "@/interface/voucher.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Plus, X } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

interface SelectedVoucherCardProps {
  selectedVoucher?: IVoucher | null;
  discountAmount: number;
  isLoading: boolean;
  onSelectVoucher: () => void;
  onRemoveVoucher: () => void;
}

export default function SelectedVoucherCard({
  selectedVoucher,
  discountAmount,
  isLoading,
  onSelectVoucher,
  onRemoveVoucher,
}: SelectedVoucherCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Mã giảm giá
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {selectedVoucher ? (
          <div className="flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-lg">
            <Tag className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <h3 className="font-medium text-green-800">{selectedVoucher.code}</h3>
              <p className="text-sm text-green-700">{selectedVoucher.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="text-xs border-green-300 text-green-700"
                >
                  {selectedVoucher.discountType === "PERCENTAGE"
                    ? `${selectedVoucher.discountValue}%`
                    : formatPrice(selectedVoucher.discountValue || 0)}
                </Badge>
                <p className="text-sm text-green-600 font-medium">
                  Tiết kiệm: {formatPrice(discountAmount)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemoveVoucher}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={onSelectVoucher}
            className="w-full border-dashed border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? "Đang tải..." : "Chọn mã giảm giá"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
