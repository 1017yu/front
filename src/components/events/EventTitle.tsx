import { IEventTitle } from '@/types/IEvent';

export default function EventTitle({ title, center }: IEventTitle) {
  return (
    <div
      className={`${
        center ? 'text-center' : 'text-left'
      }  align-baseline text-2xl font-semibold sm:text-3xl`}
    >
      {title}
    </div>
  );
}
