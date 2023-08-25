import { eventData } from '@/data/constants';

export default function PostTitle() {
  return (
    <div className="mt-16 text-center text-2xl font-semibold sm:text-left sm:text-3xl">
      {eventData.EVENT_POST_TITLE}
    </div>
  );
}
