import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type SurveyAnswerTagProps = {
  answer: string;
  onDelete: (answer: string) => void;
};
const SurveyAnswerTag = React.memo(
  ({ answer, onDelete }: SurveyAnswerTagProps) => {
    return (
      <li className="flex max-w-fit items-center gap-2 rounded-md bg-accent">
        <span className="my-2 ml-2 text-base text-white">{answer}</span>
        <AiOutlineClose
          onClick={() => onDelete(answer)}
          className="mr-2 text-white"
        />
      </li>
    );
  },
);

export default SurveyAnswerTag;
