import { IEvent } from '@/types/IEvent';
import NotFound from '@/routes/NotFound';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '@/api/events/event';
import EventDetailBox from '@/components/events/EventDetailBox';
import EventDetailDesc from '@/components/events/EventDetailDesc';
import EventDetailSeller from '@/components/events/EventDetailSeller';

export default function EventDetail() {
  // 행사 id 값 선언
  const { id } = useParams();
  const [eventData, setEventData] = useState<IEvent>(); // 모든 이벤트 목록

  useEffect(() => {
    // id 값이 존재할 때, fetchEvent
    if (id) {
      fetchEvent(id).then((res) => {
        try {
          setEventData(res.data);
        } catch (error) {
          alert(error);
        }
      });
    }
  }, [id]);

  return (
    <div className="container mx-auto sm:px-20">
      {eventData ? (
        <>
          <EventDetailBox
            id={id}
            thumbnailUrl={eventData.thumbnailUrl}
            name={eventData.name}
            hostName={eventData.hostName}
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
          />
          <EventDetailDesc description={eventData.description} />
          <EventDetailSeller />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
