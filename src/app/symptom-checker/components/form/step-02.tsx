"use client";
import Image from "next/image";
import { assets } from "../../../../../public/assets";
import Button from "@/components/ui/button-01";

const Step02 = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">
        Triệu chứng của bạn là gì?
      </h2>
      <label className="block">
        <span className="text-sm text-gray-700 font-medium">
          Nhập triệu chứng của bạn vào đây nè ....
        </span>
        <input
          type="text"
          placeholder="E.g., headache, fever, sore throat..."
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </label>

      <div className="bg-gray-100 rounded-md py-6 px-4 text-center text-gray-500 border border-dashed border-gray-300">
        <Image
          src={assets.duoc_lieu_while}
          alt="Không có triệu chứng"
          width={80}
          height={80}
          className="mx-auto mb-2"
        />
        <p>Không có triệu chứng</p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700 font-medium">
              Type your main symptom here
            </span>
            <input
              type="text"
              placeholder="E.g., headache, fever, sore throat..."
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>
          <div className="bg-gray-100 rounded-md py-6 px-4 text-center text-gray-500 border border-dashed border-gray-300">
            <Image
              src={assets.duoc_lieu_while}
              alt="No symptoms"
              width={80}
              height={80}
              className="mx-auto mb-2"
            />
            <p>No symptoms added</p>
          </div>
        </div> */}

      {/* Right: Body illustration (placeholder image) */}
      {/* <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <Image
              src="/assets/human-placeholder.png" // thay bằng ảnh người tĩnh
              alt="Human body"
              width={300}
              height={400}
              className="w-full h-auto object-contain"
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
                Skin
              </button>
              <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
                List
              </button>
            </div>
          </div>
        </div> */}
      {/* </div> */}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button className="w-auto px-6" text="Quay về" />
        <Button className="w-auto px-6" text="Tiếp tục" />
        {/* <Button variant="outline">Previous</Button>
        <Button>Continue</Button> */}
      </div>
    </div>
  );
};

export default Step02;
