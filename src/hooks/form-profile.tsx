import { CalendarIcon } from "lucide-react";
const FormProfile = () => {
  return (
    <div>
      {" "}
      <h1 className="text-xl font-semibold mb-6">Thông tin cá nhân</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm flex gap-10">
        {/* Ảnh đại diện */}
        <div className="flex flex-col items-center w-1/4">
          <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center text-white text-4xl mb-4">
            <span>👤</span>
          </div>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
            Cập nhật ảnh mới
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Dung lượng file tối đa 5 MB.
            <br />
            Định dạng: .JPEG, .PNG
          </p>
        </div>

        {/* Thông tin */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Họ và tên */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue="Khách hàng"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Số điện thoại
            </label>
            <p className="text-gray-700">***** ***446</p>
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Ngày sinh
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
              />
              <CalendarIcon
                className="absolute right-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="flex items-center justify-between">
              <p className="text-gray-700">chưa cập nhật</p>
              <button className="text-blue-600 text-sm flex items-center gap-1">
                Cập nhật &gt;
              </button>
            </div>
          </div>

          {/* Giới tính */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Giới tính
            </label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mật khẩu</label>
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Tạo mật khẩu</p>
              <button className="text-blue-600 text-sm flex items-center gap-1">
                Cập nhật &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Nút lưu */}
      <div className="mt-6">
        <button
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded"
          disabled
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};
export default FormProfile;
