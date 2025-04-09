import React from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <label className="text-sm text-white flex items-center gap-2">
      <input type="checkbox" checked={props.checked} onChange={props.onChange} /> {props.label}
    </label>
  );
};

export default Checkbox;