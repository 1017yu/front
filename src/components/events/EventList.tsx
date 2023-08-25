import { useRecoilValue } from 'recoil';
import Button from '@/components/ui/Button';
import { fetchEvents } from '@/api/events/events';
import Pagination from '@mui/material/Pagination';
import EventLayout from '@/components/EventLayout';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { SearchOptionState } from '@/states/SearchOptionState';
import { IEvents, IEventsPagination } from '@/types/IEvents';
import { COUNT_PER_EVENTS_PAGE, EVENTS_THEME } from '@/data/constants';

export default function EventList() {
  const [page, setPage] = useState(1); // 페이지 번호
  const [numOfEvents, setNumOfEvents] = useState(0); // 등록된 이벤트의 개수
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록
  const [isSearched, setIsSearched] = useState<boolean>(false); // 검색 전, 검색 후
  const totalPages = Math.ceil(numOfEvents / COUNT_PER_EVENTS_PAGE); // 총 페이지의 수
  const listTitle = isSearched ? `${numOfEvents}개의 이벤트` : '행사 리스트'; // 판매자 로그인 때, 비 로그인 & 일반 유저일 때의 title
  const searchOption = useRecoilValue(SearchOptionState);

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
        setIsSearched((prev) => !prev);
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
      userRole === 'ROLE_SELLER'
        ? setIsSeller((prev) => !prev)
        : setIsSeller(false);
    }
  }, []);

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
        <div className="mt-[-3rem] flex h-40 items-center justify-between text-2xl sm:mt-0 sm:text-5xl">
          {listTitle}
          {isSeller ? (
            <div className="sm:max-w-[10rem]">
              <Button onClick={handleMovePostEvent} contents={'공고 등록'} />
            </div>
          ) : (
            ''
          )}
        </div>
        <section className="body-font text-gray-600">
          <div className="container mx-auto ">
            <div className="flex flex-wrap justify-between">
              {searchedList.map((event) => (
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
