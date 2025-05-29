"use client";
import ConditionItem from "../layout/condition";
import DiseaseItem from "../layout/disease-item";
const conditions = [
  {
    name: "Tension Headache",
    matchLevel: "Strong",
    levelValue: 4,
  },
  {
    name: "Migraine Headache (Adult)",
    matchLevel: "Strong",
    levelValue: 4,
  },
  {
    name: "Cluster Headache",
    matchLevel: "Moderate",
    levelValue: 3,
  },
];
const Step04 = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white rounded-xl shadow-md space-x-6">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <h2 className="font-bold text-xl">
            Các tình trạng phù hợp với triệu chứng
          </h2>
          <div className="space-y-4">
            {conditions.map((c, idx) => (
              <ConditionItem
                key={idx}
                name={c.name}
                matchLevel={c.matchLevel}
                levelValue={c.levelValue}
                isSelected={c.name === "Cluster Headache"}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <DiseaseItem />
        </div>
      </div>
    </div>
  );
};
export default Step04;
