import { IEvent } from '@/types/IEvent';
import Status from '@/components/ui/Status';
import { formatDate } from '@/utils/community/dateFormat';
import EventButton from '@/components/events/EventButton';

export default function EventDetailBox({ ...props }: IEvent) {
  return (
    <div className="mx-auto mb-4 mt-6 flex min-h-[24rem] max-w-[1200px] flex-col justify-between rounded-md border border-subTextAndBorder px-4 py-8 sm:my-20 sm:h-[20rem] sm:px-8 sm:py-12 lg:px-16">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="pb-2 text-sm text-subTextAndBorder sm:pb-2 sm:text-xl">
            {props.category}
          </div>
          <div className="pb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {props.name}
          </div>
          <div className="pb-2 text-sm text-gray-500 sm:pb-4 lg:text-xl">
            {props.city}
          </div>
          <div className="mb-2 border-accent text-2xl sm:mb-4 lg:text-2xl">
            셀러 {props.nickname}
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <div className="pb-2 text-xl font-semibold text-accent sm:text-2xl">
              <Status status={props.status} />
            </div>
            <div className="text-slate-600">행사 기간</div>
            <div className="sm:mb-2 sm:text-base lg:text-xl">
              {formatDate(props.startDate as string)} - {''}
              {formatDate(props.endDate as string)}
            </div>
          </div>
        </div>
      </div>
      <EventButton
        isOwner={props.isOwner}
        isParticipant={props.isParticipant}
      />
    </div>
  );
}
