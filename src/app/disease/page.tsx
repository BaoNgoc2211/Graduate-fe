"use client";
import TitleDisease from "./components/layout/title";
import Disease01 from "./components/ui/disease-01";
// import Disease02 from "./components/ui/disease-02";
import Disease03 from "./components/ui/disease-03";
import BodyMap from "@/components/disease/body-map";
import BodyPartMenu from "@/components/disease/body-part-menu";
import DiseaseList from "@/components/disease/disease-list";
import Pagination from "@/components/disease/pagination";
import { BodyPartEnum, mockDiseases } from "@/mock/disease";
import { useState } from "react";
const DiseasePage = () => {
  const [selectedPart, setSelectedPart] =
    useState<keyof typeof BodyPartEnum>("HEAD");
  const [page, setPage] = useState(1);

  const filtered = mockDiseases.filter((d) => d.bodyPart === selectedPart);
  const pageSize = 10;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div>
      <div className="flex flex-col mb-5">
        <Disease01 />
      </div>
      <div className="flex flex-col mb-5">
        <TitleDisease text1="Bệnh theo đối tượng" />
        {/* <Disease02 /> */}
      </div>
      <div className="flex flex-col mb-5">
        <TitleDisease text1="Chuyên trang bệnh học" />
        <Disease03 />
      </div>
      {/* <div className="flex flex-row gap-3 px-1 py-2 justify-center">
        {data?.data?.map((item: IDisCategory, index: number) => (
          <NavbarItem key={index} name={item.name} icon={item.icon} />
        ))}
      </div> */}
      {/* <div>
        <DisCategoryItem />
      </div> */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-1/2">
          <BodyMap onSelect={setSelectedPart} selectedPart={selectedPart} />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <BodyPartMenu selected={selectedPart} onSelect={setSelectedPart} />
          <DiseaseList diseases={pageData} />
          <Pagination total={filtered.length} page={page} onChange={setPage} />
        </div>
      </div>
    </div>
  );
};
export default DiseasePage;
