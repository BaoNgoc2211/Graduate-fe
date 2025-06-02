"use client";
import Image from "next/image";
import { IMedicine } from "@/interface/medicine/medicine.interface";
const MedicineDetail: React.FC<Partial<IMedicine>> = ({
  name,
  thumbnail,
  image,
  packaging,
  dosageForm,
}) => {
  return (
    <div className="px-5 py-5 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Hình ảnh thuốc */}
        <div className="flex-1 space-y-4">
          <div className="border rounded-xl overflow-hidden shadow-sm p-2">
            <Image
              src={thumbnail ?? "/images/default-thumbnail.jpg"}
              alt={name || "Medicine thumbnail"}
              width={250}
              height={250}
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
                src="/star_icon.png"
                alt="rating"
                width={16}
                height={16}
              />
            ))}
            <span className="text-gray-500 text-sm">(chưa có đánh giá)</span>
            <p>||</p>
            <span className="text-gray-500 text-sm">Kho:10  </span>
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
      {/* <div className="mt-10 border-t pt-6">
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
      </div> */}
    </div>
  );
};
export default MedicineDetail;
