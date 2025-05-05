import Image from "next/image";
import { assets } from "../../../public/assets";

const MedicineItem = () => {
  return (
    <div>
      <div className="flex flex-col">
        <Image
          src={assets.stethoscope}
          alt="Thumnail Medicine"
          width={20}
          height={20}
        />
        <div className="flex flex-row">
          <div className=" flex flex-col">
            <p></p>
          </div>
          <Image
            src={assets.logo_youtube}
            alt="Icon Cart"
            width={5}
            height={5}
          />
        </div>
      </div>
    </div>
  );
};
export default MedicineItem;
