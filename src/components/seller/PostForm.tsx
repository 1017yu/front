import { useRecoilValue } from 'recoil';
import PostDesc from '@/components/seller/PostDesc';
import PostTitle from '@/components/seller/PostTitle';
import PostPeriod from '@/components/seller/PostPeriod';
import { PostEventState } from '@/states/PostEventState';
import PostLocation from '@/components/seller/PostLocation';
import PostCategory from '@/components/seller/PostCategory';
import PostEventName from '@/components/seller/PostEventName';
import { postEvent } from '@/api/seller/postEvent';
import Button from '../ui/Button';
import customToast from '@/utils/customToast';

export default function PostForm() {
  const postEventData = useRecoilValue(PostEventState);

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await postEvent(postEventData);
      customToast('행사가 등록되었습니다!', 'success');
    } catch (error) {
      customToast('모든 항목을 기입해주세요!', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto mb-10 flex flex-col gap-8 bg-gray-100 px-10 sm:mb-0 sm:px-40"
    >
      <PostTitle />
      <PostCategory />
      <PostEventName />
      <PostLocation />
      <PostPeriod />
      <PostDesc />
      <Button submit contents={'등록'} />
    </form>
  );
}
