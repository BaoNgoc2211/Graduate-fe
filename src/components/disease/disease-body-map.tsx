import { BodyPart } from "@/mock/disease";
import Image from "next/image";
import { useState } from "react";

export const positions: Record<BodyPart, { top: string; left: string }> = {
  HEAD: { top: "6%", left: "48.5%" },
  NECK: { top: "16.4%", left: "48.5%" },
  CHEST: { top: "26%", left: "45%" },
  ABDOMEN: { top: "39%", left: "49%" },
  GENITAL: { top: "47%", left: "49%" },
  LIMBS: { top: "72%", left: "55.5%" },
  SKIN: { top: "56%", left: "43%" },
};

// Popup component
function DevelopmentPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl border">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tính năng đang phát triển
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Chức năng này hiện đang được phát triển và sẽ sớm ra mắt trong phiên
            bản tiếp theo.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BodyMap({
  onSelect,
  selectedPart,
}: {
  onSelect: (part: BodyPart) => void;
  selectedPart: BodyPart;
}) {
  const [showPopup, setShowPopup] = useState(false);

  const handleBodyPartClick = (part: BodyPart) => {
    // Vẫn gọi onSelect để maintain existing functionality
    onSelect(part);
    // Hiển thị popup thông báo
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="relative w-[200px] sm:w-[300px] md:w-[400px] lg:w-[600px] bg-white rounded-xl shadow-lg p-2 mx-auto">
        <Image
          src="/image/body.png"
          alt="Cơ thể người"
          width={400}
          height={700}
          className="w-full h-full"
        />
        {Object.entries(positions).map(([part, pos]) => (
          <button
            key={part}
            className="absolute z-10 hover:scale-110 transition-transform"
            style={{ top: pos.top, left: pos.left }}
            onClick={() => handleBodyPartClick(part as BodyPart)}
          >
            <div
              className={`p-2 md:w-6 md:h-6 rounded-full border border-blue-900 text-blue-900 ${
                selectedPart === part ? "bg-blue-600" : "bg-blue-300"
              } opacity-70 hover:opacity-90 transition-opacity`}
            ></div>
          </button>
        ))}
      </div>

      <DevelopmentPopup isOpen={showPopup} onClose={handleClosePopup} />
    </>
  );
}
