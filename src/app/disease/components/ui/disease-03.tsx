
import Disease03Item from "../layout/disease-03-item";
const categories: DiseaseCategory[] = [
  {
    id: "cardiology",
    name: "Bệnh Tim Mạch",
    icon: "/assets/disease-icons/tim-mach.svg",
  },
  {
    id: "orthopedic",
    name: "Bệnh Cơ Xương Khớp",
    icon: "/assets/disease-icons/co-xuong.svg",
  },
  {
    id: "respiratory",
    name: "Bệnh Hô Hấp",
    icon: "/assets/disease-icons/ho-hap.svg",
  },
  {
    id: "infectious",
    name: "Bệnh Truyền Nhiễm",
    icon: "/assets/disease-icons/truyen-nhiem.svg",
  },
  {
    id: "neurology",
    name: "Bệnh Thần Kinh",
    icon: "/assets/disease-icons/than-kinh.svg",
  },
  {
    id: "dermatology",
    name: "Bệnh Về Da",
    icon: "/assets/disease-icons/ve-da.svg",
  },
  {
    id: "dermatology",
    name: "Bệnh Về Da",
    icon: "/assets/disease-icons/ve-da.svg",
  },
];
const Disease03 = () => {
  return (
    <section className="w-full">
      <div className="flex gap-4 p-4 justify-center overflow-x-auto md:overflow-visible rounded-2xl shadow-sm hover:shadow-md">
        {categories.map((category) => (
          <Disease03Item key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
export default Disease03;
