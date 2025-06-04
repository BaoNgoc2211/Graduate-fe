const tabs = ['Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao', 'Hoàn thành', 'Đã hủy'];

const TabHeader = ({ activeTab, setActiveTab }) => (
  <div className="flex space-x-4 border-b font-semibold mb-4">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`pb-2 hover:text-[#ef4b2c] hover:border-b-2 hover:border-[#ef4b2c] ${
          activeTab === tab ? 'border-b-2 border-red-500 text-[#ef4b2c]' : ''
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabHeader;
