import { IEvent } from '@/types/IEvent';
import Button from '@/components/ui/Button';
import { IoMdHeartEmpty, IoMdLink } from 'react-icons/io';

export default function EventDetailBox({ ...rest }: IEvent) {
  const formatDate = (dateTimeString: string) => {
    const dateObj = new Date(dateTimeString);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <div className="mb-4 mt-6 flex min-h-[15rem] justify-between border border-black px-4 py-8 sm:my-8 sm:h-[20rem] sm:px-32 sm:py-12">
      <div className="flex w-1/2 flex-col">
        <div className="pb-2 text-sm text-subTextAndBorder sm:pb-2 sm:text-xl">
          {rest.category}
        </div>
        <div className="sm:pb- pb-2 text-3xl sm:text-5xl">{rest.name}</div>
        <div className="pb-2 text-sm sm:pb-4 sm:text-xl">{rest.location}</div>
        <div className="sm-pb-8 pb-4 text-xl sm:text-2xl">{rest.hostName}</div>
        <div className="flex cursor-pointer gap-4 text-2xl sm:text-4xl md:gap-8">
          <IoMdHeartEmpty />
          <IoMdLink />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="sm:pb-2 sm:text-xl">
            행사 시작일: {formatDate(rest.startDate as string)}
          </div>
          <div className="mb-4 sm:mb-8 sm:text-xl">
            행사 마감일: {formatDate(rest.endDate as string)}
          </div>
          <div className="text-2xl text-accent sm:text-4xl">{rest.status}</div>
        </div>
        <Button contents={'신청하기'} />
      </div>
    </div>
  );
}
