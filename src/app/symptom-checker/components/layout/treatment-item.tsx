// import ButtonStep from "./button-step04";

import ButtonStep from "../ui/button-step04";
// interface IDiseaseItem {}
const TreatmentItem = () => {
  return (
    <div className="px-5 py-3">
      <div className="mb-5">
        <h1 className="font-bold text-2xl text-center">Cao Huyết Áp</h1>
        <p className="text-center font-medium">
          Biến thể đau nửa đầu | Đau đầu | Đau đầu do mạch máu
        </p>
      </div>
      <div className="mb-5">
        {" "}
        <h2 className="font-bold text-xl mb-5">Phương pháp điều trị:</h2>
        <p className="mb-5">
          <span className="font-bold">Thuốc 1:</span>
          Tension headache symptoms include dull pain and pressure, tightness
          like a band around the head, mild sensitivity to noise or light,
          difficulty sleeping, and difficulty concentrating.
        </p>
        <p>
          <span className="font-bold">Thuốc 1:</span>
          Viên nén Agifuros 40mg điều trị tăng huyết áp, phù phổi cấp, tăng
          calci huyết (10 vỉ x 25 viên)
        </p>
        <p>
          Viên nén Viacoram 3.5mg/2.5mg điều trị tăng huyết áp (chai 30 viên)
        </p>
      </div>
      <div className="">
        <h2 className=" font-bold text-xl mb-5">
          Bạn có nghĩ mình mắc tình trạng này không?
        </h2>
        <div className="flex justify-center mb-5">
          <div className="mr-5">
            <ButtonStep text="Có" />
          </div>
          <div className="mr-5">
            {" "}
            <ButtonStep text="Không" />
          </div>
          <div className="mr-5">
            <ButtonStep text="Có thể" />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-xl">Nguyên nhân:</h2>
        <p>
          Tension headaches are the most common type of headache, caused by
          muscle tension in the neck, face, jaw, or shoulders. Many people have
          occasional tension headaches, which often start in the middle of the
          day. For others, tension headaches occur every day. Everyday stress,
          lack of sleep, anxiety, depression, bad posture, hunger,...
        </p>
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-xl">Thận trọng khi lái xe:</h2>
        <p>Chưa có báo cáo nào</p>
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-xl">
          Khả năng lái xe và vận hành máy móc:
        </h2>
        <p>Chưa có báo cáo nào</p>
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-xl">Thời kỳ mang thai và cho con bú:</h2>
        <p>Chưa có báo cáo nào</p>
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-xl">Tương tác thuốc:</h2>
        <p>Chưa có báo cáo nào</p>
      </div>
    </div>
  );
};
export default TreatmentItem;
