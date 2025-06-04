const CancelConfirmModal = ({ orderId, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-2 text-center">Xác nhận hủy đơn</h2>
      <p className="text-center">Bạn có chắc muốn hủy đơn hàng <strong>{orderId}</strong> không?</p>
      <div className="flex justify-center gap-4 mt-5">
        <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={onClose}>Đóng</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Xác nhận</button>
      </div>
    </div>
  </div>
);

export default CancelConfirmModal;
