import { useRecoilValue } from 'recoil';
import Title from '@/components/ui/Title';
import { useModal } from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { modalData } from '@/data/modalData';
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
  const { openModal } = useModal();
  const navigate = useNavigate();
  const [tokenValue, setTokenValue] = useState('');
  const eventFormValue = useRecoilValue(eventFormState);

  useEffect(() => {
    // 로컬스토리지에서 user의 value get
    const getUser = localStorage.getItem('user');

    // 로컬 스토리지에 user 값이 존재할 때
    if (getUser) {
      // role value 파싱
      const accessToken = JSON.parse(getUser).accessToken;

      // state에 저장
      setTokenValue(accessToken);
    }
  }, []);

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
      await postEvent(eventFormValue, tokenValue);
      customToast('행사가 등록되었습니다!', 'success');
      navigate('/events');
    } catch (error: any) {
      // TOFIXED: alert는 작동하는데 왜 모달이 열리지 않을까
      openModal({
        ...modalData.SELLER_POST_RESPONSE_ERROR,
        content: `${error.message}`,
        cancelCallback: () => {
          navigate('/signin');
        },
      });
      alert(error.message);
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
