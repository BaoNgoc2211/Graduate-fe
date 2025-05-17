import { useState } from "react";
import Step1 from "@/components/form/symptom-checker/step-01";
import Step2 from "@/components/form/symptom-checker/step-02";
import Step3 from "@/components/form/symptom-checker/step-03";
const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    symptom: [],
  });
  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);
  const handleChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  return (
    <>
      {" "}
      <div className="form-container">
        <h2>Symptom Checker</h2>
        {step === 1 && (
          <Step1 data={formData} onChange={handleChange} onNext={next} />
        )}
        {step === 2 && (
          <Step2
            data={formData}
            onChange={handleChange}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && <Step3 data={formData} onBack={back} />}
      </div>
    </>
  );
};
export default SymptomChecker;
