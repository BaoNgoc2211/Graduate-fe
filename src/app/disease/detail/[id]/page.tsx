import Image from "next/image";
import { assets } from "../../../../../public/assets";
import Sidebar from "@/components/sidebar/sidebar";
import DiseaseItem from "../../components/layout/disease-item";

const DiseaseDetail = () => {
  return (
    <div><DiseaseItem/></div>
    // <div className="flex flex-row gird[1fr_1fr]">
    //   <div className="px-5">
    //     <Sidebar />
    //   </div>
    //   <div className="flex flex-col px-5">
    //     <p className="font-bold text-blue-900 text-2xl pb-4">
    //       Bệnh Tăng huyết áp
    //     </p>
    //     <p className="font-medium text-blue-900 text-xl pb-2">
    //       Tăng huyết áp là gì?{" "}
    //     </p>
    //     <div className="w-full font-normal">
    //       Tăng huyết áp, hay còn gọi là cao huyết áp, là tình trạng mà áp lực
    //       máu trong động mạch tăng cao hơn mức bình thường. Đây là một trong
    //       những yếu tố nguy cơ chính dẫn đến các bệnh tim mạch và đột quỵ. Tăng
    //       huyết áp được gọi là “kẻ giết người thầm lặng” bởi vì nó thường không
    //       có triệu chứng rõ ràng nhưng có thể gây ra các biến chứng nghiêm
    //       trọng. Hiện nay, tăng huyết áp là một vấn đề y tế toàn cầu, ảnh hưởng
    //       đến hàng triệu người trên thế giới.
    //     </div>
    //     <div className="flex flex-col grid[1fr_1fr]">
    //       <div>
    //         <Image
    //           src={assets.logoFacebook}
    //           alt="Image Disese"
    //           width={500}
    //           height={500}
    //           className="pb-2 items-center"
    //         />
    //       </div>
    //       <div>
    //         <p>
    //           <span></span>
    //         </p>
    //       </div>
    //     </div>

    //     <div className="">
    //       <p className="font-medium text-blue-900 text-xl pb-2">
    //         {" "}
    //         Triệu chứng{" "}
    //       </p>
    //       <p>
    //         Phần lớn người bị tăng huyết áp không có triệu chứng rõ ràng. Tuy
    //         nhiên, một số người có thể gặp các triệu chứng như: Đau đầu dữ dội
    //         Chóng mặt Mờ mắt Khó thở Đau ngực Tim đập nhanh Mệt mỏi Những triệu
    //         chứng này thường chỉ xuất hiện khi huyết áp đã lên rất cao và có thể
    //         gây nguy hiểm cho sức khỏe. Chính vì vậy, việc kiểm tra huyết áp
    //         định kỳ là rất quan trọng để phát hiện sớm và quản lý bệnh hiệu quả.
    //       </p>
    //     </div>
    //   </div>
    //   <div className="main-container webmd-col webmb-col-24 webmd-col-xs-24 webmd-col-sm-24 webmb-col-md-17 webmd-col-lg-13 webmd-col-xl-13 main-container-2"></div>
    // </div>
  );
};
export default DiseaseDetail;
