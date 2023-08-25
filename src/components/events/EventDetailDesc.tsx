import EventMap from './EventMap';
import Hr from '@/components/ui/Hr';
import { IEvent } from '@/types/IEvent';
import { eventData } from '@/data/constants';
import EventTitle from '@/components/events/EventTitle';

export default function EventDetailDesc({ description }: IEvent) {
  return (
    <>
      <div className="mb-4 mt-8 sm:mt-16">
        <EventTitle title={eventData.EVENT_DETAIL_DESCRIPTION.title} center />
        <div className="mt-2 min-h-[6rem] rounded-sm text-center text-lg text-gray-600 sm:mt-4 sm:min-h-[10rem]">
          {description}
        </div>
        <Hr />
      </div>

      <div className="mb-4 mt-8 hidden sm:mt-16 sm:block">
        <EventTitle title={eventData.EVENT_DETAIL_MAP.title} center />
        <div className="mt-4 flex justify-center">
          <EventMap />
        </div>
        <Hr />
      </div>
    </>
  );
}
