type CheckBoxProps = {
  isChecked: boolean;
  onChange: () => void;
  label: string;
};

const CheckBox = ({ isChecked, onChange, label }: CheckBoxProps) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full"
        htmlFor="checkbox"
      >
        <input
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-subTextAndBorder transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-white before:opacity-0 before:transition-opacity checked:border-accent checked:bg-accent hover:before:opacity-10"
        />
        <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
      <label
        className="ml-2 mt-px cursor-pointer select-none"
        htmlFor="checkbox"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
