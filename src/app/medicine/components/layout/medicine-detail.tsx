"use client";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import MedicineImage from "./medicine-image";
import MedicineInfo from "./medicine-info";
import MedicineTabs from "./medicine-tabs";

const MedicineDetail: React.FC<Partial<IMedicine>> = ({
  _id,
  name,
  thumbnail,
  image,
  packaging,
  dosageForm,
  stock_id,
  manufacturer_id,
}) => {
  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Hình ảnh thuốc */}
        <div className="lg:basis-1/3">
          <MedicineImage thumbnail={thumbnail} image={image} />
        </div>

        {/* Thông tin + Tab */}
        <div className="lg:basis-2/3 flex flex-col lg:flex-row gap-6">
          {/* Thông tin thuốc */}
          <div className="lg:basis-2/3 space-y-4">
            <MedicineInfo
              _id={_id}
              name={name}
              packaging={packaging}
              dosageForm={dosageForm}
              manufacturer_id={manufacturer_id}
              thumbnail={thumbnail}
              sellingPrice={stock_id?.sellingPrice ?? 0}
              quantity={stock_id?.quantity ?? 0}
            />
          </div>

          {/* Tab Mua ngay */}
          <div className="lg:basis-1/3">
            <div className="border border-blue-900 overflow-hidden shadow-md p-4 bg-white">
              <MedicineTabs name={name ?? ""} packaging={packaging ?? ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
