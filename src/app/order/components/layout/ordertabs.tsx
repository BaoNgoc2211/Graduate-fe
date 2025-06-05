import React from 'react';
import { Order, OrderStatus } from '@/styles/order';
import OrderCard from './ordercard';
// import OrderCard from './OrderCard';

interface Props {
  activeTab: OrderStatus| 'Tất cả';
  onChangeTab: (tab: OrderStatus | 'Tất cả') => void;
  orders: Order[];
}

const tabs: (OrderStatus | 'Tất cả')[] = [
  'Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Hoàn tất', 'Đã hủy'
];

const OrderTabs: React.FC<Props> = ({ activeTab, onChangeTab, orders }) => {
  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onChangeTab(tab)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            } hover:bg-blue-100`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
        {orders.length === 0 && (
          <p className="text-center text-gray-500">Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default OrderTabs;
