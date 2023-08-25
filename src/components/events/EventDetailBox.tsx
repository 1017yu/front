import { IEvent } from '@/types/IEvent';
import { EVENT_PAGE_MESSAGE } from '@/data/constants';
import EventJoinButton from '@/components/events/EventJoinButton';

export default function EventDetailBox({ ...props }: IEvent) {
  const formatDate = (dateTimeString: string) => {
    const dateObj = new Date(dateTimeString);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <div className="mb-4 mt-6 flex min-h-[15rem] justify-between border border-subTextAndBorder px-4 py-8 sm:my-8 sm:h-[20rem] sm:px-8 sm:py-12 lg:px-32">
      <div className="flex w-1/2 flex-col">
        <div className="pb-2 text-sm text-subTextAndBorder sm:pb-2 sm:text-xl">
          {props.category}
        </div>
        <div className="pb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
          {props.name}
        </div>
        <div className="pb-2 text-sm text-gray-500 sm:pb-4 lg:text-xl">
          {props.city}
        </div>
        <div className="mb-2 border-accent text-2xl text-accent sm:mb-4 lg:text-4xl">
          {props.status}
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <div className="pb-2 text-xl font-semibold sm:text-2xl">
            {props.nickname}
          </div>
          <div className="sm:mb-2 sm:text-base lg:text-xl">
            {EVENT_PAGE_MESSAGE.startDate}
            {formatDate(props.startDate as string)}
          </div>
          <div className="mb-4 sm:mb-6 sm:text-base lg:text-xl">
            {EVENT_PAGE_MESSAGE.endDate}
            {formatDate(props.endDate as string)}
          </div>
        </div>
        <EventJoinButton
          isOwner={props.isOwner}
          isParticipant={props.isParticipant}
        />
      </div>
    </div>
  );
}
