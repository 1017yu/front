import { IEvent } from '@/types/IEvent';
import { eventData } from '@/data/constants';
import Participants from '@/components/ui/Participants';
import EventDetailTitle from '@/components/events/EventTitle';

export default function EventDetailSeller({ participants }: IEvent) {
  return (
    <div className="mt-8 sm:mt-16">
      <EventDetailTitle title={eventData.EVENT_JOIN_SELLER} center />
      <div className="mt-4">
        <Participants participants={participants} />
      </div>
    </div>
  );
}
