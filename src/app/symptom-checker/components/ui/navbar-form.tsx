"use client";
type NavbarFormProps = {
  currentStep: number;
  onStepChange: (step: number) => void;
};

const NavbarForm = ({ currentStep, onStepChange }: NavbarFormProps) => {
  const steps = [
    { label: "Thông tin", value: 1 },
    { label: "Triệu chứng", value: 2 },
    { label: "Tình trạng", value: 3 },
    { label: "Chi tiết", value: 4 },
    { label: "Khuyến nghị", value: 5 },
  ];
  return (
    <ul className="flex flex-row gap-3 px-1 py-2 justify-center">
      {steps.map((step) => (
        <li key={step.value}>
          <button
            onClick={() => onStepChange(step.value)}
            className={`flex items-center gap-2 border px-3 py-2 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md ${
              currentStep === step.value
                ? "bg-[#00416A] text-white border-[#00416A]"
                : "border-[#00416A] hover:bg-[#00416A] hover:text-white"
            }`}
          >
            <p>{step.label}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};
export default NavbarForm;
