import React from 'react';

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

interface VoucherListProps {
  vouchers: Voucher[];
  onSelect: (voucher: Voucher) => void;
}

const VoucherList: React.FC<VoucherListProps> = ({ vouchers, onSelect }) => {
  return (
    <div>
      {vouchers.map((voucher) => (
        <div
          key={voucher._id}
          onClick={() => onSelect(voucher)}
          style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc' }}
        >
          <div>{voucher.name} ({voucher.code})</div>
          <div>{voucher.description}</div>
          <div>
            {voucher.discountType === 'percentage'
              ? `Giảm ${voucher.discountValue}% (Tối đa ${voucher.maxDiscountValue.toLocaleString()}đ)`
              : `Giảm ${voucher.discountValue.toLocaleString()}đ`}
          </div>
          <div>Đơn tối thiểu: {voucher.minOrderValue.toLocaleString()}đ</div>
        </div>
      ))}
    </div>
  );
};

export default VoucherList;