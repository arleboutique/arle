import { type ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  title?: string;
  description?: string;
  units?: string;
  // className?: string;
  capitalize?: boolean;
};
const InputBox = ({ title, description, units, capitalize = false, ...rest }: InputProps) => {
  // const [isChecked, setIsChecked] = useState(checked)
  return (
    <label
      className="flex gap-3 items-center"
      // onClick={() => setIsChecked(!isChecked)}
    >
      <input {...rest} />
      <div>
        {title && <h4 className={capitalize ? "capitalize" : ""}>{title} {units ? units : ""}</h4>}
        {description && <p className="text-xs">{description}</p>}
      </div>
    </label>
  );
};

export default InputBox;