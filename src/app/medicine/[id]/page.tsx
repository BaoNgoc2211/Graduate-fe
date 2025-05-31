// "use client";
// import Image from "next/image";
// import { assets } from "../../../../public/assets";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getMedicineAPI } from "@/api/medicine/medicine.api";
// import { useParams } from "next/navigation";
// import { IMedicine } from "@/interface/medicine/medicine.interface";

// const Medicine: React.FC<Partial<IMedicine>> = ({
//   name,
//   thumbnail,
//   image,
//   packaging,
//   dosageForm,
//   dosage,
//   use,
//   indication,
//   adverse,
//   contraindication,
//   precaution,
//   ability,
//   pregnancy,
//   drugInteractions,
//   storage,
//   age_group,
//   note,
// }) => {
//   const params = useParams();
//   const id = params?.id as string;
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["get-latest-collection", id],
//     queryFn: () => getMedicineAPI(id),
//     enabled: !!id,
//   });

//   console.log("Data", data);

//   if (isLoading) return "isLoading...";
//   if (isError) return "Fetching data error";
//   if (!data) return "No data found";

//   const [activeTab, setActiveTab] = useState([]);
//   return (
//     <div className="px-5 py-10 max-w-7xl mx-auto">
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* thumbnail, image */}
//         <div className="flex-1 space-y-4">
//           <div className="border rounded-xl overflow-hidden shadow-sm p-4">
//             <Image
//               src={thumbnail ?? "/images/default-thumbnail.jpg"}
//               alt={name ?? "Medicine thumbnail"}
//               width={500}
//               height={500}
//               className="object-contain w-full h-auto"
//             />
//           </div>
//           <div className="flex gap-3 overflow-x-auto">
//             {image.map((image, index) => (
//               <div
//                 key={index}
//                 className="w-20 h-20 border rounded overflow-hidden"
//               >
//                 <Image
//                   src={image}
//                   alt={`thumb-${index}`}
//                   width={80}
//                   height={80}
//                   className="object-cover w-full h-full cursor-pointer hover:opacity-80"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Thông tin sản phẩm */}
//         <div className="flex-1 space-y-6">
//           <h1 className="text-3xl font-semibold text-gray-800">
//             {name} {packaging}
//           </h1>
//           {/* danh gia */}
//           <div className="flex items-center gap-1">
//             {[...Array(21)].map((_, i) => (
//               <Image
//                 key={i}
//                 src={assets.start_icon}
//                 alt="rating"
//                 width={16}
//                 height={16}
//               />
//             ))}
//             <span className="text-gray-500 text-sm">
//               {/* ({product.reviews} đánh giá) */}
//               đánh giá
//             </span>
//           </div>
//           {/* gia */}
//           <p className="text-2xl text-red-600 font-bold">
//             {/* {product.price.toLocaleString()} VND */}
//             500.000 VND
//           </p>
//           {/* packaging */}
//           <div className="flex gap-2">
//             {packaging.map((packaging, index) => (
//               <button
//                 key={index}
//                 className="border px-4 py-2 rounded-lg text-sm hover:border-blue-500"
//               >
//                 {packaging}
//               </button>
//             ))}
//           </div>

//           <div>
//             <p className="mb-1">
//               <span className="font-bold text-blue-900">Quy cách:</span>{" "}
//               {packaging}
//             </p>
//             <p className="mb-1">
//               <span className="font-bold text-blue-900">Dạng bào chế:</span>{" "}
//               {dosageForm}
//             </p>
//             <p className="mb-1">
//               <span className="font-bold text-blue-900">Hãng sản xuất:</span>{" "}
//               {/* {manufacturer} */}
//               hehehe
//             </p>
//             <button className="bg-while border border-blue-900 text-blue-900 py-3 px-6 rounded-lg hover:bg-blue-900 hover:text-blue-900 transition">
//               Mua ngay
//             </button>
//             <ul className="text-sm text-gray-600 list-disc pl-5">
//               <li>100% sản phẩm chính hãng</li>
//               <li>Thanh toán khi nhận hàng</li>
//               <li>Đổi trả trong 14 ngày</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       {/* tab */}
//       <div className="mt-10 border-t pt-6">
//         <div className="flex gap-4 border-b">
//           <button
//             className={`py-2 px-4 ${
//               activeTab === "description"
//                 ? "border-b-2 border-blue-600 text-blue-900 font-bold"
//                 : ""
//             }`}
//             onClick={() => setActiveTab("description")}
//           >
//             Mô tả
//           </button>
//           <button
//             className={`py-2 px-4 ${
//               activeTab === "usage"
//                 ? "border-b-2 border-blue-600 text-blue-900 font-bold"
//                 : ""
//             }`}
//             onClick={() => setActiveTab("usage")}
//           >
//             Liều dùng & Chỉ định
//           </button>
//           <button
//             className={`py-2 px-4 ${
//               activeTab === "adverse"
//                 ? "border-b-2 border-blue-600 text-blue-900 font-bold"
//                 : ""
//             }`}
//             onClick={() => setActiveTab("adverse")}
//           >
//             Tác dụng phụ & Chống chỉ định
//           </button>
//           <button
//             className={`py-2 px-4 ${
//               activeTab === "storage"
//                 ? "border-b-2 border-blue-600 text-blue-900 font-bold"
//                 : ""
//             }`}
//             onClick={() => setActiveTab("storage")}
//           >
//             Bảo quản & Tương tác thuốc
//           </button>
//         </div>
//         <div className="mt-4 text-gray-700 text-sm space-y-3">
//           {activeTab === "description" && (
//             <>
//               <p>
//                 {note !== "Không" ? note : "Thông tin đầy đủ và chính xác."}
//               </p>
//             </>
//           )}
//           {activeTab === "usage" && (
//             <>
//               <p>
//                 <strong>Cách dùng:</strong> {use}
//               </p>
//               <p>
//                 <strong>Liều dùng:</strong> {dosage}
//               </p>

//               <p>
//                 <strong>Công dụng:</strong> {indication}
//               </p>
//             </>
//           )}
//           {activeTab === "adverse" && (
//             <>
//               <p>
//                 <strong>Tác dụng phụ:</strong> {adverse}
//               </p>
//               <p>
//                 <strong>Chống chỉ định:</strong> {contraindication}
//               </p>
//               <p>
//                 <strong>Thận trọng khi sử dụng:</strong> {precaution}
//               </p>
//               <p>
//                 <strong>Khả năng lái xe và vận hành máy móc:</strong> {ability}
//               </p>
//               <p>
//                 <strong>Thời kỳ mang thai và cho con bú:</strong>
//                 {pregnancy}
//               </p>
//               {/* <p>
//                 <strong>Tương tác thuốc:</strong> {drugInteractions}}
//               </p> */}
//             </>
//           )}
//           {activeTab === "storage" && (
//             <>
//               <p>
//                 <strong>Bảo quản:</strong> {storage}
//               </p>
//               <p>
//                 <strong>Tương tác thuốc:</strong> {drugInteractions}
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//       {/* Mô tả và đánh giá */}
//       <div className="mt-16 border-t pt-10">
//         <div className="flex gap-6 text-sm font-medium">
//           <button className="border px-5 py-3 bg-gray-100">Mô tả</button>
//           <button className="border px-5 py-3">Đánh giá</button>
//           {/* ({product.reviews}) */}
//         </div>

//         <div className="mt-6 text-gray-600 text-sm space-y-4">
//           <p>
//             Trang thương mại điện tử cho phép bạn mua bán sản phẩm mọi lúc mọi
//             nơi. Với thiết kế hiện đại, thông tin chi tiết, hình ảnh sản phẩm
//             sắc nét và nhiều tùy chọn.
//           </p>
//           <p>
//             Mỗi sản phẩm đều có trang riêng với mô tả đầy đủ, hỗ trợ nhiều
//             phương thức thanh toán và giao hàng nhanh chóng.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Medicine;
"use client";
import Image from "next/image";
import { assets } from "../../../../public/assets";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMedicineAPI } from "@/api/medicine/medicine.api";
import { useParams } from "next/navigation";
import { IMedicine } from "@/interface/medicine/medicine.interface";

const Medicine: React.FC<Partial<IMedicine>> = ({
  name,
  thumbnail,
  image,
  packaging,
  dosageForm,
  dosage,
  use,
  indication,
  adverse,
  contraindication,
  precaution,
  ability,
  pregnancy,
  drugInteractions,
  storage,
  // age_group,
  note,
}) => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-latest-collection", id],
    queryFn: () => getMedicineAPI(id),
    enabled: !!id,
  });
  console.log(id);
  // const [activeTab, setActiveTab] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("description"); // khởi đầu với tab "description"

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Đã xảy ra lỗi khi lấy dữ liệu.</p>;
  if (!data) return <p>Không tìm thấy dữ liệu thuốc.</p>;

  return (
    <div className="px-5 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Hình ảnh thuốc */}
        <div className="flex-1 space-y-4">
          <div className="border rounded-xl overflow-hidden shadow-sm p-4">
            <Image
              src={thumbnail ?? "/images/default-thumbnail.jpg"}
              alt={name || "Medicine thumbnail"}
              width={500}
              height={500}
              className="object-contain w-full h-auto"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {image && image.length > 0 ? (
              image.map((img, index) => (
                <div
                  key={index}
                  className="w-20 h-20 border rounded overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`thumb-${index}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full cursor-pointer hover:opacity-80"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">
                Không có hình ảnh bổ sung.
              </p>
            )}
          </div>
        </div>

        {/* Thông tin thuốc */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            {name} {packaging}
          </h1>
          {/* Đánh giá */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={assets.start_icon}
                alt="rating"
                width={16}
                height={16}
              />
            ))}
            <span className="text-gray-500 text-sm">(chưa có đánh giá)</span>
          </div>
          {/* Giá giả định */}
          <p className="text-2xl text-red-600 font-bold">500.000 VND</p>
          {/* Quy cách đóng gói */}
          {/* <div className="flex gap-2">
            {packaging.map((pkg, index) => (
              <button
                key={index}
                className="border px-4 py-2 rounded-lg text-sm hover:border-blue-500"
              >
                {pkg}
              </button>
            ))}
          </div> */}

          {/* Thông tin thêm */}
          <div>
            <p className="mb-1">
              <span className="font-bold text-blue-900">Quy cách:</span>{" "}
              {packaging}
            </p>
            <p className="mb-1">
              <span className="font-bold text-blue-900">Dạng bào chế:</span>{" "}
              {dosageForm}
            </p>
            <p className="mb-4">
              <span className="font-bold text-blue-900">Hãng sản xuất:</span>{" "}
              (đang cập nhật)
            </p>
            <button className="bg-white border border-blue-900 text-blue-900 py-3 px-6 rounded-lg hover:bg-blue-900 hover:text-white transition">
              Mua ngay
            </button>
            <ul className="text-sm text-gray-600 list-disc pl-5 mt-3">
              <li>100% sản phẩm chính hãng</li>
              <li>Thanh toán khi nhận hàng</li>
              <li>Đổi trả trong 14 ngày</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 border-t pt-6">
        <div className="flex gap-4 border-b">
          {[
            { key: "description", label: "Mô tả" },
            { key: "usage", label: "Liều dùng & Chỉ định" },
            { key: "adverse", label: "Tác dụng phụ & Chống chỉ định" },
            { key: "storage", label: "Bảo quản & Tương tác thuốc" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`py-2 px-4 ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-900 font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 text-gray-700 text-sm space-y-3">
          {activeTab === "description" && (
            <p>
              {note && note !== "Không" ? note : "Thông tin đang cập nhật."}
            </p>
          )}
          {activeTab === "usage" && (
            <>
              <p>
                <strong>Cách dùng:</strong> {use || "Đang cập nhật."}
              </p>
              <p>
                <strong>Liều dùng:</strong> {dosage || "Đang cập nhật."}
              </p>
              <p>
                <strong>Công dụng:</strong> {indication || "Đang cập nhật."}
              </p>
            </>
          )}
          {activeTab === "adverse" && (
            <>
              <p>
                <strong>Tác dụng phụ:</strong> {adverse || "Đang cập nhật."}
              </p>
              <p>
                <strong>Chống chỉ định:</strong>{" "}
                {contraindication || "Đang cập nhật."}
              </p>
              <p>
                <strong>Thận trọng khi sử dụng:</strong>{" "}
                {precaution || "Đang cập nhật."}
              </p>
              <p>
                <strong>Khả năng lái xe và vận hành máy móc:</strong>{" "}
                {ability || "Đang cập nhật."}
              </p>
              <p>
                <strong>Thời kỳ mang thai và cho con bú:</strong>{" "}
                {pregnancy || "Đang cập nhật."}
              </p>
            </>
          )}
          {activeTab === "storage" && (
            <>
              <p>
                <strong>Bảo quản:</strong> {storage || "Đang cập nhật."}
              </p>
              <p>
                <strong>Tương tác thuốc:</strong>{" "}
                {drugInteractions || "Đang cập nhật."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Medicine;
