// "use client";
// import Filter from "@/components/filter/filter";
// import { IMedicine } from "@/interface/medicine/medicine.interface";
// import { useState } from "react";
// import TitleFilter from "@/components/filter/title-filter";
// import Button from "@/components/ui/button-01";
// import MedicineItem from "./components/layout/medicine-item";
// import Medicine01 from "./components/ui/medicine-01";
// import Medicine02 from "./components/ui/medicine-02";
// import Title from "@/components/ui/title";
// import { useGetAllMedicine } from "@/hooks/medicine/medicine.hooks";

// interface Props {
//   usageGroupId?: string;
// }

// const MedicinePage: React.FC<Props> = () => {
//   const [setType] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 20;
  
//   // Sử dụng custom hook
//   const { data, isLoading, isError, error } = useGetAllMedicine(currentPage, pageSize);
  
//   console.log("Medicine data:", data);
  
//   if (isLoading) return <div>Đang tải...</div>;
//   if (isError) return <div>Lỗi khi tải dữ liệu: {error?.message}</div>;
//   if (!data?.data?.data || data.data.data.length === 0) {
//     return <div>Không có dữ liệu thuốc</div>;
//   }

//   const handleLoadMore = () => {
//     if (currentPage < data.data.totalPages) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col mb-5">
//         <Medicine01 />
//       </div>
//       <div className="flex flex-col mb-5">
//         <Medicine02 />
//       </div>
//       <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 pt-10 lg:px-10 xl:px-20 items-center">
//         <aside className="w-full lg:w-1/6">
//           <TitleFilter title="Bộ lọc" />
//           <Filter
//             titleFilter="Khoảng giá"
//             value="type"
//             onChange={() => setType}
//             filterDetail_01="Dưới 100.000 đ"
//             filterDetail_02="100.000 đ - 300.000 đ"
//             filterDetail_03="300.000 đ - 500.000 đ"
//             filterDetail_04="Trên 500.000 đ"
//           />
//           <Filter
//             titleFilter="Thương hiệu"
//             value="type"
//             onChange={() => setType}
//             filterDetail_01="Panadol"
//             filterDetail_02="Decolgen"
//             filterDetail_03="Paracetamol"
//             filterDetail_04="Efferalgan"
//           />
//         </aside>
//         <main className="w-full lg:flex-1">
//           <div className="flex items-center justify-between mb-4">
//             <Title text1="SẢN PHẨM" text2="CHÍNH HÃNG" />
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-600">
//                 Hiển thị {data.data.data.length} của {data.data.totalItems} sản phẩm
//               </span>
//               <select className="border-2 border-gray-300 text-sm px-2">
//                 <option value="relavent">Sắp xếp: Phù hợp</option>
//                 <option value="low-high">Giá: Thấp đến Cao</option>
//                 <option value="high-low">Giá: Cao đến Thấp</option>
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
//             {data.data.data.map((item: IMedicine) => (
//               <MedicineItem
//                 key={item._id}
//                 _id={item._id}
//                 name={item.name}
//                 thumbnail={item.thumbnail}
//               />
//             ))}
//           </div>

//           {currentPage < data.data.totalPages && (
//             <div className="w-2xl mt-5 justify-center">
//               <Button text="Xem thêm" onClick={handleLoadMore} />
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MedicinePage;
"use client";
import Filter from "@/components/filter/filter";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { useState } from "react";
import TitleFilter from "@/components/filter/title-filter";
import Button from "@/components/ui/button-01";
import MedicineItem from "./components/layout/medicine-item";
import Medicine01 from "./components/ui/medicine-01";
import Medicine02 from "./components/ui/medicine-02";
import Title from "@/components/ui/title";
import { useGetAllMedicine, useSearchMedicine } from "@/hooks/medicine/medicine.hooks";
import SearchMedicine from "@/components/medicine/search-medicine";

interface Props {
  usageGroupId?: string;
}

interface SearchParams {
  name?: string;
  indication?: string;
}

const MedicinePage: React.FC<Props> = () => {
  const [setType] = useState<never[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const pageSize = 20;
  
  // Hook cho danh sách tất cả thuốc
  const { 
    data: allMedicineData, 
    isLoading: isLoadingAll, 
    isError: isErrorAll, 
    error: errorAll 
  } = useGetAllMedicine(currentPage, pageSize);
  
  // Hook cho tìm kiếm thuốc
  const { 
    data: searchData, 
    isLoading: isLoadingSearch, 
    isError: isErrorSearch, 
    error: errorSearch 
  } = useSearchMedicine(
    { ...searchParams, page: currentPage, pageSize },
    isSearchMode
  );

  // Xác định data nào sẽ được sử dụng
  const data = isSearchMode ? searchData : allMedicineData;
  const isLoading = isSearchMode ? isLoadingSearch : isLoadingAll;
  const isError = isSearchMode ? isErrorSearch : isErrorAll;
  const error = isSearchMode ? errorSearch : errorAll;

  const handleSearch = (newSearchParams: SearchParams): void => {
    setSearchParams(newSearchParams);
    setIsSearchMode(true);
    setCurrentPage(1);
  };

  const handleClearSearch = (): void => {
    setSearchParams({});
    setIsSearchMode(false);
    setCurrentPage(1);
  };

  const handleLoadMore = (): void => {
    if (data && currentPage < data.data.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleFilterChange = (): void => {
    setType([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">
          Lỗi khi tải dữ liệu: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }
  
  if (!data?.data?.data || data.data.data.length === 0) {
    return (
      <div>
        <div className="flex flex-col mb-5">
          <Medicine01 />
        </div>
        <div className="flex flex-col mb-5">
          <Medicine02 />
        </div>
        <div className="pt-10 lg:px-10 xl:px-20">
          <SearchMedicine 
            onSearch={handleSearch} 
            onClear={handleClearSearch}
            isSearching={isLoading}
          />
          <div className="text-center py-10">
            <p className="text-gray-600">
              {isSearchMode ? "Không tìm thấy thuốc nào phù hợp" : "Không có dữ liệu thuốc"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col mb-5">
        <Medicine01 />
      </div>
      <div className="flex flex-col mb-5">
        <Medicine02 />
      </div>
      
      {/* Component tìm kiếm */}
      <div className="pt-10 lg:px-10 xl:px-20">
        <SearchMedicine 
          onSearch={handleSearch} 
          onClear={handleClearSearch}
          isSearching={isLoading}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 lg:px-10 xl:px-20 items-start">
        <aside className="w-full lg:w-1/6">
          <TitleFilter title="Bộ lọc" />
          <Filter
            titleFilter="Khoảng giá"
            value="type"
            onChange={handleFilterChange}
            filterDetail_01="Dưới 100.000 đ"
            filterDetail_02="100.000 đ - 300.000 đ"
            filterDetail_03="300.000 đ - 500.000 đ"
            filterDetail_04="Trên 500.000 đ"
          />
          <Filter
            titleFilter="Thương hiệu"
            value="type"
            onChange={handleFilterChange}
            filterDetail_01="Panadol"
            filterDetail_02="Decolgen"
            filterDetail_03="Paracetamol"
            filterDetail_04="Efferalgan"
          />
        </aside>
        
        <main className="w-full lg:flex-1">
          <div className="flex items-center justify-between mb-4">
            <Title 
              text1={isSearchMode ? "KÉT QUẢ" : "SẢN PHẨM"} 
              text2={isSearchMode ? "TÌM KIẾM" : "CHÍNH HÃNG"} 
            />
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Hiển thị {data.data.data.length} của {data.data.totalItems} sản phẩm
              </span>
              <select 
                className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
                defaultValue="relevant"
              >
                <option value="relevant">Sắp xếp: Phù hợp</option>
                <option value="low-high">Giá: Thấp đến Cao</option>
                <option value="high-low">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {data.data.data.map((item: IMedicine) => (
              <MedicineItem
                key={item._id}
                _id={item._id}
                name={item.name}
                thumbnail={item.thumbnail}
              />
            ))}
          </div>

          {data.data.totalPages > currentPage && (
            <div className="flex justify-center mt-8">
              <Button text="Xem thêm" onClick={handleLoadMore} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MedicinePage;