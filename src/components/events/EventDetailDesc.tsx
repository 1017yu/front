import EventMap from './EventMap';
import { IEvent } from '@/types/IEvent';
import { EVENTS_DESCRIPTION } from '@/data/constants';
import EventDetailTitle from '@/components/events/EventDetailTitle';

export default function EventDetailDesc({ description }: IEvent) {
  return (
    <>
      <EventDetailTitle title={EVENTS_DESCRIPTION.discription} />
      <div className="m-4 min-h-[6rem] rounded-sm text-center text-lg text-gray-600 sm:m-4 sm:min-h-[10rem]">
        {description}
      </div>

      <EventDetailTitle title={EVENTS_DESCRIPTION.map} />
      <div className="flex justify-center">
        <EventMap />
      </div>
    </>
  );
}
