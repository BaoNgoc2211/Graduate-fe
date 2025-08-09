import { BodyPart } from "@/mock/disease";
import Image from "next/image";

export const positions: Record<BodyPart, { top: string; left: string }> = {
  HEAD: { top: "6%", left: "48.5%" },
  NECK: { top: "16.4%", left: "48.5%" },
  CHEST: { top: "26%", left: "45%" },
  ABDOMEN: { top: "39%", left: "49%" },
  GENITAL: { top: "47%", left: "49%" },
  LIMBS: { top: "72%", left: "55.5%" },
  SKIN: { top: "56%", left: "43%" },
};

export default function BodyMap({
  onSelect,
  selectedPart,
}: {
  onSelect: (part: BodyPart) => void;
  selectedPart: BodyPart;
}) {
  return (
    <div className="relative w-[200px]bg-white rounded-xl shadow-lg p-2 mx-auto">
      <Image
        src="/image/body.png"
        alt="Cơ thể người"
        width={400}
        height={700}
        className="w-full h-full"
      />
      {Object.entries(positions).map(([part, pos]) => (
        <button
          key={part}
          className="absolute z-10"
          style={{ top: pos.top, left: pos.left }}
          onClick={() => onSelect(part as BodyPart)}
        >
          <div
            className={`p-2 md:w-6 md:h-6 rounded-full border border-blue-900 text-blue-900 ${
              selectedPart === part ? "bg-blue-600" : "bg-blue-300"
            } opacity-70`}
          ></div>
        </button>
      ))}
    </div>
  );
}
