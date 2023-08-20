/* eslint-disable no-unused-vars */
interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  name: string;
  disabled?: boolean;
}

export default function Input({
  placeholder,
  value,
  onChange,
  onKeyUp,
  type,
  label,
  name,
  disabled,
}: InputProps) {
  return (
    <div className="w-full">
      <label
        className="text-xs text-subTextAndBorder sm:text-base"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        disabled={disabled}
        name={name}
        id={label}
        className="mt-1 block h-10 w-full rounded-md border-2 border-subTextAndBorder px-3 py-2 text-xs outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:border-accent  disabled:opacity-30 sm:h-12 sm:text-base"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        type={type}
      />
    </div>
  );
}
