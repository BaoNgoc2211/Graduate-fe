interface ConditionItemProps {
  name: string;
  matchLevel: string;
  levelValue: number;
  isSelected?: boolean;
}

const ConditionItem = ({
  name,
  matchLevel,
  levelValue,
  isSelected,
}: ConditionItemProps) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${
        isSelected ? "bg-gray-200 border-blue-500" : "bg-blue-50"
      }`}
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      <div className="flex items-center mt-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-1 mx-0.5 ${
              i < levelValue ? "bg-teal-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-sm mt-1 font-medium text-gray-600">
        {matchLevel.toUpperCase()} match
      </p>
    </div>
  );
};
export default ConditionItem;
