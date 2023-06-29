import { IoIosArrowDown } from 'react-icons/io';

interface SelectProps {
  name: string;
  options: {
    name: string;
    value: string;
  }[];
  onChange: () => void;
  value: string;
}

export default function Select({
  options,
  onChange,
  value,
  name,
}: SelectProps) {
  return (
    <div className="relative block">
      <select
        value={value}
        name={name}
        onChange={onChange}
        className="block w-full appearance-none rounded-md border-2 border-subTextAndBorder px-3 py-2 transition focus:border-accent focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-[calc(50%-7px)] text-accent">
        <IoIosArrowDown />
      </div>
    </div>
  );
}
