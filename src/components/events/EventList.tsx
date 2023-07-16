import { useState } from 'react';
import Container from '@/components/ui/Container';
import EventLayout from '@/components/EventLayout';
import { dummyEventsData } from '@/types/IEvents';

function EventList() {
  const [isSeller, setIsSeller] = useState<boolean>(false); // 일반 유저 or 셀러
  const [isSearched, setIsSearched] = useState<boolean>(false); // 검색 전, 검색 후

  const numOfEvent = dummyEventsData.length; // 등록된 이벤트의 개수
  const title = isSearched ? `${numOfEvent}개의 이벤트` : '행사 리스트'; // 판매자 로그인 때, 비 로그인 & 일반 유저일 때의 title

  return (
    <div className="container mx-auto px-8 md:px-20">
      <div className="mt-[-3rem] flex h-40 items-center text-2xl md:mt-0 md:text-5xl">
        {title}
      </div>
      <section className="body-font text-gray-600">
        <div className="container mx-auto ">
          <div className="flex flex-wrap justify-between">
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
        </div>
      </section>
    </div>
  );
}

export default EventList;
