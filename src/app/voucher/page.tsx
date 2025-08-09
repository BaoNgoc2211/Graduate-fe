"use client";

import { ClientVoucherList } from "@/components/voucher/client-voucher-list";

export default function ClientVouchersPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <ClientVoucherList />
      </div>
    </div>
  );
}
