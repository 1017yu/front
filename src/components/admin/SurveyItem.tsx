/* eslint-disable no-unused-vars */
import React from 'react';
import IAdminSurvey from '@/types/IAdminSurvey';
import { AiOutlineMore } from 'react-icons/ai';
import moment from 'moment';

type SurveyItemProps = {
  survey: IAdminSurvey;
  isOpen: boolean;
  onClickMore: (id: number) => void;
  onClickMenuItem: (isDeleteClick: boolean) => void;
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
      onClickMenuItem(true);
    };

    const handleOnClickDone = () => {
      onClickMenuItem(false);
    };

    return (
      <li
        className={`grid grid-cols-smSurveyItems gap-2 border-t border-subTextAndBorder bg-white sm:grid-cols-surveyItems sm:gap-3`}
      >
        <div className="pl-5 text-xs leading-[40px] sm:pl-10 sm:text-sm sm:leading-[40px]">
          {survey.title}
        </div>
        <div className="text-xs leading-[40px]  sm:text-sm sm:leading-[40px]">
          {moment(survey.startDate).format('YYYY년 MM월 DD일')}
        </div>
        <div className="text-xs leading-[40px]  sm:text-sm sm:leading-[40px]">
          {moment(survey.endDate).format('YYYY년 MM월 DD일')}
        </div>
        <div className="text-xs leading-[40px]  sm:text-sm sm:leading-[40px]">
          {survey.status}
        </div>
        {/* <div className="relative flex h-[40px] w-10 flex-col items-center justify-center  sm:mr-[10px] ">
        <AiOutlineMore className="h-5 w-5" />
      </div> */}
        <div className="relative flex h-[40px] w-10 flex-col items-center justify-center  sm:mr-[10px]">
          <AiOutlineMore
            className="h-5 w-5"
            onClick={(e: React.MouseEvent) => {
              handleOnClickMore(e);
            }}
          />

          {isOpen && (
            <ul className="absolute right-0 top-8 z-10 flex w-[150px] flex-col items-start rounded-lg bg-white py-2 drop-shadow">
              <li
                key="delete"
                className="flex w-full cursor-pointer justify-between px-4 py-2 hover:bg-gray-50"
                onClick={handleOnClickDelete}
              >
                수요조사 삭제
              </li>
              <li
                className="flex w-full cursor-pointer justify-between px-4 py-2 hover:bg-gray-50"
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
