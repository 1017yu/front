import { useEffect } from 'react';
import NotFound from '@/routes/NotFound';
import { eventState } from '@/states/Event';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '@/api/events/event';
import { eventFormState } from '@/states/Events';
import { participateState } from '@/states/Events';
import EventMap from '@/components/events/EventMap';
import EventDetailBox from '@/components/events/EventDetailBox';
import EventDetailDesc from '@/components/events/EventDetailDesc';
import EventDetailSeller from '@/components/events/EventDetailSeller';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function EventDetail() {
  // 행사 id 값 선언
  const { id } = useParams();

  // 행사 참여 여부 recoil atom 구독
  const isParticipate = useRecoilValue(participateState);

  // 해당 이벤트 state
  const [eventData, setEventData] = useRecoilState(eventState);
  const setEventFormValue = useSetRecoilState(eventFormState);

  useEffect(() => {
    window.scroll(0, 0);

    // id 값이 존재할 때, fetchEvent
    if (id) {
      fetchEvent(id).then((res) => {
        try {
          setEventData(res.data);
          setEventFormValue(res.data);
        } catch (error) {
          alert(error);
        }
      });
    }
  }, [id, isParticipate, setEventData, setEventFormValue]);

  return (
    <div className="container mx-auto my-12 rounded-lg bg-white pb-16 drop-shadow-md sm:max-w-[1250px] sm:p-16">
      {eventData ? (
        <>
          <EventDetailBox
            id={id as string}
            thumbnailUrl={eventData.thumbnailUrl}
            name={eventData.name}
            nickname={eventData.nickname}
            city={eventData.city}
            district={eventData.district}
            category={eventData.category}
            startDate={eventData.startDate}
            endDate={eventData.endDate}
            createdAt={eventData.createdAt}
            updatedAt={eventData.updatedAt}
            status={eventData.status}
            isOwner={eventData.isOwner}
            isParticipant={eventData.isParticipant}
            description={eventData.description}
          />
          <EventDetailDesc description={eventData.description} />
          <EventMap />
          <EventDetailSeller participants={eventData.participants} />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
