import React from 'react';
import IAdminSurvey from '@/types/IAdminSurvey';
import { AiOutlineMore } from 'react-icons/ai';
const SurveyItem = React.memo(({ survey }: { survey: IAdminSurvey }) => {
  return (
    <li
      className={`grid grid-cols-smSurveyItems gap-2 border-t border-subTextAndBorder bg-white sm:grid-cols-surveyItems sm:gap-3`}
    >
      <div className="pl-5 text-xs leading-[40px] sm:pl-10 sm:text-sm sm:leading-[40px]">
        {survey.title}
      </div>
      <div className="text-xs leading-[40px]  sm:text-sm sm:leading-[40px]">
        {survey.startDate}
      </div>
      <div className="text-xs leading-[40px]  sm:text-sm sm:leading-[40px]">
        {survey.endDate}
      </div>
      <div className="text-xs leading-[40px]  sm:text-sm sm:leading-[40px]">
        {survey.status}
      </div>
      <div className="flex h-[40px] w-10 items-center justify-center sm:mr-[10px]">
        <AiOutlineMore className="h-5 w-5" />
      </div>
    </li>
  );
});

export default SurveyItem;
