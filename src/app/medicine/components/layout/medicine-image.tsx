"use client";
import Image from "next/image";
import { useState } from "react";

interface MedicineImageProps {
  name?: string;
  thumbnail?: string;
  image?: string[];
}

const MedicineImage: React.FC<MedicineImageProps> = ({
  name,
  thumbnail,
  image,
}) => {
  const [activeImage, setActiveImage] = useState(thumbnail);
  return (
    // flex-1 space-y-4
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      {/* border rounded-xl overflow-hidden shadow-sm p-2 */}
      <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-md p-2 hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-square w-full">
          {" "}
          <Image
            src={thumbnail ?? "/images/default-thumbnail.jpg"}
            alt={name || "Medicine thumbnail"}
            width={100}
            height={10}
            //
            // w-full h-auto object-contain rounded-2xl
            className=" object-contain w-full h-auto"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {image && image.length > 0 ? (
          image.map((img, index) => (
            // <div
            //   key={index}
            //   className="w-20 h-20 border rounded overflow-hidden"
            // >
            //   <Image
            //     src={img}
            //     alt={`thumb-${index}`}
            //     width={80}
            //     height={80}
            //     className="object-cover w-full h-full cursor-pointer hover:opacity-80"
            //   />
            // </div>
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              aria-label={`Xem hình ảnh ${index + 1}`}
              // className={`border rounded-lg overflow-hidden w-20 h-20 shrink-0 ${
              //   activeImage === img ? "ring-2 ring-primary" : "hover:shadow"
              // } transition-all duration-200`}
              className={`border border-gray-200 rounded-lg overflow-hidden w-20 h-20 shrink-0 ${
                activeImage === img ? "ring-2 ring-primary" : "hover:shadow"
              } transition-all duration-200`}
            >
              <Image
                src={img}
                alt={`${name} - phụ ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">
            Không có hình ảnh bổ sung.
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicineImage;
