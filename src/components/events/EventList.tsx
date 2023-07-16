import { useState } from 'react';
import IEvents from '@/types/IEvents';
import Container from '@/components/ui/Container';
import EventLayout from '@/components/EventLayout';

const dummyEventsData: IEvents[] = [
  {
    id: 1,
    name: '팝업 스토어 A',
    location: '서울 강남구 서초동',
    thumbnail_url: 'https://storage.googleapis.com/1',
    status: '진행중',
    category: '레저/스포츠',
    bookmark: true,
  },
  {
    id: 2,
    name: '팝업 스토어 B',
    location: '서울 강남구 대치동',
    thumbnail_url: 'https://storage.googleapis.com/2',
    category: '레저/스포츠',
    status: '진행중',
    bookmark: true,
  },
  {
    id: 3,
    name: '팝업 스토어 C',
    location: '서울 강남구 신사동',
    thumbnail_url: 'https://storage.googleapis.com/3',
    category: '레저/스포츠',
    status: '진행중',
    bookmark: false,
  },
  {
    id: 4,
    name: '팝업 스토어 D',
    location: '서울 강남구 역삼동',
    thumbnail_url: 'https://storage.googleapis.com/3',
    category: '레저/스포츠',
    status: '진행중',
    bookmark: false,
  },
  {
    id: 5,
    name: '팝업 스토어 E',
    location: '서울 강남구 도곡동',
    thumbnail_url: 'https://storage.googleapis.com/3',
    category: '레저/스포츠',
    status: '진행중',
    bookmark: false,
  },
  {
    id: 6,
    name: '팝업 스토어 F',
    location: '서울 강남구 압구정동',
    thumbnail_url: 'https://storage.googleapis.com/3',
    category: '레저/스포츠',
    status: '진행중',
    bookmark: false,
  },
];

function EventList() {
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [isSearched, setIsSearched] = useState<boolean>(false); // 검색 전, 검색 후

  const numOfEvent = dummyEventsData.length; // 등록된 이벤트의 개수
  const title = isSearched ? `${numOfEvent}개의 이벤트` : '행사 리스트'; // 판매자 로그인 때, 비 로그인 & 일반 유저일 때의 title

  return (
    <Container>
      <div className="text- flex h-40 items-center text-5xl">{title}</div>
      <div className="flex flex-wrap justify-between gap-5">
        {dummyEventsData.map((event) => (
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
    </Container>
  );
}

export default EventList;
