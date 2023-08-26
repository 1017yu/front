import { useRecoilValue } from 'recoil';
import Title from '@/components/ui/Title';
import Button from '@/components/ui/Button';
import { eventFormState } from '@/states/Events';
import { eventData } from '@/data/constants';
import customToast from '@/utils/customToast';
import { useNavigate } from 'react-router-dom';
import PostDesc from '@/components/seller/PostDesc';
import { modifyEvent } from '@/api/seller/modifyEvent';
import PostPeriod from '@/components/seller/PostPeriod';
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
    thumbnailUrl: 'test',
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
      className="container mx-auto mb-10 flex flex-col gap-4 rounded-md bg-white px-8 sm:mx-24 sm:mt-16 sm:px-24 sm:py-12"
    >
      <Title text={eventData.EVENT_MODIFY_STORE} />
      <PostCategory />
      <PostEventName />
      <PostLocation />
      <PostPeriod />
      <PostDesc />
      <Button submit contents={'수정'} />
    </form>
  );
}
