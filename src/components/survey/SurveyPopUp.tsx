import React, { useState } from 'react';
import CheckBox from '../ui/CheckBox';
import surveyBg from '/public/survey_bg.png';
import moment from 'moment';

type SurveyPopUpProps = {
  surveyId: number;
  title: string;
  closePopUp: () => void;
};

const SurveyPopUp = ({ surveyId, title, closePopUp }: SurveyPopUpProps) => {
  const [closeChecked, setCloseChecked] = useState(false);

  const handleCheckedChange = () => {
    setCloseChecked((prev) => !prev);
  };

  const handleClickClose = () => {
    if (closeChecked) {
      // 로컬스토리지에 오늘 날짜를 저장
      localStorage.setItem('CloseTodayDate', moment().format('YYYY-MM-DD'));
    }
    // 닫기 처리
    closePopUp();
  };

  return (
    <div className="z-1000 fixed bottom-0 left-0 right-0 top-0 m-auto h-[440px] w-[400px] drop-shadow-md">
      <div className="h-[400px] w-full overflow-hidden rounded-t-2xl">
        <img src={surveyBg} />
        <div className="absolute top-12 w-full px-10 text-center text-xl font-bold">
          {title}
        </div>
      </div>
      <div className="flex h-10 w-full items-center justify-between bg-white px-5">
        <CheckBox
          isChecked={closeChecked}
          onChange={handleCheckedChange}
          label={'오늘 하루 보지 않기'}
        />
        <button onClick={handleClickClose}>닫기</button>
      </div>
    </div>
  );
};

export default SurveyPopUp;
