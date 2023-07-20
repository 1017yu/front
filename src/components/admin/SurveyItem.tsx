/* eslint-disable no-unused-vars */
import React from 'react';
import IAdminSurvey from '@/types/IAdminSurvey';
import { AiOutlineMore } from 'react-icons/ai';
import moment from 'moment';

type SurveyItemProps = {
  survey: IAdminSurvey;
  isOpen: boolean;
  onClickMore: (id: number) => void;
  onClickMenuItem: (isDeleteClick: boolean, id: number) => void;
};

const SurveyItem = React.memo(
  ({
    survey,
    isOpen,
    onClickMore: onClickMenu,
    onClickMenuItem,
  }: SurveyItemProps) => {
    const handleOnClickMore = (event: React.MouseEvent) => {
      event.stopPropagation();
      onClickMenu(survey.id);
    };

    const handleOnClickDelete = () => {
      onClickMenuItem(true, survey.id);
    };

    const handleOnClickDone = () => {
      onClickMenuItem(false, survey.id);
    };

    return (
      <li
        className={`grid grid-cols-smSurveyItems gap-2 border-t border-subTextAndBorder bg-white sm:grid-cols-surveyItems sm:gap-3`}
      >
        <div className="min-h-10 flex items-center pl-5 text-xs sm:pl-10 sm:text-sm">
          {survey.title}
        </div>
        <div className="min-h-10 flex items-center text-xs sm:text-sm">
          {moment(survey.startDate).format('YYYY년 MM월 DD일')}
        </div>
        <div className="min-h-10 flex items-center  text-xs sm:text-sm">
          {moment(survey.endDate).format('YYYY년 MM월 DD일')}
        </div>
        <div className="min-h-10 flex items-center text-xs sm:text-sm">
          {survey.status}
        </div>

        <div className="relative flex h-[40px] w-10 flex-col items-center justify-center  sm:mr-[10px]">
          <AiOutlineMore
            className="h-5 w-5 cursor-pointer"
            onClick={(e: React.MouseEvent) => {
              handleOnClickMore(e);
            }}
          />

          {isOpen && (
            <ul className="absolute right-0 top-8 z-10 flex w-[150px] flex-col items-start rounded-lg bg-white py-1 drop-shadow">
              <li
                key="delete"
                className="flex w-full cursor-pointer justify-between px-4 py-1 text-sm hover:bg-gray-100"
                onClick={handleOnClickDelete}
              >
                수요조사 삭제
              </li>
              <li
                className="flex w-full cursor-pointer justify-between px-4 py-1 text-sm hover:bg-gray-100"
                onClick={handleOnClickDone}
              >
                수요조사 종료
              </li>
            </ul>
          )}
        </div>
      </li>
    );
  },
);

export default SurveyItem;
