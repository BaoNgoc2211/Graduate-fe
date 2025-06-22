"use client";
import { useRef } from "react";

export const AvatarUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-1/4">
      <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center text-white text-4xl mb-4">
        <span>👤</span>
      </div>
      <input
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={handleUploadClick}
        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
      >
        Cập nhật ảnh mới
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Dung lượng file tối đa 5 MB.
        <br />
        Định dạng: .JPEG, .PNG
      </p>
    </div>
  );
};
