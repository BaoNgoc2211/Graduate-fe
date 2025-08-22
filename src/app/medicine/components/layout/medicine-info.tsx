"use client";
import Image from "next/image";

interface MedicineInfoProps {
  _id?: string;
  name?: string;
  packaging?: string;
  dosageForm?: string;
  manufacturer_id?: string;
  thumbnail?: string;
  sellingPrice: number;
  quantity: number;
}

const MedicineInfo: React.FC<MedicineInfoProps> = ({
  name,
  packaging,
  dosageForm,
  manufacturer_id,
  sellingPrice,
  quantity,
}) => {
  
  return (
    <div className="flex-1 space-y-1">
      <h1 className="text-xl font-bold text-gray-800">
        {name} {packaging}
      </h1>
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
        <span className="text-gray-500 text-sm">{quantity} </span>
      </div>
      <p className="text-2xl text-red-600 font-bold">
        {sellingPrice?.toLocaleString()}VND
      </p>
      <p className="text-gray-500 text-sm">
        Giá đã bao gồm thuế. Phí vận chuyển và các chi phí khác (nếu có) sẽ được
        thể hiện khi đặt hàng.
      </p>
      <hr className="mb-3 border-t border-gray-300" />
      <div>
        <p className="mb-1">
          <span className="font-bold text-blue-900">Quy cách:</span> {packaging}
        </p>
        <p className="mb-1">
          <span className="font-bold text-blue-900">Dạng bào chế:</span>{" "}
          {dosageForm}
        </p>
        <p className="mb-4">
          <span className="font-bold text-blue-900">Hãng sản xuất:</span>{" "}
          {manufacturer_id}
        </p>
        <ul className="text-sm text-gray-600 list-disc pl-5 mt-3">
          <li>100% sản phẩm chính hãng</li>
          <li>Thanh toán khi nhận hàng</li>
          <li>Đổi trả trong 14 ngày</li>
        </ul>
      </div>
    </div>
  );
};

export default MedicineInfo;
