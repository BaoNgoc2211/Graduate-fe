import Link from "next/link";
import { assets } from "../../../public/assets";
import Image from "next/image";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <Image
            src={assets.logoMedicine}
            alt="Logo Medicine"
            width={80}
            height={80}
          />

          <p className="w-full md:w-2/3 text-gray-600">
            {" "}
            Sức khỏe của bạn là sứ mệnh của chúng tôi — với hệ thống bán thuốc
            thông minh, tiện lợi và an toàn, chúng tôi cam kết mang đến sản phẩm
            chất lượng, thông tin rõ ràng, hỗ trợ tận tâm và trải nghiệm mua
            thuốc trực tuyến đáng tin cậy mọi lúc, mọi nơi
          </p>
        </div>

        <div className="flex flex-col ">
          <div className="mb-5">
            {" "}
            <p className="text-xl mb-5 text-[#00416A] font-bold">
              Theo dõi chúng tôi
            </p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>
                <Link href="/" className="flex flex-row">
                  <Image
                    src={assets.logoFacebook}
                    alt="Logo Facebook"
                    width={30}
                    height={20}
                    className="justify-between"
                  />
                  <p className="ml-3">Facebook</p>
                </Link>
              </li>
              <li>
                <Link href="/" className="flex flex-row">
                  <Image
                    src={assets.logoFacebook}
                    alt="Logo ZaLo"
                    width={30}
                    height={20}
                    className="justify-between"
                  />
                  <p className="ml-3">ZaLo</p>
                </Link>
              </li>
              <li>
                <Link href="/" className="flex flex-row ">
                  <Image
                    src={assets.logo_youtube}
                    alt="Logo Youtube"
                    width={20}
                    height={20}
                    className="justify-between"
                  />
                  <p className="ml-5">Youtube</p>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xl mb-5 text-[#00416A] font-bold">
              Hỗ trợ thanh toán
            </p>
            <ul className="flex flex-row gap-1 text-gray-600">
              <li>
                <Link href="/" className="flex flex-row">
                  <Image
                    src={assets.logo_vnpay}
                    alt="Logo VN Pay"
                    width={30}
                    height={20}
                    className="justify-between"
                  />
                </Link>
              </li>
              <li>
                <Link href="/" className="flex flex-row">
                  <Image
                    src={assets.logoMoMo}
                    alt="Logo MoMo"
                    width={30}
                    height={20}
                    className="justify-between ml-5"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" ">
          {" "}
          <p className="text-xl mb-5  text-[#00416A] font-bold">
            Tổng đài liên hệ
          </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>(+89) 0123 456 789</li>
            <li>MediGo@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="px-3 py-2 ">
        <hr />
        <ul className=" flex flex-row justify-center text-[#1850a3] ">
          <li className="">Trang Chủ</li>
          <li className="ml-5">Thông Tin Tra Cứu Thuốc</li>
          <li className="ml-5">Thông Tin Tra Cứu Bệnh</li>
        </ul>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
