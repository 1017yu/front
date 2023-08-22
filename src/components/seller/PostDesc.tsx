import Input from '@/components/ui/Input';
import { useRecoilState } from 'recoil';
import { POST_INPUT_TITLE } from '@/data/constants';
import { PostEventState } from '@/states/PostEventState';

export default function PostDescInput() {
  // 이벤트 등록 Recoil Atom
  const [eventState, setEventState] = useRecoilState(PostEventState);

  // 행사 상세 설명 핸들러
  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventState({
      ...eventState,
      [name]: value,
    });
  };

  // TO-FIXED: 추후에 onblur 방식으로 리팩토링 필요
  return (
    <div className="flex flex-col rounded-md">
      <Input
        name="description"
        onChange={handleDescChange}
        value={eventState.description as string}
        label={POST_INPUT_TITLE.descripton[0]}
        placeholder={POST_INPUT_TITLE.descripton[1]}
      />
    </div>
  );
}
