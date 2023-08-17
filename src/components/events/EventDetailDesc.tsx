import { IEvent } from '@/types/IEvent';

export default function EventDetailDesc({ description }: IEvent) {
  return (
    <div className="mb-12 min-h-[60rem] bg-slate-400 sm:min-h-[60rem] sm:px-16 sm:py-16">
      {description}
    </div>
  );
}
