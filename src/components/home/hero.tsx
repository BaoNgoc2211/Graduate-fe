// "use client";
// // import Image from "next/image";
// // import assets from "@/assets"; // Giả định bạn đã import đường dẫn hình ảnh

// const Hero = () => {
//   return (
//     <div className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 lg:px-16 py-10 gap-8">
//       {/* Hero Left Side */}
//       <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-[#414141]">
//         {/* Logo hoặc Label */}
//         <div className="flex items-center gap-2 mb-2">
//           <p className="font-bold text-blue-900 text-sm md:text-base uppercase tracking-wide">
//             MEDIGO
//           </p>
//         </div>

//         {/* Main Heading */}
//         <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed mb-2">
//           Trải nghiệm mua thuốc
//         </h1>
//         <h2 className="prata-regular text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed text-blue-900 mb-4">
//           An Toàn Và Thông Minh
//         </h2>

//         {/* Call to Action */}
//         <div className="flex items-center gap-2 mt-2">
//           <p className="font-semibold text-sm md:text-base">MUA NGAY</p>
//           <div className="w-8 md:w-11 h-[1px] bg-[#414141]"></div>
//         </div>
//       </div>

//       {/* Hero Right Side */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center">
//         {/* <Image
//           className="w-full max-w-[400px] sm:max-w-[450px] lg:max-w-full h-auto object-contain"
//           src={assets.hero_img}
//           alt="Hero Image"
//           width={500}
//           height={500}
//           priority
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default Hero;
"use client";

const Hero = () => {
  return (
    <section className="bg-[#f9fefc] py-12 md:py-16">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center max-w-4xl">
        {/* Label */}
        <span className="inline-block bg-green-100 text-blue-600 font-semibold text-sm px-3 py-1 rounded-full mb-4">
        Hệ thống khuyến nghị thuốc thông minh sử dụng AI
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a2a4f] mb-2">
        Nâng cao chất lượng điều trị
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-4">
        cùng hệ thống bán thuốc thông minh
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-base sm:text-lg mb-6 px-4">
        Hệ thống hỗ trợ bệnh nhân và bác sĩ quản lý đơn thuốc hiệu quả, an toàn và tối ưu. Tích hợp AI để khuyến nghị thuốc phù hợp, theo dõi lịch sử sử dụng và tăng cường hiệu quả điều trị.
        </p>

        {/* CTA Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base sm:text-lg px-6 py-3 rounded-lg shadow-lg transition duration-300 mb-6">
        Khám phá ngay
        </button>

        {/* Bullet Points */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            ✅ Dùng thử miễn phí
          </div>
          <div className="flex items-center gap-2">
            ✅ Khuyến nghị thuốc bằng AI
          </div>
          <div className="flex items-center gap-2">
            ✅ Theo dõi lịch sử đơn thuốc
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
