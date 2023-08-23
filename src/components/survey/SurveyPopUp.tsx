import React, { useCallback, useState } from 'react';
import CheckBox from '@/components/ui/CheckBox';
import { ISurveyResponse } from '@/types/ISurvey';
import surveyBg from '@/assets/survey_bg.png';
import { useUser } from '@/hooks/useUser';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import { modalData } from '@/data/modalData';

type SurveyPopUpProps = {
  surveyData: ISurveyResponse;
  closePopUp: () => void;
};

const SurveyPopUp = React.memo(
  ({ surveyData, closePopUp }: SurveyPopUpProps) => {
    const { user } = useUser();
    const { openModal } = useModal();
    const [closeChecked, setCloseChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckedChange = useCallback(() => {
      setCloseChecked((prev) => !prev);
    }, []);

    const handleClickClose = useCallback(() => {
      if (closeChecked) {
        // 로컬스토리지에 오늘 날짜를 저장
        localStorage.setItem('CloseTodayDate', moment().format('YYYY-MM-DD'));
      }
      // 닫기 처리
      closePopUp();
    }, [closeChecked, closePopUp]);

    const handleClickSurvey = useCallback(() => {
      // 수요조사 상세 페이지로 이동
      if (user) {
        closePopUp();
        navigate('/survey', { state: { survey: surveyData } });
        return;
      }
      // 비로그인 > 로그인 유도 팝업
      openModal({
        ...modalData.LOGIN_REQUIRED,
        okCallback: () => {
          navigate('/signin', { replace: true });
        },
        cancelCallback: closePopUp,
      });
    }, [navigate, surveyData, openModal, closePopUp, user]);

    return (
      <div className="z-1000 absolute bottom-0 left-0 right-0 m-auto aspect-square w-full sm:top-0 sm:h-[440px] sm:w-[400px] sm:drop-shadow-md">
        <div
          className="w-full overflow-hidden rounded-t-2xl object-contain sm:h-[400px] sm:w-[400px]"
          onClick={handleClickSurvey}
        >
          <img
            src={surveyBg}
            className="drag-none aspect-square w-full cursor-pointer "
          />
          <div className="absolute top-12 w-full px-10 text-center text-xl font-bold">
            {surveyData.title}
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
  },
);

export default SurveyPopUp;
