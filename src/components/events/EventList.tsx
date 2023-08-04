import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { AdressState } from '@/states/AdressState';
import EventLayout from '@/components/EventLayout';
import { ThemeProvider } from '@mui/material/styles';
import { fetchEvents } from '@/api/events/eventsRequests';
import { IEvents, IEventsPagination } from '@/types/IEvents';
import { COUNT_PER_EVENTS_PAGE, EVENTS_THEME } from '@/data/constants';

export default function EventList() {
  const [page, setPage] = useState(1); // 페이지 번호
  const selected = useRecoilValue(AdressState); // 검색된 조건
  const [numOfEvents, setNumOfEvents] = useState(0); // 등록된 이벤트의 개수
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록
  const [isSearched, setIsSearched] = useState<boolean>(false); // 검색 전, 검색 후
  const totalPages = Math.ceil(numOfEvents / COUNT_PER_EVENTS_PAGE); // 총 페이지의 수
  const listTitle = isSearched ? `${numOfEvents}개의 이벤트` : '행사 리스트'; // 판매자 로그인 때, 비 로그인 & 일반 유저일 때의 title

  // page button click에 따른 현재 페이지 번호 핸들링
  const handlePagination: IEventsPagination = (_event, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  useEffect(() => {
    fetchEvents().then((res) => {
      try {
        setEventsList(res.data.content);
        setNumOfEvents(res.data.totalElements);
        setIsSearched((prev) => !prev);
      } catch (error) {
        alert(error);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={EVENTS_THEME}>
      <div className="container mx-auto px-8 sm:px-20">
        <div className="mt-[-3rem] flex h-40 items-center text-2xl sm:mt-0 sm:text-5xl">
          {listTitle}
        </div>
        <section className="body-font text-gray-600">
          <div className="container mx-auto ">
            <div className="flex flex-wrap justify-between">
              {eventsList.map((event) => (
                <EventLayout
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  location={event.location}
                  thumbnail_url={event.thumbnail_url}
                  category={event.category}
                  status={event.status}
                  bookmark={event.bookmark}
                />
              ))}
            </div>
          </div>
        </section>
        <div className="flex justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePagination}
            shape="rounded"
            color="primary"
            sx={{
              '& .Mui-selected': {
                color: '#fff',
              },
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
