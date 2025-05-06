import Image from "next/image";
import { assets } from "../../../../public/assets";

const Medicine = () => {
  return (
    <>
      <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12  flex-col sm:gap-12 sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {/* {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))} */}
            </div>
            <div className="w-full sm:w-[80%]">
              <Image src={assets.stethoscope} alt="" width={20} height={20} />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2"></h1>
            <div className="flex items-center gap-1 mt-2">
              <Image src={assets.start_icon} alt="" width={5} height={5} />
              <Image src={assets.start_icon} alt="" width={5} height={5} />
              <Image src={assets.start_icon} alt="" width={5} height={5} />
              <Image src={assets.start_icon} alt="" width={5} height={5} />
              <Image src={assets.start_icon} alt="" width={5} height={5} />
              <p className="pl-2">(122)</p>
              <p className="mt-5 text-3xl font-medium">55.00 VND</p>
              <p className="mt-5 text-gray-500 md:w-4/5"></p>
              <div className="flex gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Medicine;
