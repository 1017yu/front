import { useLocation } from 'react-router-dom';
import Container from '@/components/ui/Container';
import { ISurveyRequest, ISurveyResponse } from '@/types/ISurvey';
import SurveyRadioGroup, {
  IRadioOption,
} from '@/components/survey/SurveyRadioGroup';
import surveyHeader from '/public/survey_header.png';
import { AGE_OPTIONS } from '@/data/constants';
import { submitSurvey } from '@/api/survey/surveyRequests';

import { useCallback, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';

const Survey = () => {
  const location = useLocation();
  const surveyData = location.state.survey as ISurveyResponse;

  const [ageCheckedId, setAgeCheckedId] = useState(-1);
  const [optionCheckedId, setOptionCheckedId] = useState(-1);
  const isValid = useMemo(
    () => ageCheckedId !== -1 && optionCheckedId !== -1 && surveyData !== null,
    [ageCheckedId, optionCheckedId, surveyData],
  );

  const handleAgeCheckedChange = useCallback((id: number) => {
    setAgeCheckedId(id);
  }, []);

  const handleOptionCheckedChange = useCallback((id: number) => {
    setOptionCheckedId(id);
  }, []);

  const onClickSubmit = useCallback(() => {
    const request = {
      surveyId: surveyData.id,
      surveyOptionId: optionCheckedId,
      age: ageCheckedId,
    } as ISurveyRequest;
    submitSurvey(request).then(
      () => {
        console.log('제출 성공');
      },
      (error) => {
        console.log('제출 실패');
      },
    );
  }, [ageCheckedId, optionCheckedId, surveyData]);

  return (
    <Container>
      <div className="mb-10 rounded-lg bg-white drop-shadow-md">
        <div className="mx-auto mt-10 flex justify-center">
          <img src={surveyHeader} className="" />
        </div>
        <div className="flex flex-col p-5 sm:px-10">
          <p className="self-end text-sm">
            조사 기간 : 2023.08.09 ~ 2023.08.30
          </p>
          <div>
            <h4 className="mb-3 mt-5 text-lg sm:mt-10 sm:text-xl">
              회원님의 연령대를 선택해주세요.
            </h4>
            <SurveyRadioGroup
              group={'age'}
              options={AGE_OPTIONS}
              checked={ageCheckedId}
              onChagedChecked={handleAgeCheckedChange}
            />
          </div>
          <div>
            <h4 className="mb-3 mt-5 text-lg sm:mt-20 sm:text-xl">
              {surveyData.title}
            </h4>
            <SurveyRadioGroup
              group={'options'}
              options={surveyData.options as IRadioOption[]}
              checked={optionCheckedId}
              onChagedChecked={handleOptionCheckedChange}
            />
          </div>
        </div>

        <div className="mx-auto mt-10 w-[50%] pb-5">
          <Button
            contents={'답변 제출'}
            onClick={onClickSubmit}
            disabled={!isValid}
          />
        </div>
      </div>
    </Container>
  );
};

export default Survey;
