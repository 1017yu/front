import { dummyEventData } from '@/types/IEvent';
import EventDetailBox from '@/components/events/EventDetailBox';
import EventDetailDesc from '@/components/events/EventDetailDesc';
import EventDetailSeller from '@/components/events/EventDetailSeller';

export default function EventDetail() {
  return (
    <div className="container mx-auto sm:px-20">
      <EventDetailBox
        id={dummyEventData.id}
        thumbnailUrl={dummyEventData.thumbnailUrl}
        name={dummyEventData.name}
        hostName={dummyEventData.hostName}
        location={dummyEventData.location}
        category={dummyEventData.category}
        startDate={dummyEventData.startDate}
        endDate={dummyEventData.endDate}
        createdAt={dummyEventData.createdAt}
        updatedAt={dummyEventData.updatedAt}
        status={dummyEventData.status}
      />
      <EventDetailDesc description={dummyEventData.description} />
      <EventDetailSeller />
    </div>
  );
}
