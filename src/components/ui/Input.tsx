/* eslint-disable no-unused-vars */
interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  name: string;
}

export default function Input({
  placeholder,
  value,
  onChange,
  type,
  label,
  name,
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
        name={name}
        id={label}
        className="mt-1 block h-10 w-full rounded-md border-2 border-subTextAndBorder px-3 py-2 text-xs outline-none transition focus:border-accent sm:h-12 sm:text-base"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}
