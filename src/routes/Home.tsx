import moment from 'moment';
import Title from '@/components/ui/Title';
import { useUser } from '@/hooks/useUser';
import { IEvents } from '@/types/IEvents';
import main_bg from '@/assets/main_bg.png';
import { useModal } from '@/hooks/useModal';
import { eventData } from '@/data/constants';
import { modalData } from '@/data/modalData';
import { IBookmark } from '@/types/IBookmark';
import { boardConfig } from '@/data/s3configs';
import Container from '@/components/ui/Container';
import { ISurveyResponse } from '@/types/ISurvey';
import { fetchEvents } from '@/api/events/events';
import ReactS3Client from 'react-aws-s3-typescript';
import { useCallback, useEffect, useState } from 'react';
import SurveyPopUp from '@/components/survey/SurveyPopUp';
import EventLayout from '@/components/events/EventLayout';
import { fetchActiveSurvey } from '@/api/survey/surveyRequests';

export default function Home() {
  const [activeSurvey, setActiveSurvey] = useState<ISurveyResponse | null>(
    null,
  );
  const { openModal } = useModal();
  const closeTodayDate = localStorage.getItem('CloseTodayDate');
  const { user } = useUser();
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [localBookmarked, setLocalBookmarked] = useState<IBookmark[]>([]);

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
    const fetchEventsData = async () => {
      try {
        const response = await fetchEvents();
        setEventsList(response.data.content);
      } catch (error) {
        openModal({
          ...modalData.EVENT_RESPONSE_ERROR,
        });
      }
    };

    fetchEventsData();

    const getBookmark = localStorage.getItem('bookmark');

    if (getBookmark) {
      setLocalBookmarked(JSON.parse(getBookmark));
    }
  }, []);

  const bookmarkedList = eventsList
    .map((event) => ({
      ...event,
      bookmark: localBookmarked.some(
        (value) => value.id === event.id && value.bookmark,
      ),
    }))
    // 3. 최근 등록된 이벤트 순으로 정렬
    .sort((a, b) => b.id - a.id);

  // 최근 등록된 이벤트 중 상위 4개
  const recentList = [...bookmarkedList].slice(0, 4);

  // 카테고리가 '뷰티'인 이벤트 중 상위 4개
  const beautyList = [...bookmarkedList]
    .filter((value) => value.category.includes('뷰티'))
    .slice(0, 4);

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
        <div className=" mb-8 rounded-lg bg-white drop-shadow-md sm:mx-auto sm:px-12 sm:pb-8 sm:pt-12">
          <div className="block sm:flex">
            <Title text={eventData.EVENT_RECENT_STORE.title} />
            <div className="mb-4 flex max-w-[12rem] items-center justify-center sm:mb-0 sm:justify-start">
              <button
                className="hidden text-xl transition-all hover:scale-110 hover:transform hover:shadow-xl sm:ml-8 sm:block"
                onClick={handleMoveEventsPage}
              >
                {eventData.EVENT_RECENT_STORE.content}
              </button>
            </div>
          </div>
          <section className="body-font text-gray-600">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-between sm:mt-8">
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
        <div className="mb-8 rounded-lg bg-white drop-shadow-md sm:mx-auto sm:px-12 sm:pb-8 sm:pt-12">
          <Title text={eventData.EVENT_BEAUTY_STORE} />
          <section className="body-font text-gray-600">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-between sm:mt-8">
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
