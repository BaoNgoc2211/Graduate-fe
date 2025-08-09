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
          className={`border border-blue-900 w-full p-1 bg-white text-blue-900 shadow-lg text-sm font-medium transition ${
            selected === part
              ? "bg-while text-while"
              : "text-while hover:bg-gray-100"
          }`}
        >
          {BodyPartEnum[part]}
        </button>
      ))}
    </div>
  );
}
