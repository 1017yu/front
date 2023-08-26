import EventMap from './EventMap';
import Hr from '@/components/ui/Hr';
import Title from '@/components/ui/Title';
import { eventData } from '@/data/constants';

export default function EventDetailDesc({
  description,
}: {
  description: string;
}) {
  return (
    <>
      <div className="mb-4 mt-8 sm:mt-16">
        <Title text={eventData.EVENT_DETAIL_DESCRIPTION} center />
        <div className="mt-2 min-h-[6rem] rounded-sm text-center text-lg text-gray-600 sm:mt-4 sm:min-h-[10rem]">
          {description}
        </div>
        <Hr />
      </div>

      <div className="mb-4 mt-8 hidden sm:mt-16 sm:block">
        <Title text={eventData.EVENT_DETAIL_MAP} center />
        <div className="mt-4 flex justify-center">
          <EventMap />
        </div>
        <Hr />
      </div>
    </>
  );
}
