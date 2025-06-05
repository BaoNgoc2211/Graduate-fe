// import React, { useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import TabHeader from './components/TabHeader';
// import OrderList from './components/OrderList';
// import OrderDetailModal from './components/OrderDetailModal';
// import CancelConfirmModal from './components/CancelConfirmModal';

// const OrderPage = () => {
//   const [activeTab, setActiveTab] = useState('Chờ xác nhận');
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showDetail, setShowDetail] = useState(false);
//   const [isCancelModalOpen, setCancelModalOpen] = useState(false);

//   const dummyOrders = []; // Đây là chỗ render UI mock thôi

//   return (
//     <div className="max-w-[1200px] mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4 text-[#ff7e00]">Đơn mua</h1>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
//       <OrderList
//         orders={dummyOrders}
//         activeTab={activeTab}
//         onShowDetail={setSelectedOrder}
//         onOpenDetailModal={() => setShowDetail(true)}
//         onOpenCancelModal={() => setCancelModalOpen(true)}
//       />

//       {showDetail && selectedOrder && (
//         <OrderDetailModal
//           order={selectedOrder}
//           onClose={() => setShowDetail(false)}
//         />
//       )}

//       {isCancelModalOpen && selectedOrder && (
//         <CancelConfirmModal
//           orderId={selectedOrder._id}
//           onClose={() => setCancelModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default OrderPage;
// src/pages/TestOrderUI.tsx
//#region version 01
// "use client"
// import React, { useState } from "react";
// // import OrderList from "@/components/order/OrderList";
// // import { mockOrders } from "@/mock/mockOrders";
// // import OrderDetail from "@/components/order/OrderDetail";
// // import CancelConfirmModal from "@/components/order/CancelConfirmModal";
// import { IOrder } from "@/interface/order/order.interface";
// import { mockOrders } from "@/mock/mock-order";
// import OrderList from "./components/layout/order-list";
// import OrderDetail from "./components/layout/order-detail";
// import CancelConfirmModal from "./components/layout/cancel-confirm-modal";

// const TestOrderUI = () => {
//   const [activeTab, setActiveTab] = useState("Chờ xác nhận");
//   const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         {["Chờ xác nhận", "Đã nhận đơn", "Đã hủy", "Đang giao"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 mr-2 ${
//               activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-300"
//             } rounded`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <OrderList
//         orders={mockOrders}
//         activeTab={activeTab}
//         onShowDetail={(order) => setSelectedOrder(order)}
//         onOpenDetailModal={() => setShowDetailModal(true)}
//         onOpenCancelModal={() => setShowCancelModal(true)}
//       />
//       {showDetailModal && selectedOrder && (
//         <OrderDetail
//           order={selectedOrder}
//           onClose={() => setShowDetailModal(false)}
//         />
//       )}

//       {/* {showDetailModal && selectedOrder && (
//         <OrderDetail
//           {...selectedOrder}
//           onClose={() => setShowDetailModal(false)}
//         />
//       )} */}

//       {showCancelModal && selectedOrder && (
//         <CancelConfirmModal
//           orderId={selectedOrder._id}
//           onClose={() => setShowCancelModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default TestOrderUI;
//#endregion
//#region version 03
"use client";
import { getAllOrders } from "@/api/order/order.api";
import { Order, OrderStatus } from "@/styles/order";
import React, { useEffect, useState } from "react";
import OrderTabs from "./components/layout/ordertabs";

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "Tất cả">(
    "Tất cả"
  );

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  const filteredOrders =
    statusFilter === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
      <OrderTabs
        activeTab={statusFilter}
        onChangeTab={setStatusFilter}
        orders={filteredOrders}
      />
    </div>
  );
};

export default OrderPage;

//#endregion
