"use client";
import { useState } from "react";
import Button from "@/components/ui/button";
import ButtonStep from "../ui/button";

const Step01 = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <div>
        <p className="text-2xl font-bold text-blue-900">
          Kiểm Tra <span className="text-black">Triệu Chứng</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Xác định các tình trạng sức khỏe có thể xảy ra và phương pháp điều trị
          liên quan đến triệu chứng của bạn.
        </p>
        <div className="text-sm text-gray-700 mt-2 ">
          <p className={`${showMore ? "" : "line-clamp-1"} transition-all`}>
            Công cụ này không cung cấp lời khuyên y tế chuyên môn. Công cụ này
            không được sử dụng để thay thế cho lời khuyên, chẩn đoán hoặc điều
            trị từ các chuyên gia y tế. Luôn tham khảo ý kiến bác sĩ, dược sĩ
            hoặc chuyên gia y tế có chuyên môn trước khi sử dụng bất kỳ loại
            thuốc nào. Thông tin trong hệ thống có thể bao gồm thành phần hoạt
            chất, tương tác thuốc và tác dụng phụ có thể xảy ra. Luôn hỏi ý kiến
            chuyên môn nếu bạn có bất kỳ thắc mắc nào liên quan đến tình trạng
            sức khỏe của mình. Không nên bỏ qua hoặc trì hoãn việc tìm kiếm lời
            khuyên y tế chuyên nghiệp chỉ vì thông tin từ hệ thống này. Nếu bạn
            nghĩ rằng mình đang trong tình trạng khẩn cấp, hãy gọi ngay cho bác
            sĩ hoặc dịch vụ cấp cứu y tế. Hệ thống khuyến nghị thuốc này không
            thay thế cho lời khuyên y tế và không khuyến nghị hoặc quảng bá bất
            kỳ sản phẩm, dịch vụ cụ thể nào. Việc sử dụng thông tin do hệ thống
            cung cấp là hoàn toàn theo quyết định và rủi ro của bạn.
          </p>
          <button
            className="text-blue-600 mt-2 text-sm"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Ẩn bớt ▲" : "Xem thêm ▼"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="font-bold text-blue-950 text-xl mb-2">Tuổi</p>
          <input
            className="border border-blue-900 rounded-lg w-full px-3 py-2"
            type="number"
            placeholder="20"
          />
        </div>
        <div>
          <p className="font-bold text-blue-950 text-xl mb-2">Giới tính</p>
          <div className="flex space-x-4">
            <ButtonStep text="Nam" />
            <ButtonStep text="Nữ" />
          </div>
        </div>
      </div>
      <div className="pt-4">
        <Button text="Tiếp tục" />
      </div>
    </div>
  );
};
export default Step01;
