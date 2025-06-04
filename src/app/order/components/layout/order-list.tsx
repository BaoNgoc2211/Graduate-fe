import OrderItem from './OrderItem';

const OrderList = ({ orders, activeTab, onShowDetail, onOpenDetailModal, onOpenCancelModal }) => {
  const filteredOrders = orders.filter(order => order.status === activeTab);

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
