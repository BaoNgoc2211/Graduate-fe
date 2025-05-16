const StepTabs = () => {
  const steps = ['INFO', 'SYMPTOMS', 'CONDITIONS', 'DETAILS', 'TREATMENT'];

  return (
    <div className="flex border-b border-gray-200">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`px-6 py-3 text-sm font-medium ${
            index === 0
              ? 'text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-500'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepTabs;
