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
    <div>
      <label className="text-subTextAndBorder" htmlFor={label}>
        {label}
      </label>
      <input
        name={name}
        id={label}
        className="mt-1 block h-12 w-full rounded-md border-2 border-subTextAndBorder px-3 py-2 outline-none transition focus:border-accent"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}
