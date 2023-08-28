import Input from '@/components/ui/Input';
import { useRecoilState } from 'recoil';
import { eventData } from '@/data/constants';
import { eventFormState } from '@/states/Events';

export default function PostDescInput() {
  // 이벤트 등록 Recoil Atom
  const [eventFormValue, setEventFormValue] = useRecoilState(eventFormState);

  // 행사 상세 설명 핸들러
  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventFormValue({
      ...eventFormValue,
      [name]: value,
    });
  };

  // TO-FIXED: 추후에 onblur 방식으로 리팩토링 필요
  return (
    <div className="flex flex-col rounded-md ">
      <Input
        name="description"
        onChange={handleDescChange}
        value={eventFormValue.description}
        label={eventData.EVENT_POST_STORE.label.descripton[0]}
        placeholder={eventData.EVENT_POST_STORE.label.descripton[1]}
      />
    </div>
  );
}
