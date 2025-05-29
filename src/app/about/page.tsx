import Title from "@/components/ui/title";
import { assets } from "../../../public/assets";
import Image from "next/image";
import NewsletterBox from "@/components/layout/news-letter-box";

const About = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="text-2xl tex-center pt-8 border-t ">
        <Title text1={"CHÚNG TÔI "} text2={"CÓ THỂ MANG ĐẾN CHO BẠN"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <Image
          className="w-full md:max-w-[450px]"
          src={assets.stethoscope}
          alt=""
          width={50}
          height={50}
        />
        <div className="flex flex-col justify-center items-center gap-6 md:w-2/4 text-gray-600">
          <p>
            &quot;Chúng tôi được thành lập với sứ mệnh mang đến sự đổi mới trong
            cách mọi người tiếp cận và mua thuốc. Hành trình của chúng tôi bắt
            đầu từ một ý tưởng đơn giản: xây dựng một nền tảng nơi khách hàng có
            thể dễ dàng tìm kiếm, tra cứu và đặt mua thuốc chất lượng ngay tại
            nhà.&quot;
          </p>
          <p>
            &quot;Kể từ khi ra mắt, chúng tôi đã không ngừng nỗ lực để cung cấp
            một danh mục thuốc đa dạng, phù hợp với nhiều nhu cầu sức khỏe khác
            nhau. Từ các loại thuốc kê đơn, thuốc không kê đơn, đến thực phẩm
            chức năng, chúng tôi cam kết mang lại lựa chọn tốt nhất từ các nhà
            cung cấp và thương hiệu uy tín.&quot;
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Sứ mệnh của <span className="text-nowrap">SNL</span> là truyền cảm
            hứng và hỗ trợ người dùng chăm sóc sức khỏe một cách chủ động và
            thông minh. Chúng tôi hướng tới việc cung cấp trải nghiệm mua thuốc
            an toàn, tiện lợi, và hiệu quả – từ việc tra cứu thông tin đến giao
            hàng tận nơi và hỗ trợ sử dụng thuốc đúng cách.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"TẠI SAO"} text2={"CHỌN CHÚNG TÔI"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Đảm bảo chất lượng:</b>
          <p className="text-gray-600">
            Chúng tôi lựa chọn và kiểm định kỹ lưỡng từng sản phẩm để đảm bảo
            đáp ứng tiêu chuẩn chất lượng khắt khe nhất.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Tiện lợi:</b>
          <p className="text-gray-600">
            Với giao diện thân thiện và quy trình đặt hàng đơn giản, việc mua
            thuốc chưa bao giờ dễ dàng đến thế.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Hỗ trợ khách hàng tận tâm:</b>
          <p className="text-gray-600">
            Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn trong suốt quá trình
            sử dụng, từ tư vấn đến giải đáp thắc mắc.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};
export default About;
