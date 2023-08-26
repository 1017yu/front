import { useRecoilValue } from 'recoil';
import Title from '@/components/ui/Title';
import Button from '@/components/ui/Button';
import { eventData } from '@/data/constants';
import customToast from '@/utils/customToast';
import { useNavigate } from 'react-router-dom';
import { eventFormState } from '@/states/Events';
import PostDesc from '@/components/seller/PostDesc';
import { modifyEvent } from '@/api/seller/modifyEvent';
import PostPeriod from '@/components/seller/PostPeriod';
import ModifyImage from '@/components/seller/ModifyImage';
import PostLocation from '@/components/seller/PostLocation';
import PostCategory from '@/components/seller//PostCategory';
import PostEventName from '@/components/seller/PostEventName';

export default function ModifyForm() {
  const navigate = useNavigate();
  const eventFormValue = useRecoilValue(eventFormState);

  const modifyValue = {
    category: eventFormValue.category,
    name: eventFormValue.name,
    city: eventFormValue.city,
    district: eventFormValue.district,
    startDate: eventFormValue.startDate,
    endDate: eventFormValue.endDate,
    description: eventFormValue.description,
    id: eventFormValue.id,
    thumbnailUrl: eventFormValue.thumbnailUrl,
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await modifyEvent(modifyValue);
      customToast('행사가 수정되었습니다!', 'success');
      navigate(`/events/${eventFormValue.id}`);
    } catch (error) {
      customToast('모든 항목을 기입해주세요!', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto flex flex-col gap-2 rounded-lg bg-white px-10 py-12 drop-shadow-md sm:mt-16 sm:max-w-[768px] sm:px-40 "
    >
      <Title text={eventData.EVENT_MODIFY_STORE} center />
      <PostCategory />
      <PostEventName />
      <PostLocation />
      <PostPeriod />
      <PostDesc />
      <ModifyImage value={modifyValue.thumbnailUrl} label={'이미지 변경'} />
      <Button submit contents={'수정'} />
    </form>
  );
}
