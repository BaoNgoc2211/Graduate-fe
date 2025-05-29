"use client";
import { useState } from "react";
import Step01 from "./components/form/step-01";
import Step02 from "./components/form/step-02";
import Step03 from "./components/form/step-03";
import Step04 from "./components/form/step-04";
import Step05 from "./components/form/step-05";
import NavbarForm from "./components/ui/navbar-form";
// import Step1 from "@/app/symptom-checker/components/form/step-01";

const SymptomChecker = () => {
  // const [step, setStep] = useState(1);
  // const [formData, setFormData] = useState({
  //   gender: "",
  //   age: "",
  //   symptom: [],
  // });
  // const next = () => setStep((prev) => prev + 1);
  // const back = () => setStep((prev) => prev - 1);
  // const handleChange = (data) => {
  //   setFormData((prev) => ({ ...prev, ...data }));
  // };
  const [step, setStep] = useState(1);

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <Step01 />;
      case 2:
        return <Step02 />;
      case 3:
        return <Step03 />;
      case 4:
        return <Step04 />;
      case 5:
        return <Step05 />;
      default:
        return <Step01 />;
    }
  };
  return (
    <>
      <div className="border border-blue-900 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6 p-4">
        <NavbarForm currentStep={step} onStepChange={setStep} />
        <div>{renderStepComponent()}</div>
      </div>
    </>
  );
};
export default SymptomChecker;
