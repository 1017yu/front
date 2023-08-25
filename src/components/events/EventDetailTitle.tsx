import { IEventDetailTitle } from '@/types/IEvent';

export default function EventDetailTitle({ title }: IEventDetailTitle) {
  return (
    <div className="mb-4 mt-24 text-center text-2xl font-bold sm:text-5xl">
      {title}
    </div>
  );
}
