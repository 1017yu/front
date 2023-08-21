import React from 'react';
import { ISurveyResultResponse } from '@/types/ISurvey';

type SurveyResultItem = {
  survey: ISurveyResultResponse;
  isLast: boolean;
};

const SurveyResultItem = React.memo(({ survey, isLast }: SurveyResultItem) => {
  return (
    <tr className="cursor-pointer bg-white">
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
