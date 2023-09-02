import moment from 'moment';
import Title from '@/components/ui/Title';
import { IEvents } from '@/types/IEvents';
import banner from '@/assets/banner2.gif';
import { useModal } from '@/hooks/useModal';
import { eventData } from '@/data/constants';
import { modalData } from '@/data/modalData';
import { IBookmark } from '@/types/IBookmark';
import Container from '@/components/ui/Container';
import { ISurveyResponse } from '@/types/ISurvey';
import { fetchEvents } from '@/api/events/events';
import { useCallback, useEffect, useState } from 'react';
import EventLayout from '@/components/events/EventLayout';
import { fetchActiveSurvey } from '@/api/survey/surveyRequests';
import SurveyPopUp from '@/components/survey/SurveyPopUp';
import { getBoardPage } from '@/api/community/getBoard';
import IPostListItem from '@/types/IPostListItem';
import PostItem from '@/components/community/PostItem';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [activeSurvey, setActiveSurvey] = useState<ISurveyResponse | null>(
    null,
  );
  const { openModal } = useModal();
  const closeTodayDate = localStorage.getItem('CloseTodayDate');
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록
  const [localBookmarked, setLocalBookmarked] = useState<IBookmark[]>([]);
  const [boardList, setBoardList] = useState<IPostListItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveSurvey().then((res) => {
      if (res) {
        setActiveSurvey(res.data);
      }
    });
  }, []);

  const closeSurveyPopUp = useCallback(() => {
    setActiveSurvey(null);
  }, []);

  // 전체 이벤트 페이지로 이동
  const handleMovePage = (isEvent: boolean) => {
    return isEvent ? navigate('/events') : navigate('/community');
  };

  useEffect(() => {
    // 모든 이벤트 조회
    const fetchEventsData = async () => {
      try {
        const response = await fetchEvents(0);
        setEventsList(response.data.content);
      } catch (error) {
        openModal({
          ...modalData.EVENT_RESPONSE_ERROR,
        });
      }
    };

    const fetchBoardData = async (page: number) => {
      try {
        const response = await getBoardPage(page);
        setBoardList(response.data);
      } catch (error) {
        openModal({
          ...modalData.EVENT_RESPONSE_ERROR,
        });
      }
    };

    fetchEventsData();
    fetchBoardData(0);

    const getBookmark = localStorage.getItem('bookmark');

    if (getBookmark) {
      setLocalBookmarked(JSON.parse(getBookmark));
    }
  }, [openModal]);

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
  const recentEventList = [...bookmarkedList].slice(0, 4);
  const recentBoardList = boardList.slice(0, 4);

  return (
    <>
      <img
        src={banner}
        alt="main_banner"
        className="h-96 object-cover md:w-full"
      />

      <Container>
        {activeSurvey &&
          !activeSurvey.isDone &&
          moment().format('YYYY-MM-DD') !== closeTodayDate && (
            <SurveyPopUp
              surveyData={activeSurvey}
              closePopUp={closeSurveyPopUp}
            />
          )}
        <div className="mb-8 mt-4 rounded-lg bg-white pb-8 pt-8 drop-shadow-md sm:mx-auto sm:mb-8 sm:max-h-[500px] sm:overflow-hidden sm:p-12">
          <div className="flex items-center justify-evenly sm:justify-between">
            <Title text={eventData.EVENT_RECENT_STORE.title} />
            <div className="max-w-[12rem] justify-center sm:mb-0 sm:justify-start">
              <button
                className="text-xs transition-all hover:scale-105 hover:transform sm:ml-8 sm:text-xl"
                onClick={() => handleMovePage(true)}
              >
                {eventData.EVENT_RECENT_STORE.content}
              </button>
            </div>
          </div>
          <section className="body-font text-gray-600">
            <div className="container mx-auto mt-8">
              <div className="flex flex-wrap justify-center sm:justify-between">
                {recentEventList.map((event) => (
                  <EventLayout key={event.id} {...event} />
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="mb-8 mt-4 rounded-lg bg-white px-3 pb-8 pt-8 drop-shadow-md sm:mx-auto sm:mb-8 sm:p-12">
          <div className="flex items-center justify-evenly sm:justify-between">
            <Title text={eventData.COMMUNITY_RECENT_BOARD} />
            <div className="max-w-[12rem] justify-center sm:mb-0 sm:justify-start">
              <button
                className="text-xs transition-all hover:scale-105 hover:transform sm:ml-8 sm:text-xl"
                onClick={() => handleMovePage(false)}
              >
                {eventData.EVENT_RECENT_STORE.content}
              </button>
            </div>
          </div>
          <div className="container mx-auto mt-8">
            <div className="flex flex-col gap-10">
              {recentBoardList.map((board) => (
                <PostItem key={board.id} data={board} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
