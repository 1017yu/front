import { useLocation } from 'react-router-dom';
import Container from '@/components/ui/Container';
import ISurveyResponse from '@/types/ISurveyResponse';
import SurveyRadioGroup, {
  IRadioOption,
} from '@/components/survey/SurveyRadioGroup';
import surveyHeader from '/public/survey_header.png';
import { AGE_OPTIONS } from '@/data/constants';

import { useCallback, useState } from 'react';

const Survey = () => {
  const location = useLocation();
  const surveyData = location.state.survey as ISurveyResponse;

  const [ageCheckedId, setAgeCheckedId] = useState(-1);
  const [optionCheckedId, setOptionCheckedId] = useState(-1);

  const handleAgeCheckedChange = useCallback((id: number) => {
    setAgeCheckedId(id);
  }, []);

  const handleOptionCheckedChange = useCallback((id: number) => {
    console.log(id);
    setOptionCheckedId(id);
  }, []);

  return (
    <Container>
      <div className="mb-10 rounded-lg bg-white drop-shadow-md">
        <div className="mx-auto mt-10 flex justify-center">
          <img src={surveyHeader} className="" />
        </div>
        <div className="flex flex-col p-5">
          <p className="self-end text-sm">
            조사 기간 : 2023.08.09 ~ 2023.08.30
          </p>
          <div className="">
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
          <div className="">
            <h4 className="mb-3 mt-5 text-lg sm:mt-10 sm:text-xl">
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
      </div>
    </Container>
  );
};

export default Survey;
