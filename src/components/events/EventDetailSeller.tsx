import { IEvent } from '@/types/IEvent';
import { JOIN_SELLER } from '@/data/constants';
import Participants from '@/components/ui/Participants';
import EventDetailTitle from '@/components/events/EventDetailTitle';

export default function EventDetailSeller({ participants }: IEvent) {
  return (
    <div>
      <EventDetailTitle title={JOIN_SELLER} />
      <div>
        <Participants participants={participants} />
      </div>
    </div>
  );
}
