import { useCallback, useEffect, useState } from 'react';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Seletct';
import SurveyPopUp from '@/components/survey/SurveyPopUp';

import { fetchActiveSurvey } from '@/api/survey/surveyRequests';
import ISurveyResponse from '@/types/ISurveyResponse';
import moment from 'moment';

export default function Home() {
  const [activeSurvey, setActiveSurvey] = useState<ISurveyResponse | null>(
    null,
  );
  const closeTodayDate = localStorage.getItem('CloseTodayDate');

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
      <div className="flex flex-col gap-2">
        <Button onClick={() => console.log('hello')} contents="hello" />
        <Button
          onClick={() => console.log('hello')}
          contents="hello"
          secondary
        />
        <Button
          onClick={() => console.log('hello')}
          contents="hello"
          disabled
        />
        <Button
          onClick={() => console.log('hello')}
          contents={<LoadingSpinner color="white" />}
          disabled
        />
        <Button
          onClick={() => console.log('hello')}
          contents={<LoadingSpinner color="accent" />}
          disabled
          secondary
        />
        <Input
          name="d"
          onChange={() => {
            console.log('input');
          }}
          placeholder="email"
          value="email"
        />
        <Select
          name="place"
          onChange={() => {
            console.log('셀렉트');
          }}
          options={[
            { name: '1', value: '1' },
            { name: '2', value: '2' },
            { name: '3', value: '3' },
          ]}
          value=""
        />
        <Modal />
        {activeSurvey &&
          !activeSurvey.isDone &&
          moment().format('YYYY-MM-DD') !== closeTodayDate && (
            <SurveyPopUp
              surveyData={activeSurvey}
              closePopUp={closeSurveyPopUp}
            />
          )}
      </div>
    </Container>
  );
}
