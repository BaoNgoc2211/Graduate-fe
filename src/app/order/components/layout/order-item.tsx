// import { IOrder } from "@/interface/order/order.interface";

// const OrderItem: React.FC<Partial<IOrder>> = ({
//   _id,
//   status,
//   totalAmount,
//   shippingFee,
//   shippingVoucher,
//   totalVoucher,
//   finalAmount,
//   orderDate,
//   order_id,
//   info,
// }) => {
//   const handleDetail = () => {
//     onShowDetail(order);
//     onOpenDetailModal();
//   };

//   return (
//     <div className="border rounded-lg p-4 mb-4 shadow-sm">
//       <p className="font-semibold">Mã đơn hàng: {_id}</p>
//       <p>Tên người nhận: {info.name}</p>
//       <p>Địa chỉ: {info.address}</p>
//       <p>Số điện thoại: {info.phone}</p>
//       <p>
//         Giá:{" "}
//         {(
//           {totalAmount} +
//           {shippingFee} -
//           {shippingVoucher} -
//           {totalVoucher}
//         ).toLocaleString()}{" "}
//         VND
//       </p>

//       <div className="flex space-x-2 mt-2">
//         {activeTab === "Chờ xác nhận" && (
//           <>
//             <button
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               onClick={onOpenCancelModal}
//             >
//               Hủy đơn
//             </button>
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={handleDetail}
//             >
//               Xem chi tiết
//             </button>
//           </>
//         )}

//         {activeTab === "Hoàn thành" && (
//           <>
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={handleDetail}
//             >
//               Xem chi tiết
//             </button>
//             <button
//               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               disabled={order.hasRated}
//             >
//               {order.hasRated ? "Đã đánh giá" : "Đánh giá"}
//             </button>
//           </>
//         )}

//         {(activeTab === "Đã hủy" ||
//           activeTab === "Đang giao" ||
//           activeTab === "Chờ lấy hàng") && (
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={handleDetail}
//           >
//             Xem chi tiết
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderItem;
// import React from "react";
// import { IOrder } from "@/interface/order/order.interface";

// interface OrderItemProps {
//   order: IOrder;
//   activeTab: string;
//   onShowDetail: (order: IOrder) => void;
//   onOpenDetailModal: () => void;
//   onOpenCancelModal: () => void;
// }

// const OrderItem: React.FC<OrderItemProps> = ({
//   order,
//   activeTab,
//   onShowDetail,
//   onOpenDetailModal,
//   onOpenCancelModal,
// }) => {
//   const {
//     _id,
//     status,
//     totalAmount = 0,
//     shippingFee = 0,
//     shippingVoucher = 0,
//     totalVoucher = 0,
//     finalAmount,
//     orderDate,
//     order_id,
//     info = { name: "", address: "", phone: "" },
//     hasRated,
//   } = order;

//   const handleDetail = () => {
//     onShowDetail(order);
//     onOpenDetailModal();
//   };

//   return (
//     <div className="border rounded-lg p-4 mb-4 shadow-sm">
//       <p className="font-semibold">Mã đơn hàng: {_id}</p>
//       <p>Tên người nhận: {info.name}</p>
//       <p>Địa chỉ: {info.address}</p>
//       <p>Số điện thoại: {info.phone}</p>
//       <p>
//         Giá:{" "}
//         {(totalAmount + shippingFee - shippingVoucher - totalVoucher).toLocaleString()}{" "}
//         VND
//       </p>

//       <div className="flex space-x-2 mt-2">
//         {activeTab === "Chờ xác nhận" && (
//           <>
//             <button
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               onClick={onOpenCancelModal}
//             >
//               Hủy đơn
//             </button>
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={handleDetail}
//             >
//               Xem chi tiết
//             </button>
//           </>
//         )}

//         {activeTab === "Hoàn thành" && (
//           <>
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={handleDetail}
//             >
//               Xem chi tiết
//             </button>
//             <button
//               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               disabled={hasRated}
//             >
//               {hasRated ? "Đã đánh giá" : "Đánh giá"}
//             </button>
//           </>
//         )}

//         {(activeTab === "Đã hủy" ||
//           activeTab === "Đang giao" ||
//           activeTab === "Chờ lấy hàng") && (
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={han
