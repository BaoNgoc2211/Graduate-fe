"use client";
import BodyMap from "@/components/disease/body-map";
import BodyPartMenu from "@/components/disease/body-part-menu";
import DiseaseList from "@/components/disease/disease-list";
import Pagination from "@/components/disease/pagination";
import { BodyPartEnum, mockDiseases } from "@/mock/disease";
import { useState } from "react";

export default function DiseaseMapPage() {
  const [selectedPart, setSelectedPart] =
    useState<keyof typeof BodyPartEnum>("HEAD");
  const [page, setPage] = useState(1);

  const filtered = mockDiseases.filter((d) => d.bodyPart === selectedPart);
  const pageSize = 10;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
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
  );
}
