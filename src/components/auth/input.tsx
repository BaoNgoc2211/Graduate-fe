import ErrorComponent from "./error";
import { Label } from "./label";

interface IInput {
  label?: string;
  placeholder: string;
  type: "text" | "password" | "email" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputComponent = (props: IInput) => {
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>{props.label}</Label>
        <input
          className="w-full px-3 py-2 border border-gray-800"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {props.error ? (
          <ErrorComponent error={props.error} />
        ) : (
          <div className="h-[20px]"></div>
        )}
      </div>
    </>
  );
};

export default InputComponent;