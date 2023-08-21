import React from 'react';

export interface IRadioOption {
  id: number;
  content: string;
}

type SurveyRadioGroupProps = {
  group: string;
  options: IRadioOption[];
  checked: number;
  onChagedChecked: (id: number) => void;
};

const SurveyRadioGroup = React.memo(
  ({ group, options, checked, onChagedChecked }: SurveyRadioGroupProps) => {
    const handleOnChangeChecked = (id: string) => {
      onChagedChecked(parseInt(id));
    };

    return (
      <div className="ml-2 flex flex-col gap-2 gap-x-6 md:flex-row">
        {options.map((option) => {
          return (
            <div className="flex items-center" key={option.id}>
              <input
                onChange={(e) => handleOnChangeChecked(e.target.id)}
                type="radio"
                name={group}
                className="h-4 w-4 shrink-0 rounded-full border-subTextAndBorder focus:ring-accent"
                id={`${option.id}`}
                checked={checked === option.id}
              />
              <label
                htmlFor={`${option.id}`}
                className="ml-2 text-sm sm:text-lg"
              >
                {option.content}
              </label>
            </div>
          );
        })}
      </div>
    );
  },
);

export default SurveyRadioGroup;
