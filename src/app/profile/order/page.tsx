"use client";
import { getAllOrders } from "@/api/order/order.api";
import OrderTabs from "@/app/order/components/layout/ordertabs";
import { Order, OrderStatus } from "@/styles/order";
import React, { useEffect, useState } from "react";
// import OrderTabs from "./components/layout/ordertabs";

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
