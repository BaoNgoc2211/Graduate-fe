import { assets } from "../../../public/assets"
import Image from "next/image"
import NewsletterBox from "@/components/layout/news-letter-box"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">CHÚNG TÔI CÓ THỂ MANG ĐẾN CHO BẠN</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Sự đổi mới trong cách tiếp cận và mua thuốc chất lượng
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Story Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2">
            <Image
              className="w-full rounded-2xl shadow-lg"
              src={assets.stethoscope || "/placeholder.svg"}
              alt="Medical equipment"
              width={600}
              height={400}
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-blue-900">
              <p className="text-gray-700 leading-relaxed text-lg">
              &quot;Chúng tôi được thành lập với sứ mệnh mang đến sự đổi mới trong cách mọi người tiếp cận và mua thuốc.
                Hành trình của chúng tôi bắt đầu từ một ý tưởng đơn giản: xây dựng một nền tảng nơi khách hàng có thể dễ
                dàng tìm kiếm, tra cứu và đặt mua thuốc chất lượng ngay tại nhà.&quot;
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <p className="text-gray-700 leading-relaxed">
              &quot;Kể từ khi ra mắt, chúng tôi đã không ngừng nỗ lực để cung cấp một danh mục thuốc đa dạng, phù hợp với
                nhiều nhu cầu sức khỏe khác nhau. Từ các loại thuốc kê đơn, thuốc không kê đơn, đến thực phẩm chức năng,
                chúng tôi cam kết mang lại lựa chọn tốt nhất từ các nhà cung cấp và thương hiệu uy tín.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-blue-900 text-white rounded-2xl p-12 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">SỨ MỆNH CỦA CHÚNG TÔI</h2>
            <div className="w-24 h-1 bg-white mx-auto rounded"></div>
          </div>
          <p className="text-xl leading-relaxed text-center max-w-4xl mx-auto text-blue-100">
            Sứ mệnh của <span className="font-bold text-white">MEDIGO</span> là truyền cảm hứng và hỗ trợ người dùng chăm
            sóc sức khỏe một cách chủ động và thông minh. Chúng tôi hướng tới việc cung cấp trải nghiệm mua thuốc an
            toàn, tiện lợi, và hiệu quả – từ việc tra cứu thông tin đến giao hàng tận nơi và hỗ trợ sử dụng thuốc đúng
            cách.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">TẠI SAO CHỌN CHÚNG TÔI</h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-900 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Đảm bảo chất lượng</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi lựa chọn và kiểm định kỹ lưỡng từng sản phẩm để đảm bảo đáp ứng tiêu chuẩn chất lượng khắt khe
                nhất.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-900 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Tiện lợi</h3>
              <p className="text-gray-600 leading-relaxed">
                Với giao diện thân thiện và quy trình đặt hàng đơn giản, việc mua thuốc chưa bao giờ dễ dàng đến thế.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-900 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Hỗ trợ khách hàng tận tâm</h3>
              <p className="text-gray-600 leading-relaxed">
                Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn trong suốt quá trình sử dụng, từ tư vấn đến giải đáp thắc
                mắc.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <NewsletterBox />
        </div>
      </div>
    </div>
  )
}

export default AboutPage
