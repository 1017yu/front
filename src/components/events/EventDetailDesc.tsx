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
      <>
        <Title text={eventData.EVENT_DETAIL_DESCRIPTION} center />
        <div className="mt-4 min-h-[6rem] rounded-sm text-center text-lg text-gray-600 sm:mt-8 sm:min-h-[10rem]">
          {description}
        </div>
        <Hr />
      </>
    </>
  );
}
