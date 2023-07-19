import { useState } from 'react';
import { dummyEventsData } from '@/types/IEvents';
import Pagination from '@mui/material/Pagination';
import EventLayout from '@/components/EventLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function EventList() {
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [isSearched, setIsSearched] = useState<boolean>(false); // 검색 전, 검색 후
  const [page, setPage] = useState(1); // 페이지 번호

  const numOfEvent = dummyEventsData.length; // 등록된 이벤트의 개수
  const eventsPerPage = 12; // 헌 페이지 당 노출시킬 event의 개수
  const totalPages = Math.ceil(numOfEvent / eventsPerPage); // 총 페이지의 수
  const startIdx = (page - 1) * eventsPerPage; // 이벤트 데이터 내 idx
  const displayedEvents = dummyEventsData.slice(
    startIdx,
    startIdx + eventsPerPage,
  );
  const listTitle = isSearched ? `${numOfEvent}개의 이벤트` : '행사 리스트'; // 판매자 로그인 때, 비 로그인 & 일반 유저일 때의 title

  // page button click에 따른 현재 페이지 번호 핸들링
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scroll(0, 0);
  };

  // 커스텀 테마 생성
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(0 201 167)', // 커스텀 primary 색상
      },
      secondary: {
        main: '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto px-8 md:px-20">
        <div className="mt-[-3rem] flex h-40 items-center text-2xl md:mt-0 md:text-5xl">
          {listTitle}
        </div>
        <section className="body-font text-gray-600">
          <div className="container mx-auto ">
            <div className="flex flex-wrap justify-between">
              {displayedEvents.map((event) => (
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

export default EventList;
