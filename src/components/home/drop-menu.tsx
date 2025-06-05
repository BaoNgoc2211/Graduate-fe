import Button from "./button";

const DropMenu = () => {
  return (
    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
      <div className="w-64 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        {/* Tên người dùng */}
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-base font-semibold text-gray-800">NguyenThuHigh</p>
        </div>

        {/* Danh sách menu */}
        <div className="flex flex-col text-sm text-gray-700">
          <Button title="Tài khoản" />
          <Button title="Đơn hàng" />
          {/* <Button title="Tài khoản" />
          <Button title="Tài khoản" />
          <Button title="Đăng xuất" /> */}
          {/* <button className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition">
            <span>Ví Pointer</span>
            <span className="text-lg">{">"}</span>
          </button> */}

          {/* Logout */}
          <button className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 text-red-500 transition">
            <span>Đăng xuất</span>
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropMenu;
