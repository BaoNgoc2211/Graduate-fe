import { OrderStatus } from '@/styles/order';
import React from 'react';

const statusColors: Record<OrderStatus, string> = {
  'Chờ xác nhận': 'bg-yellow-100 text-yellow-800',
  'Đã xác nhận': 'bg-blue-100 text-blue-800',
  'Đang giao': 'bg-cyan-100 text-cyan-800',
  'Hoàn tất': 'bg-green-100 text-green-800',
  'Đã hủy': 'bg-red-100 text-red-800',
};

const StatusTag: React.FC<{ status: OrderStatus }> = ({ status }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default StatusTag;
