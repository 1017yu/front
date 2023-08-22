import { useCallback, useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import SurveyPopUp from '@/components/survey/SurveyPopUp';
import { fetchActiveSurvey } from '@/api/survey/surveyRequests';
import { ISurveyResponse } from '@/types/ISurvey';
import { useUser } from '@/hooks/useUser';
import moment from 'moment';

export default function Home() {
  const [activeSurvey, setActiveSurvey] = useState<ISurveyResponse | null>(
    null,
  );
  const closeTodayDate = localStorage.getItem('CloseTodayDate');
  const { user } = useUser();

  useEffect(() => {
    fetchActiveSurvey().then((res) => {
      setActiveSurvey(res.data);
    });
  }, []);

  const closeSurveyPopUp = useCallback(() => {
    setActiveSurvey(null);
  }, []);

  return (
    <Container>
      <div>이메일 : {user?.email}</div>
      <div>닉네임 : {user?.nickname}</div>
      <div>프로필이미지url : {user?.profileImgUrl}</div>
      <div>프로필이미지url : {user?.role}</div>
      {/* {user?.accessToken} */}
      {activeSurvey &&
        !activeSurvey.isDone &&
        moment().format('YYYY-MM-DD') !== closeTodayDate && (
          <SurveyPopUp
            surveyData={activeSurvey}
            closePopUp={closeSurveyPopUp}
          />
        )}
    </Container>
  );
}
