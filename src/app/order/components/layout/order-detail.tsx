// import { IOrder } from "@/interface/order/order.interface";

// const OrderDetail: React.FC<Partial<IOrder>> = ({
//   _id,
//   status,
//   totalAmount,
//   shippingFee,
//   finalAmount,
//   order_id,
//   info,
//   // orderDetail,
// }) => (
//   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//     <div className="bg-white rounded-lg p-6 max-w-md w-full">
//       <h2 className="text-lg font-semibold mb-4 text-center">
//         Thông tin đơn hàng
//       </h2>
//       <p>Mã vận đơn: {_id}</p>
//       <p>Thông tin khách hàng:{totalAmount}</p>
//       <p>Thông tin khách hàng:{finalAmount}</p>
//       <p>Trạng thái đơn hàng: {status}</p>
//       <hr />
//       <p>Thông tin khách hàng:</p>
//       <p>Địa chỉ:{info?.address}</p>
//       <p>Họ và tên khách hàng:{info?.name}</p>
//       <p>Số điện thoại khách hàng:{info?.phone}</p>

//       <table className="w-full text-left mt-4">
//         <thead>
//           <tr>
//             <th>STT</th>
//             <th>Tên món</th>
//             <th>Hình ảnh</th>
//             <th>SL</th>
//             <th>Đơn giá</th>
//             <th>Thành tiền</th>
//           </tr>
//         </thead>
//         <tbody>
//           {order.cart.map((item, index) => (
//             <tr key={item.productId}>
//               <td>{index + 1}</td>
//               <td>{item.name}</td>
//               <td>
//                 <img
//                   src={item.image}
//                   alt=""
//                   className="w-12 h-10 object-cover"
//                 />
//               </td>
//               <td>{item.quantity}</td>
//               <td>{item.price.toLocaleString()} VND</td>
//               <td>{(item.price * item.quantity).toLocaleString()} VND</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-4">
//         <p>Tổng tiền: {{totalAmount}.toLocaleString()} VND</p>
//         <p>Phí vận chuyển: {{shippingFee}.toLocaleString()} VND</p>
//         <p>
//           Tổng thanh toán:{" "}
//           {({ totalAmount } + { shippingFee }).toLocaleString()} VND
//         </p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           onClick={onClose}
//         >
//           Đóng
//         </button>
//         <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           Xem lộ trình đơn hàng
//         </button>
//       </div>
//     </div>
//   </div>
// );

// export default OrderDetail;
import React from "react";
import { IOrder } from "@/interface/order/order.interface";

interface OrderDetailProps {
  order: IOrder;
  onClose: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose }) => {
  const {
    _id,
    status,
    totalAmount,
    shippingFee,
    totalVoucher,
    shippingVoucher,
    info,
    order_id,
  } = order;

  const finalAmount =
    totalAmount + shippingFee - (totalVoucher ?? 0) - (shippingVoucher ?? 0);

  // Vì order_id không phải là mảng nên tạo 1 array giả để render demo
  const cartItems = [
    {
      name: order_id.name,
      image: order_id.stock_id.medicine_id.thumbnail,
      quantity: order_id.quantity,
      price: Number(order_id.price),
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Thông tin đơn hàng
        </h2>

        <p>
          <strong>Mã đơn hàng:</strong> {_id}
        </p>
        <p>
          <strong>Trạng thái:</strong> {status}
        </p>
        <hr className="my-2" />

        <p className="font-semibold">Thông tin khách hàng:</p>
        <p>Họ tên: {info?.name}</p>
        <p>Địa chỉ: {info?.address}</p>
        <p>SĐT: {info?.phone}</p>

        <table className="w-full text-left mt-4 border">
          <thead>
            <tr className="border-b">
              <th>STT</th>
              <th>Tên thuốc</th>
              <th>Hình ảnh</th>
              <th>SL</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-10 object-cover"
                  />
                </td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()} VND</td>
                <td>{(item.price * item.quantity).toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 space-y-1">
          <p>
            <strong>Tổng tiền hàng:</strong> {totalAmount.toLocaleString()} VND
          </p>
          <p>
            <strong>Phí vận chuyển:</strong> {shippingFee.toLocaleString()} VND
          </p>
          <p>
            <strong>Giảm giá:</strong>{" "}
            {(totalVoucher + shippingVoucher).toLocaleString()} VND
          </p>
          <p className="font-semibold text-blue-600">
            Tổng thanh toán: {finalAmount.toLocaleString()} VND
          </p>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Đóng
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Xem lộ trình đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
