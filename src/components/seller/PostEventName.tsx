import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import Input from '@/components/ui/Input';
import { POST_INPUT_TITLE } from '@/data/postCategory';
import { PostEventState } from '@/states/PostEventState';

export default function PostEventName() {
  // 이벤트 등록 Recoil Atom
  const [eventState, setEventState] = useRecoilState(PostEventState);

  const handleEventNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventState((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col rounded-md">
      <Input
        name="name"
        onChange={handleEventNameChange}
        value={eventState.name as string}
        label={POST_INPUT_TITLE.name[0]}
        placeholder={POST_INPUT_TITLE.name[1]}
      />
    </div>
  );
}
