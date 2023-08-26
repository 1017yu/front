import Title from '@/components/ui/Title';
import Button from '@/components/ui/Button';
import { eventData } from '@/data/constants';
import { IBookmark } from '@/types/IBookmark';
import { fetchEvents } from '@/api/events/events';
import EventLayout from './EventLayout';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { totalEventsState, searchOptionState } from '@/states/Events';
import PaginationComponent from '@/components/community/Pagination';
import { IEvents, IEventsPagination } from '@/types/IEvents';

export default function EventList() {
  const [page, setPage] = useState(1); // 페이지 번호
  const [pagePerEvents, setPagePerEvents] = useState(1);
  const searchOption = useRecoilValue(searchOptionState);
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록
  const [totalEvents, setTotalEvents] = useRecoilState(totalEventsState); // 등록된 모든 이벤트의 개수
const [localBookmarked, setLocalBookmarked] = useState<IBookmark[]>([]);

  // 공고 등록 페이지로 이동
  const handleMovePostEvent = () => {
    location.assign('/seller/new');
  };

  const handleChange = (page: number) => {
    setPage(page);
  };

  // TODO: 현재 12개를 초과하는 이벤트 조회가 안되고 있어서 페이지네이션 구현 불가능 (API 수정 요청 중)
  useEffect(() => {
    // 모든 이벤트 조회
    fetchEvents().then((res) => {
      try {
        setEventsList(res.data.content);
        setTotalEvents(res.data.totalElements);
        setPagePerEvents(res.data.numberOfElements);
      } catch (error) {
        alert(error);
      }
    });

    // 로컬스토리지에서 유저 role get
    const getUserRole = localStorage.getItem('user');
    const getBookmark = localStorage.getItem('bookmark');

    // 로컬 스토리지에 user 값이 존재할 때
    if (getUserRole) {
      const userRole = JSON.parse(getUserRole).role;
      

      // userRole이 셀러일 때만 button render
      userRole === 'ROLE_SELLER' ? setIsSeller(true) : setIsSeller(false);

      if (getBookmark) {
        setLocalBookmarked(JSON.parse(getBookmark));
      }
    }
  }, [setTotalEvents, totalEvents]);

  // 검색 옵션에 따른 이벤트 조회
  const searchedList = useMemo(() => {
    // 검색 조건 default인 경우 모든 이벤트 목록 조회
    if (
      searchOption.city === '' &&
      searchOption.district === '' &&
      searchOption.category === ''
    ) {
      return [...eventsList].sort((a, b) => b.id - a.id);
    }

    // 검색 조건에 따른 이벤트 목록 조회
    const searchedList = useMemo(() => {
    const { city, district, category } = searchOption;

    return (
      eventsList
        // 1. 검색 옵션 여부에 따라 필터링
        .filter((event) => {
          const cityMatch = city === '' || event.city === city;
          const districtMatch = district === '' || event.district === district;
          const categoryMatch = category === '' || event.category === category;

          return cityMatch && districtMatch && categoryMatch;
        })
        // 2. 필터링 된 이벤트 중 북마크 여부 -> 로컬 스토리지에 저장된 id값으로 비교
        .map((event) => ({
          ...event,
          bookmark: localBookmarked.some(
            (value) => value.id === event.id && value.bookmark,
          ),
        }))
        // 3. 최근 등록된 이벤트 순으로 정렬
        .sort((a, b) => b.id - a.id)
    );
  }, [eventsList, localBookmarked, searchOption]);

  return (
    <div className="container mx-auto px-8 sm:px-20">
      <div className="flex items-center justify-between">
        <Title text={eventData.EVENT_LIST_TITLE} />
        {isSeller && (
          <div className="sm:min-w-[2rem]">
            <Button onClick={handleMovePostEvent} contents={'공고 등록'} />
          </div>
        )}
      </div>
      <div className="container mx-auto mt-8 sm:mt-16">
        <div className="flex flex-wrap justify-between">
          {searchedList.map((event) => (
            <EventLayout key={event.id} {...event} />
          ))}
        </div>
      </div>
      <div className="flex justify-center sm:my-16">
        <PaginationComponent
          page={page}
          totalPostCount={totalEvents}
          itemsCountPerPage={pagePerEvents}
          pageRangeDisplayed={5}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
