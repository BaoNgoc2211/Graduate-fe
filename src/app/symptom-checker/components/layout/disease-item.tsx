// import ButtonStep from "./button-step04";

import ButtonStep from "../ui/button-step04";
// interface IDiseaseItem {}
const DiseaseItem = () => {
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
        <h2 className="font-bold text-xl">Triệu chứng:</h2>
        <p>
          Tension headache symptoms include dull pain and pressure, tightness
          like a band around the head, mild sensitivity to noise or light,
          difficulty sleeping, and difficulty concentrating.
        </p>
      </div>
      <div className="mb-5">
        {" "}
        <h2 className="font-bold text-xl">Mức độ phổ biến:</h2>
        <p>Among U.S. adults, 30% to 80% have occasional tension headaches.</p>
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-xl">Tổng quan:</h2>
        <p>
          Tension headaches are the most common type of headache, caused by
          muscle tension in the neck, face, jaw, or shoulders. Many people have
          occasional tension headaches, which often start in the middle of the
          day. For others, tension headaches occur every day. Everyday stress,
          lack of sleep, anxiety, depression, bad posture, hunger,...
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
        <h2 className="font-bold text-xl">Chuẩn đoán:</h2>
        <p>
          Tension headaches are the most common type of headache, caused by
          muscle tension in the neck, face, jaw, or shoulders. Many people have
          occasional tension headaches, which often start in the middle of the
          day. For others, tension headaches occur every day. Everyday stress,
          lack of sleep, anxiety, depression, bad posture, hunger,...
        </p>
      </div>
    </div>
  );
};
export default DiseaseItem;
