import { IoIosArrowDown } from 'react-icons/io';

interface SelectProps {
  name: string;
  options: {
    name: string;
    value: string;
  }[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  label?: string;
  disabled?: boolean;
}

export default function Select({
  options,
  onChange,
  value,
  name,
  label,
  disabled,
}: SelectProps) {
  return (
    <div className="relative block text-xs sm:text-sm">
      <label
        className="text-xs text-subTextAndBorder sm:text-base"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
        className="block h-10 w-full appearance-none rounded-md border-2 border-subTextAndBorder bg-transparent px-3 py-2 transition focus:border-accent focus:outline-none sm:h-12"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-[calc(50%+4px)] text-accent">
        <IoIosArrowDown />
      </div>
    </div>
  );
}
