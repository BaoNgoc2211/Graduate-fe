// components/CsvUpload.tsx
import { useState } from "react";

interface UploadResult {
  success: boolean;
  message: string;
  totalProcessed?: number;
  errors?: string[];
  data?: Record<string, unknown>[];
}

export default function CsvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      const uploadResult: UploadResult = await response.json();
      setResult(uploadResult);

      if (uploadResult.success) {
        setFile(null); // Clear file after successful upload
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Lỗi kết nối: " + (error as Error).message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
    } else {
      alert("Vui lòng chọn file CSV");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Upload Disease Data CSV
      </h2>

      <form onSubmit={handleUpload} className="space-y-6">
        {/* Drag & Drop Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {file ? (
              <div className="text-sm text-gray-600">
                <p className="font-medium">{file.name}</p>
                <p>{formatFileSize(file.size)}</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Kéo thả file CSV vào đây
                </p>
                <p className="text-gray-500">hoặc click để chọn file</p>
                <p className="text-xs text-gray-400 mt-2">
                  Chỉ chấp nhận file .csv, tối đa 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            !file || uploading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
        >
          {uploading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang upload...
            </div>
          ) : (
            "Upload CSV"
          )}
        </button>
      </form>

      {/* Results */}
      {result && (
        <div
          className={`mt-6 p-4 rounded-md ${
            result.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {result.success ? (
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${
                  result.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.success ? "Upload thành công!" : "Upload thất bại!"}
              </h3>
              <div
                className={`mt-2 text-sm ${
                  result.success ? "text-green-700" : "text-red-700"
                }`}
              >
                <p>{result.message}</p>
                {result.totalProcessed && (
                  <p className="mt-1">
                    Đã xử lý: {result.totalProcessed} bản ghi
                  </p>
                )}
                {result.errors && result.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Lỗi:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {result.errors.slice(0, 5).map((error, index) => (
                        <li key={index} className="text-xs">
                          {error}
                        </li>
                      ))}
                      {result.errors.length > 5 && (
                        <li className="text-xs">
                          ... và {result.errors.length - 5} lỗi khác
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample Data Format */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Format CSV mẫu:
        </h3>
        <pre className="text-xs text-gray-600 overflow-x-auto">
          {`code,name,nameDiff,image,common,riskGroup,causes,diagnosis,prevention,severityLevel,treatmentPlan,notes,status,symptomIds,diseaseCategoryIds,diseaseUsageGroupIds
D001,Cảm lạnh,Cảm lạnh thông thường,image.jpg,Bệnh nhiễm trùng...,Trẻ em\\nNgười cao tuổi,Do virus...,Khám lâm sàng...,Rửa tay thường xuyên...,Nhẹ,Nghỉ ngơi và uống nước...,Ghi chú...,1,"id1,id2","categoryId","groupId"`}
        </pre>
      </div>
    </div>
  );
}
