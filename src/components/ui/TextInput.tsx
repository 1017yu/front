interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: () => void;
}

export default function TextInput({
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  return (
    <input
      className="block w-full rounded-md border-2 border-gray-400 px-3 py-2 outline-none transition focus:border-accent"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
