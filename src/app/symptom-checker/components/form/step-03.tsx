"use client";
import Button from "@/components/ui/button";
const Step03 = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white rounded-xl shadow-md space-x-6">
      <h2 className="text-2xl font-bold text-blue-900  mb-6">
        Các tình trạng phù hợp với triệu chứng của bạn
      </h2>
      <div className="grid gird-col-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700 font-medium">
              Nhập triệu chứng chính
            </span>
            <input
              type="text"
              placeholder="E.g., headache, fever, sore throat..."
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <span className="w-16 text-sm font-medium text-blue-900 mr-5">
              Giới tính
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Nữ"
                className="w-20 px-3 py-1 border border-none rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <button className="text-blue-600 text-sm underline">
                Cập nhật
              </button>
            </div>
            {/* <div className="w-full max-w-xs flex flex-row border border-b-4 mb-5 ">
              <div className="flex flex-row  text-center">
                <p className="w-max font-medium text-center text-blue-900 mr-5">
                  Giới tính{" "}
                </p>
                <input className="w-auto px-3 " type="text" placeholder="Nam" />
              </div>
              <div className="flex flex-row text-center">
                <p className="w-max font-medium text-center text-blue-900 mr-5">
                  Độ tuổi{" "}
                </p>
                <input type="text" placeholder="21" />
              </div>
            </div> */}
          </div>
          <div className="flex items-center justify-center">
            <span className="w-16 text-sm font-medium text-blue-900 mr-5">
              Độ tuổi
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="20"
                className="w-20 px-3 py-1 border border-none rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <button className="text-blue-600 text-sm underline">
                Cập nhật
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <span className="w-fill text-sm font-medium text-blue-900 mr-10">
              Triệu chứng của bạn
            </span>
            <div className="flex items-center gap-2">
              {/* <input
                type="text"
                placeholder="20"
                className="w-20 px-3 py-1 border border-none rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
              /> */}
              <button className="text-blue-600 text-sm underline">
                {/* <Image src={assets.cart_icon} alt="" width={5} height={5} /> */}
                Cập nhật
              </button>
            </div>
          </div>
          <Button text="Làm mới" />
        </div>
      </div>
      <div className="flex justify-between pt-6">
        <Button className="w-auto px-6" text="Quay về" />
        <Button className="w-auto px-6" text="Tiếp tục" />
      </div>
    </div>
  );
};
export default Step03;
