import { BodyPart } from "@/mock/disease";
import Image from "next/image";

export const positions: Record<BodyPart, { top: string; left: string }> = {
  HEAD: { top: "10%", left: "45%" },
  NECK: { top: "18%", left: "46%" },
  CHEST: { top: "28%", left: "45%" },
  ABDOMEN: { top: "45%", left: "45%" },
  GENITAL: { top: "60%", left: "47%" },
  LIMBS: { top: "70%", left: "30%" },
  SKIN: { top: "85%", left: "60%" },
};

export default function BodyMap({
  onSelect,
  selectedPart,
}: {
  onSelect: (part: BodyPart) => void;
  selectedPart: BodyPart;
}) {
  return (
    <div className="relative w-[400px]bg-white rounded-xl shadow-lg p-2 mx-auto">
      <Image
        src="/image/body.jpg"
        alt="Cơ thể người"
        width={400}
        height={700}
        className="w-full h-auto"
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
