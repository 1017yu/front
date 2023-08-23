import React from 'react';
import { ISurveyResultResponse } from '@/types/ISurvey';
import { useNavigate } from 'react-router-dom';

type SurveyResultItem = {
  survey: ISurveyResultResponse;
  isLast: boolean;
};

const SurveyResultItem = React.memo(({ survey, isLast }: SurveyResultItem) => {
  const navigate = useNavigate();

  const moveDetail = () => {
    navigate(`/survey-results/${survey.id}`, { replace: true });
  };

  return (
    <tr className="cursor-pointer bg-white" onClick={moveDetail}>
      <th
        scope="row"
        className={`${
          isLast ? 'border-none' : 'border-b'
        } whitespace-pre-line px-5 py-3 text-sm font-normal sm:text-base`}
      >
        {survey.title}
      </th>
      <td
        className={`${
          isLast ? 'border-none' : 'border-b'
        } px-5 py-3 text-xs sm:text-sm`}
      >
        {survey.startDate} ~ {survey.endDate}
      </td>
    </tr>
  );
});

export default SurveyResultItem;
