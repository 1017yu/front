import { IParticipantsProps } from '@/types/IEvent';
import Title from '@/components/ui/Title';
import { eventData } from '@/data/constants';
import Participants from '@/components/ui/Participants';

export default function EventDetailSeller(props: IParticipantsProps) {
  const { participants } = props;

  return (
    <div className="mt-8 sm:mt-16">
      <Title text={eventData.EVENT_JOIN_SELLER} center />
      <div className="mt-4">
        <Participants participants={participants} />
      </div>
    </div>
  );
}
