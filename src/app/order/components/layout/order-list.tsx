// import { IOrder } from "@/interface/order/order.interface";
// import OrderItem from "./OrderItem";

// const OrderList = ({
//   orders,
//   activeTab,
//   onShowDetail,
//   onOpenDetailModal,
//   onOpenCancelModal,
// }) => {
//   const filteredOrders = orders.filter((order) => order.status === activeTab);

//   if (filteredOrders.length === 0) {
//     return <p className="text-gray-500">Không có đơn hàng nào.</p>;
//   }

//   return (
//     <>
//       {filteredOrders.map((item: IOrder) => (
//         <OrderItem
//           key={_id}
//           order={order}
//           activeTab={activeTab}
//           onShowDetail={onShowDetail}
//           onOpenDetailModal={onOpenDetailModal}
//           onOpenCancelModal={onOpenCancelModal}
//         />
//       ))}
//     </>
//   );
// };

// export default OrderList;
// src/components/order/OrderList.tsx
import React from "react";
import { IOrder } from "@/interface/order/order.interface";
import OrderItem from "./order-item";

interface Props {
  orders: IOrder[];
  activeTab: string;
  onShowDetail: (order: IOrder) => void;
  onOpenDetailModal: () => void;
  onOpenCancelModal: () => void;
}

const OrderList: React.FC<Props> = ({
  orders,
  activeTab,
  onShowDetail,
  onOpenDetailModal,
  onOpenCancelModal,
}) => {
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  if (filteredOrders.length === 0) {
    return <p className="text-gray-500">Không có đơn hàng nào.</p>;
  }

  return (
    <>
      {filteredOrders.map((order) => (
        <OrderItem
          key={order._id}
          order={order}
          activeTab={activeTab}
          onShowDetail={onShowDetail}
          onOpenDetailModal={onOpenDetailModal}
          onOpenCancelModal={onOpenCancelModal}
        />
      ))}
    </>
  );
};

export default OrderList;
