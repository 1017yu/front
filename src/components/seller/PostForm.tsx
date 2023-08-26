import { useRecoilValue } from 'recoil';
import Title from '@/components/ui/Title';
import Button from '@/components/ui/Button';
import { eventData } from '@/data/constants';
import customToast from '@/utils/customToast';
import { useNavigate } from 'react-router-dom';
import { eventFormState } from '@/states/Events';
import { postEvent } from '@/api/seller/postEvent';
import PostDesc from '@/components/seller/PostDesc';
import PostImage from '@/components/seller/PostImage';
import PostPeriod from '@/components/seller/PostPeriod';
import PostLocation from '@/components/seller/PostLocation';
import PostCategory from '@/components/seller/PostCategory';
import PostEventName from '@/components/seller/PostEventName';

export default function PostForm() {
  const navigate = useNavigate();
  const eventFormValue = useRecoilValue(eventFormState);

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !eventFormValue.name.trim() ||
      !eventFormValue.city ||
      !eventFormValue.district ||
      !eventFormValue.startDate ||
      !eventFormValue.endDate ||
      !eventFormValue.description ||
      eventFormValue.category === '카테고리'
    ) {
      customToast('모든 항목을 기입해주세요!', 'error');
      return;
    }

    try {
      await postEvent(eventFormValue);
      customToast('행사가 등록되었습니다!', 'success');
      navigate('/events');
    } catch (error) {
      customToast('등록에 실패했습니다!', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto flex flex-col gap-2 rounded-lg bg-white px-10 py-12 drop-shadow-md sm:mt-16 sm:max-w-[768px] sm:px-40 sm:py-12"
    >
      <Title text={eventData.EVENT_POST_STORE.title} center />
      <PostCategory />
      <PostEventName />
      <PostLocation />
      <PostPeriod />
      <PostDesc />
      <PostImage value={eventFormValue.thumbnailUrl} label={'이미지 등록'} />
      <Button submit contents={'등록'} />
    </form>
  );
}
