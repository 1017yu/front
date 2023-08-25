import { useCallback, useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import SurveyPopUp from '@/components/survey/SurveyPopUp';
import { fetchActiveSurvey } from '@/api/survey/surveyRequests';
import { ISurveyResponse } from '@/types/ISurvey';
import { useUser } from '@/hooks/useUser';
import moment from 'moment';
import { fetchEvents } from '@/api/events/events';
import EventLayout from '@/components/EventLayout';
import { IEvents } from '@/types/IEvents';
import main_bg from '@/assets/main_bg.png';
import { mainData } from '@/data/constants';
import Button from '@/components/ui/Button';

export default function Home() {
  const [activeSurvey, setActiveSurvey] = useState<ISurveyResponse | null>(
    null,
  );
  const closeTodayDate = localStorage.getItem('CloseTodayDate');
  const { user } = useUser();
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록

  useEffect(() => {
    fetchActiveSurvey().then((res) => {
      setActiveSurvey(res.data);
    });
  }, []);

  const closeSurveyPopUp = useCallback(() => {
    setActiveSurvey(null);
  }, []);

  // 전체 이벤트 페이지로 이동
  const handleMoveEventsPage = () => {
    location.assign('/events');
  };

  useEffect(() => {
    // 모든 이벤트 조회
    fetchEvents().then((res) => {
      try {
        setEventsList(res.data.content);
      } catch (error) {
        alert(error);
      }
    });
  }, []);

  const recentList = eventsList.reverse().slice(0, 4);

  const beautyList = eventsList.filter((value) =>
    value.category.includes('뷰티'),
  );

  return (
    <>
      <img
        src={main_bg}
        alt="main_banner"
        className="mx-auto h-96 object-cover md:w-full"
      />

      <Container>
        <div>이메일 : {user?.email}</div>
        <div>닉네임 : {user?.nickname}</div>
        <div>프로필이미지url : {user?.profileImgUrl}</div>
        {/* {user?.accessToken} */}
        {activeSurvey &&
          !activeSurvey.isDone &&
          moment().format('YYYY-MM-DD') !== closeTodayDate && (
            <SurveyPopUp
              surveyData={activeSurvey}
              closePopUp={closeSurveyPopUp}
            />
          )}
        <div className="container mx-auto">
          <div className="block justify-between sm:flex">
            <div className="my-8 flex items-center justify-between text-2xl sm:mt-0 sm:h-40 sm:text-5xl">
              {mainData.MAIN_RECENT_STORE.title}
            </div>
            <div className="mb-4 flex max-w-[20rem] items-center sm:mb-0">
              <Button contents={'더 알아보기'} onClick={handleMoveEventsPage} />
            </div>
          </div>
          <section className="body-font text-gray-600">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-10">
                {recentList.map((event) => (
                  <EventLayout
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    city={event.city}
                    district={event.district}
                    thumbnailUrl={event?.thumbnailUrl}
                    category={event?.category}
                    status={event.status}
                    bookmark={event.bookmark}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="container mx-auto">
          <div className="mt-8 flex items-center justify-between text-2xl sm:mt-0 sm:mt-0 sm:h-40 sm:text-5xl">
            {mainData.MAIN_BEAUTY_STORE.title}
          </div>
          <section className="body-font text-gray-600">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-9">
                {beautyList.map((event) => (
                  <EventLayout
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    city={event.city}
                    district={event.district}
                    thumbnailUrl={event?.thumbnailUrl}
                    category={event?.category}
                    status={event.status}
                    bookmark={event.bookmark}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
