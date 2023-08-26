import { useRecoilValue } from 'recoil';
import { eventFormState } from '@/states/Events';
import default_thumbnail from '@/assets/default_thumbnail.jpg';

export default function EventDetailBg() {
  const eventFormValue = useRecoilValue(eventFormState);
  const thumbnailUrl = eventFormValue.thumbnailUrl;

  return (
    <div className="bg-black">
      <img
        src={thumbnailUrl === '' ? default_thumbnail : thumbnailUrl}
        alt="thumbnail"
        className="mx-auto h-[32rem] object-cover md:w-full"
      />
    </div>
  );
}
