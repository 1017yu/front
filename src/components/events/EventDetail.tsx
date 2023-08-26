import { useEffect } from 'react';
import NotFound from '@/routes/NotFound';
import { eventState } from '@/states/Event';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '@/api/events/event';
import { eventFormState } from '@/states/Events';
import { participateState } from '@/states/Events';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import EventDetailBox from '@/components/events/EventDetailBox';
import EventDetailDesc from '@/components/events/EventDetailDesc';
import EventDetailSeller from '@/components/events/EventDetailSeller';

export default function EventDetail() {
  // 행사 id 값 선언
  const { id } = useParams();

  // 행사 참여 여부 recoil atom 구독
  const isParticipate = useRecoilValue(participateState);

  // 해당 이벤트 state
  const [eventData, setEventData] = useRecoilState(eventState);
  const setEventFormValue = useSetRecoilState(eventFormState);

  useEffect(() => {
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
  }, [id, isParticipate, setEventData]);

  return (
    <div className="container mx-auto pb-16 sm:px-20">
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
          <EventDetailSeller participants={eventData.participants} />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
