import Title from '@/components/ui/Title';
import { IEvents } from '@/types/IEvents';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/ui/Button';
import { eventData } from '@/data/constants';
import { modalData } from '@/data/modalData';
import { IBookmark } from '@/types/IBookmark';
import { fetchEvents } from '@/api/events/events';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import EventLayout from '@/components/events/EventLayout';
import PaginationComponent from '@/components/community/Pagination';
import { totalEventsState, searchOptionState } from '@/states/Events';
import Container from '../ui/Container';

export default function EventList() {
  const { openModal } = useModal();
  const [page, setPage] = useState(1); // 페이지 번호
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [pagePerEvents, setPagePerEvents] = useState(1);
  const searchOption = useRecoilValue(searchOptionState); // 검색 옵션을 관리하는 recoil State
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [eventsList, setEventsList] = useState<IEvents[]>([]); // 모든 이벤트 목록
  const [totalEvents, setTotalEvents] = useRecoilState(totalEventsState); // 등록된 모든 이벤트의 개수
  const [localBookmarked, setLocalBookmarked] = useState<IBookmark[]>([]);

  useEffect(() => {
    // 모든 이벤트 조회 (쿼리 파라미터로 page)
    const fetchEventsData = async () => {
      try {
        const response = await fetchEvents(page - 1);
        setEventsList(response.data.content);
        setTotalEvents(response.data.totalElements);
        setPagePerEvents(response.data.numberOfElements);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        openModal({
          ...modalData.EVENT_RESPONSE_ERROR,
        });
      }
    };

    fetchEventsData();

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
  }, [openModal, page, setTotalEvents, totalEvents]);

  // page button click에 따른 현재 페이지 번호 핸들링
  const handleChange = (page: number) => {
    setPage(page);
  };

  // 공고 등록 페이지로 이동
  const handleMovePostEvent = () => {
    location.assign('/seller/new');
  };

  // 검색 옵션에 따른 이벤트 조회
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
    <Container>
      <div className="mb-8 rounded-lg bg-white py-8 drop-shadow-md sm:mx-auto sm:mb-8 sm:p-12">
        <div className="flex items-center justify-evenly sm:mt-0 sm:justify-between">
          <Title text={eventData.EVENT_LIST_TITLE} />
          {isSeller && (
            <div className="sm:min-w-[12rem]">
              <Button onClick={handleMovePostEvent} contents={'공고 등록'} />
            </div>
          )}
        </div>
        <div className="container mx-auto mt-8">
          <div className="flex flex-wrap justify-center sm:justify-between">
            {searchedList.map((event) => (
              <EventLayout key={event.id} {...event} />
            ))}
          </div>
        </div>
        <div className="mx-auto flex justify-center sm:max-w-[36rem]">
          <PaginationComponent
            page={page}
            totalPostCount={totalEvents}
            itemsCountPerPage={pagePerEvents}
            pageRangeDisplayed={totalPage}
            onChange={handleChange}
          />
        </div>
      </div>
    </Container>
  );
}
