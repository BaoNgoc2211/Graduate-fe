import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import TabHeader from './components/TabHeader';
import OrderList from './components/OrderList';
import OrderDetailModal from './components/OrderDetailModal';
import CancelConfirmModal from './components/CancelConfirmModal';

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState('Chờ xác nhận');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  const dummyOrders = []; // Đây là chỗ render UI mock thôi

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#ff7e00]">Đơn mua</h1>
      <ToastContainer position="top-right" autoClose={3000} />

      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <OrderList
        orders={dummyOrders}
        activeTab={activeTab}
        onShowDetail={setSelectedOrder}
        onOpenDetailModal={() => setShowDetail(true)}
        onOpenCancelModal={() => setCancelModalOpen(true)}
      />

      {showDetail && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setShowDetail(false)}
        />
      )}

      {isCancelModalOpen && selectedOrder && (
        <CancelConfirmModal
          orderId={selectedOrder._id}
          onClose={() => setCancelModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderPage;
