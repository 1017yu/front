import Title from '@/components/ui/Title';
import Button from '@/components/ui/Button';
import { fetchEvents } from '@/api/events/events';
import Pagination from '@mui/material/Pagination';
import EventLayout from '@/components/EventLayout';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IEvents, IEventsPagination } from '@/types/IEvents';
import { numberOfEventState, searchOptionState } from '@/states/Events';
import {
  COUNT_PER_EVENTS_PAGE,
  EVENTS_THEME,
  eventData,
} from '@/data/constants';

export default function EventList() {
  const [page, setPage] = useState(1); // 페이지 번호
  const searchOption = useRecoilValue(searchOptionState);
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록
  const [numOfEvents, setNumOfEvents] = useRecoilState(numberOfEventState); // 등록된 이벤트의 개수
  const totalPages = Math.ceil(numOfEvents / COUNT_PER_EVENTS_PAGE); // 총 페이지의 수

  // page button click에 따른 현재 페이지 번호 핸들링
  const handlePagination: IEventsPagination = (_event, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  // 공고 등록 페이지로 이동
  const handleMovePostEvent = () => {
    location.assign('/seller/new');
  };

  useEffect(() => {
    // 모든 이벤트 조회
    fetchEvents().then((res) => {
      try {
        setEventsList(res.data.content);
        setNumOfEvents(res.data.totalElements);
      } catch (error) {
        alert(error);
      }
    });

    // 로컬스토리지에서 유저 role get
    const getUserRole = localStorage.getItem('user');

    // 로컬 스토리지에 user 값이 존재할 때
    if (getUserRole) {
      const userRole = JSON.parse(getUserRole).role;

      // userRole이 셀러일 때만 button render
      userRole === 'ROLE_SELLER' ? setIsSeller(true) : setIsSeller(false);
    }
  }, [setNumOfEvents, numOfEvents]);

  // 검색 옵션에 따른 이벤트 조회
  const searchedList = useMemo(() => {
    // 검색 조건 default인 경우 모든 이벤트 목록 조회
    if (
      searchOption.city === '' &&
      searchOption.district === '' &&
      searchOption.category === ''
    ) {
      return eventsList;
    }

    // 검색 조건에 따른 이벤트 목록 조회
    return eventsList.filter((event) => {
      const cityMatch =
        searchOption.city === '' || event.city === searchOption.city;
      const districtMatch =
        searchOption.district === '' ||
        event.district === searchOption.district;
      const categoryMatch =
        searchOption.category === '' ||
        event.category === searchOption.category;

      return (
        cityMatch &&
        (districtMatch || searchOption.district === '') &&
        categoryMatch
      );
    });
  }, [eventsList, searchOption]);

  return (
    <ThemeProvider theme={EVENTS_THEME}>
      <div className="container mx-auto px-8 sm:px-20">
        <div className="flex items-center justify-between">
          <Title text={eventData.EVENT_LIST_TITLE} />
          {isSeller ? (
            <div className="sm:max-w-[10rem]">
              <Button onClick={handleMovePostEvent} contents={'공고 등록'} />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="container mx-auto mt-8 sm:mt-16">
          <div className="flex flex-wrap justify-between">
            {searchedList.reverse().map((event) => (
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
