"use client";
import CsvUpload from "@/components/csv-upload";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Disease Data</h1>
          <p className="text-gray-600 mt-2">Upload file CSV chứa dữ liệu bệnh tật</p>
        </div>
        
        <CsvUpload />
        
        {/* Instructions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Hướng dẫn sử dụng</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">1. Chuẩn bị file CSV</h3>
                <p className="text-gray-600 text-sm mt-1">
                  File CSV phải có đúng 16 cột theo thứ tự: code, name, nameDiff, image, common, riskGroup, causes, diagnosis, prevention, severityLevel, treatmentPlan, notes, status, symptomIds, diseaseCategoryIds, diseaseUsageGroupIds
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">2. Format dữ liệu</h3>
                <ul className="text-gray-600 text-sm mt-1 space-y-1">
                  <li>• <strong>riskGroup:</strong> Có thể là text mô tả, hệ thống sẽ tự động parse thành array</li>
                  <li>• <strong>symptomIds, diseaseCategoryIds, diseaseUsageGroupIds:</strong> Các ID cách nhau bởi dấu phẩy hoặc xuống dòng</li>
                  <li>• <strong>severityLevel:</strong> Text mô tả (nhẹ, nặng, v.v.) sẽ được chuẩn hóa</li>
                  <li>• <strong>status:</strong> Số (1 = active, 0 = inactive)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">3. Upload và kiểm tra</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Sau khi upload, hệ thống sẽ hiển thị số lượng record đã xử lý và các lỗi (nếu có)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}