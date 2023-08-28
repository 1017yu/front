import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import Input from '@/components/ui/Input';
import { eventData } from '@/data/constants';
import { eventFormState } from '@/states/Events';

export default function PostEventName() {
  // 이벤트 등록 Recoil Atom
  const [eventFormValue, setEventFormValue] = useRecoilState(eventFormState);

  const handleEventNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventFormValue((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col rounded-md">
      <Input
        name="name"
        onChange={handleEventNameChange}
        value={eventFormValue.name}
        label={eventData.EVENT_POST_STORE.label.name[0]}
        placeholder={eventFormValue.name}
      />
    </div>
  );
}
