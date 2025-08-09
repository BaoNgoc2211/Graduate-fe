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
             Dùng thử miễn phí
          </div>
          <div className="flex items-center gap-2">
             Khuyến nghị thuốc bằng AI
          </div>
          <div className="flex items-center gap-2">
             Theo dõi lịch sử đơn thuốc
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
