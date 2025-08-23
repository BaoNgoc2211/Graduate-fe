"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchMedicineProps {
  onSearch: (searchParams: { name?: string; indication?: string }) => void;
  onClear: () => void;
  isSearching?: boolean;
}

const SearchMedicine: React.FC<SearchMedicineProps> = ({
  onSearch,
  onClear,
  isSearching = false,
}) => {
  const [name, setName] = useState<string>("");
  const [indication, setIndication] = useState<string>("");

  const handleSearch = (): void => {
    if (name.trim() || indication.trim()) {
      onSearch({
        name: name.trim() || undefined,
        indication: indication.trim() || undefined,
      });
    }
  };

  const handleClear = (): void => {
    setName("");
    setIndication("");
    onClear();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isDisabled = isSearching || (!name.trim() && !indication.trim());

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-2xl text-md  font-semibold text-center text-blue-900 mb-4">
        Tìm kiếm thuốc
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="medicine-name"
            className="block text-md font-bold text-blue-900 mb-2"
          >
            Mời bạn nhập tên thuốc
          </label>
          <input
            id="medicine-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tên thuốc..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSearching}
          />
        </div>

        <div>
          <label
            htmlFor="medicine-indication"
            className="block text-md font-bold text-blue-900 mb-2"
          >
            Bạn đang cảm thấy triệu chứng gì?
          </label>
          <input
            id="medicine-indication"
            type="text"
            value={indication}
            onChange={(e) => setIndication(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập công dụng thuốc..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSearching}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            disabled={isDisabled}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Search size={16} />
            {isSearching ? "Đang tìm..." : "Tìm kiếm"}
          </button>

          <button
            onClick={handleClear}
            disabled={isSearching}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <X size={16} />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchMedicine;
