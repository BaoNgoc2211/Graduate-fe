// import { Order } from '@/styles/order';
// import React from 'react';
// import StatusTag from './statusTag';
// const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
//   return (
//     <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row justify-between">
//       <div>
//         <p className="font-semibold">Đơn: {order.id}</p>
//         <p>Khách: {order.customer}</p>
//         <p>SP: {order.product}</p>
//         <p>Địa chỉ: {order.address}</p>
//         <p>SĐT: {order.phone}</p>
//       </div>
//       <div className="text-right mt-4 md:mt-0">
//         <StatusTag status={order.status} />
//         <p className="text-lg font-semibold text-green-600 mt-2">
//           {order.price.toLocaleString()}₫
//         </p>
//         <div className="mt-2 space-x-2">
//           <button className="text-blue-600 hover:underline">Chi tiết</button>
//           <button className="text-red-600 hover:underline">Hủy</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;
import React from "react";
import { Order } from "@/styles/order"; // bạn có thể đổi lại import này theo đúng cấu trúc
import StatusTag from "./statusTag";
import Button01 from "../ui/button-01";
import Button02 from "../ui/button-02";

interface OrderCardProps {
  order: Order;
  onShowDetail: (order: Order) => void;
  onCancelOrder?: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onShowDetail,
  onCancelOrder,
}) => {
  const handleDetailClick = () => {
    onShowDetail(order);
  };

  const handleCancelClick = () => {
    if (onCancelOrder) {
      onCancelOrder(order.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg">
      <div className="space-y-1">
        <p className="font-semibold text-lg">
          Đơn hàng: <span className="text-blue-600">{order.id}</span>
        </p>
        <p>Khách hàng: {order.customer}</p>
        <p>Sản phẩm: {order.product}</p>
        <p>Địa chỉ: {order.address}</p>
        {/* <p>SĐT: {order.phone}</p> */}
      </div>

      <div className="text-right mt-4 md:mt-0 space-y-2">
        <StatusTag status={order.status} />
        <p className="text-green-600 font-semibold text-xl">
          {order.price.toLocaleString()}₫
        </p>

        <div className="flex justify-end gap-3">
          <Button01 text=" Chi tiết" onClick={handleDetailClick} />
          <Button02 text="Hủy" onClick={handleCancelClick}/>
          {/* <button
            onClick={handleDetailClick}
            className="flex flex-wrap items-center gap-2 md:flex-row text-sm text-blue-600 hover:underline hover:font-medium"
          > */}
          {/* Chi tiết
          </button> */}
          {/* <button
            onClick={handleCancelClick}
            className="border border-red-500 text-sm text-red-600 hover:underline hover:font-medium"
          >
            Hủy
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
