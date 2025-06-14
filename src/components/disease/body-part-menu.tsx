import { BodyPartEnum, BodyPart } from "@/mock/disease";

export default function BodyPartMenu({
  selected,
  onSelect,
}: {
  selected: BodyPart;
  onSelect: (part: BodyPart) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {(Object.keys(BodyPartEnum) as BodyPart[]).map((part) => (
        <button
          key={part}
          onClick={() => onSelect(part)}
          className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
            selected === part
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {BodyPartEnum[part]}
        </button>
      ))}
    </div>
  );
}
