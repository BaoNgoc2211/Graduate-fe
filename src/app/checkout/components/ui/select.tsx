interface Option {
  value: string;
  label: string;
  price?: number;
  description?: string;
}

interface SelectComponentProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}
const SelectComponent = ({
  label,
  options,
  value,
  onChange,
}: SelectComponentProps) => {
  // const selectedOption = options.find((option) => option.value === value);

  // const getShippingPrice = () => {
  //   return selectedOption?.price || 0;
  // };
  return (
    <div>
      <p className="mb-2">{label}</p>
      <select
          className="w-full px-3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
              {option.price && ` - $${option.price}`}
              {option.description && ` (${option.description})`}
            </option>
          ))}
        </select>
    </div>
  );
};
export default SelectComponent;