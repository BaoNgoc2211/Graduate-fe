import { IOrder } from "@/interface/order/order.interface";

const OrderDetail: React.FC<Partial<IOrder>> = ({
  _id,
  status,
  totalAmount,
  finalAmount,
  // orderDetail,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Thông tin đơn hàng
      </h2>
      <p>Mã vận đơn: {_id}</p>
      <p>Địa chỉ:</p>
      <p>Thông tin khách hàng:</p>
      <p>Thông tin khách hàng:{totalAmount}</p>
      <p>Thông tin khách hàng:{finalAmount}</p>
      <p>Trạng thái đơn hàng: {status}</p>

      <table className="w-full text-left mt-4">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên món</th>
            <th>Hình ảnh</th>
            <th>SL</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.cart.map((item, index) => (
            <tr key={item.productId}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.image}
                  alt=""
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

      <div className="mt-4">
        <p>Tổng tiền: {order.totalPrice.toLocaleString()} VND</p>
        <p>Phí vận chuyển: {order.totalShip.toLocaleString()} VND</p>
        <p>
          Tổng thanh toán:{" "}
          {(order.totalPrice + order.totalShip).toLocaleString()} VND
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

export default OrderDetail;
