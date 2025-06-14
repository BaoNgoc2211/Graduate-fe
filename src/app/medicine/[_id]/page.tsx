"use client";
import { useQuery } from "@tanstack/react-query";
import { getMedicineAPI } from "@/api/medicine/medicine.api";
import MedicineDetail from "../components/layout/medicine-detail";
import NavbarInfo from "../components/layout/navbar-info";
import { useParams } from "next/navigation";

const MedicineDetailPage = () => {
  const params = useParams<{ _id: string }>();
  const id = params._id
  console.log(id);
  const isIdReady = !!id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["medicine-detail", id],
    queryFn: () => getMedicineAPI(id),
    enabled: isIdReady,
  });
  console.log("Detail", data);
  if (!isIdReady) return "Đang lấy ID...";
  if (isLoading) return "Đang tải dữ liệu...";
  if (isError) return "Lỗi khi lấy dữ liệu thuốc.";
  return (
    <>
      {" "}
      <MedicineDetail
        _id={data?.data._id}
        name={data?.data.name}
        thumbnail={data?.data.thumbnail}
        image={data?.data.image}
        packaging={data?.data.packaging}
        dosageForm={data?.data.dosageForm}
        stock_id={data?.data.stock_id}
      />
      <NavbarInfo
        note={data?.data.note}
        use={data?.data.use}
        dosage={data?.data.dosage}
        indication={data?.data.indication}
        adverse={data?.data.adverse}
        precaution={data?.data.precaution}
        contraindication={data?.data.contraindication}
        ability={data?.data.ability}
        pregnancy={data?.data.pregnancy}
        storage={data?.data.storage}
        drugInteractions={data?.data.drugInteractions}
      />
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            {" "}
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
    </>
  );
};
export default MedicineDetailPage;
