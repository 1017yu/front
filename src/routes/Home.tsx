import moment from 'moment';
import Hr from '@/components/ui/Hr';
import { useUser } from '@/hooks/useUser';
import { IEvents } from '@/types/IEvents';
import main_bg from '@/assets/main_bg.png';
import { eventData } from '@/data/constants';
import { boardConfig } from '@/data/s3configs';
import Container from '@/components/ui/Container';
import { ISurveyResponse } from '@/types/ISurvey';
import { fetchEvents } from '@/api/events/events';
import EventLayout from '@/components/EventLayout';
import ReactS3Client from 'react-aws-s3-typescript';
import EventTitle from '@/components/events/EventTitle';
import { useCallback, useEffect, useState } from 'react';
import SurveyPopUp from '@/components/survey/SurveyPopUp';
import { fetchActiveSurvey } from '@/api/survey/surveyRequests';

export default function Home() {
  const [activeSurvey, setActiveSurvey] = useState<ISurveyResponse | null>(
    null,
  );
  const closeTodayDate = localStorage.getItem('CloseTodayDate');
  const { user } = useUser();
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록

  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const uploadImage = async (file: File) => {
    const s3 = new ReactS3Client(boardConfig);
    try {
      const fileName = `${moment().format('YYMMDDhh:mm:ss')}_${
        file.name.split('.')[0]
      }`;
      const res = await s3.uploadFile(file, fileName);
      setImageFile(null);
      console.log(res.location);
    } catch (error) {
      // TODO : 파일 업로드 실패 예외처리
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > 5000000) {
        // TODO 파일 사이즈 제한 예외처리
        return;
      }

      setImageFile(file);
    }
  };

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
        {/* 이미지 업로드 S3 테스트 */}
        <form>
          <input type="file" accept="image/*" onChange={onChangeFile} />
        </form>
        {/* {user?.accessToken} */}
        {activeSurvey &&
          !activeSurvey.isDone &&
          moment().format('YYYY-MM-DD') !== closeTodayDate && (
            <SurveyPopUp
              surveyData={activeSurvey}
              closePopUp={closeSurveyPopUp}
            />
          )}
        <div className="container mx-auto mb-8 mt-16 sm:mb-16 sm:mt-8">
          <div className="block sm:flex">
            <EventTitle title={eventData.EVENT_RECENT_STORE.title} />
            <div className="mb-4 flex max-w-[20rem] items-center sm:mb-0">
              <button
                className="transition-all hover:scale-110 hover:transform hover:shadow-xl sm:ml-8"
                onClick={handleMoveEventsPage}
              >
                {eventData.EVENT_RECENT_STORE.content}
              </button>
            </div>
          </div>
          <section className="body-font text-gray-600">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-10 sm:mt-8">
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
          <Hr />
        </div>
        <div className="container mx-auto mt-16 sm:mt-8">
          <EventTitle title={eventData.EVENT_BEAUTY_STORE.title} />
          <section className="body-font text-gray-600">
            <div className="container mx-auto">
              <div className="mt-4 flex flex-wrap gap-9 sm:mt-8">
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
