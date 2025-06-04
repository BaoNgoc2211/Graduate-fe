import React, { useState } from "react";
import SelectedVoucher from "./selected-voucher";
import VoucherList from "./selected-list";
// import VoucherList from "./voucher-list";
interface Voucher {
  _id: string;
  code: string;
  name: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscountValue: number;
}

interface VoucherSelectionProps {
  vouchers: Voucher[]; // Nhận danh sách voucher từ props
}
const VoucherSelection: React.FC<VoucherSelectionProps> = ({ vouchers }) => {
  const [showVoucherList, setShowVoucherList] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleVoucherClick = () => {
    setShowVoucherList(!showVoucherList);
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherList(false);
  };

  return (
    <div>
      <div onClick={handleVoucherClick} style={{ cursor: "pointer" }}>
        {selectedVoucher ? (
          <SelectedVoucher voucher={selectedVoucher} />
        ) : (
          <div>MediGo Voucher</div>
        )}
      </div>

      {showVoucherList && (
        <VoucherList vouchers={vouchers} onSelect={handleSelectVoucher} />
      )}
    </div>
  );
};

export default VoucherSelection;