import React from 'react';
import IAdminSurvey from '@/types/IAdminSurvey';
import { AiOutlineMore } from 'react-icons/ai';
const SurveyItem = React.memo(({ survey }: { survey: IAdminSurvey }) => {
  return (
    <li
      className={`border-subTextAndBorder' } grid grid-cols-surveyItems gap-3 border-t bg-white`}
    >
      <div className="pl-10 leading-[40px]">{survey.title}</div>
      <div className="leading-[40px]">
        {survey.startDate.toLocaleDateString()}
      </div>
      <div className="leading-[40px]">
        {survey.endDate.toLocaleDateString()}
      </div>
      <div className="leading-[40px]">{survey.status}</div>
      <div className="mr-[10px] flex h-[40px] w-10 items-center justify-center">
        <AiOutlineMore className="h-5 w-5" />
      </div>
    </li>
  );
});

export default SurveyItem;
