import { useSetRecoilState } from 'recoil';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/ui/Button';
import { modalData } from '@/data/modalData';
import { eventData } from '@/data/constants';
import customToast from '@/utils/customToast';
import { IEventJoinProps } from '@/types/IEvent';
import { joinEvent } from '@/api/seller/joinEvent';
import { cancelEvent } from '@/api/seller/cancelEvent';
import { deleteEvent } from '@/api/seller/deleteEvent';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  eventFormState,
  totalEventsState,
  participateState,
} from '@/states/Events';

export default function EventButton({
  isOwner,
  isParticipant,
}: IEventJoinProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const setIsJoined = useSetRecoilState(participateState);
  const setTotalEvents = useSetRecoilState(totalEventsState);
  const setEventFormValue = useSetRecoilState(eventFormState);

  // 상세페이지에 접근한 유저의 role을 관리
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // 로컬스토리지에서 user의 value get
    const getUserRole = localStorage.getItem('user');

    // 로컬 스토리지에 user 값이 존재할 때
    if (getUserRole) {
      // role value 파싱
      const parsedUserRole = JSON.parse(getUserRole).role;

      // state에 저장
      setUserRole(parsedUserRole);
    }
  }, []);

  // 등록된 행사 참여 handler
  const handleJoinChange = useCallback(() => {
    openModal({
      ...modalData.SELLER_JOIN_CHECK,
      okCallback: async () => {
        if (id) await joinEvent(id);
        customToast('스토어 참가가 등록되었습니다!', 'success');
        setIsJoined((prev) => !prev);
      },
    });
  }, [id, openModal, setIsJoined]);

  // 등록된 행사 삭제 handler
  const handleDeleteChange = useCallback(() => {
    openModal({
      ...modalData.SELLER_DELETE_CHECK,
      okCallback: () => {
        if (id) deleteEvent(id);
        setTotalEvents((v) => v - 1);
        navigate('/events', { replace: true });
        customToast('등록한 스토어가 삭제되었습니다!', 'success');
      },
    });
  }, [openModal, id, setTotalEvents, navigate]);

  // 참가한 행사 수정 handler
  const handleModifyChange = () => {
    // 행사 id가 유효한 경우
    if (id) {
      navigate('/seller/modify');
      setEventFormValue((prev) => ({
        ...prev,
        eventId: id,
      }));
      // 행사 id가 유효하지 않은 경우
    } else {
      customToast('유효하지 않은 스토어입니다!', 'error');
      navigate('/events');
    }
  };

  // 참가한 행사 취소 handler
  const handleCancelChange = useCallback(() => {
    openModal({
      ...modalData.SELLER_CANCEL_CHECK,
      okCallback: async () => {
        if (id) {
          await cancelEvent(id);
          customToast('스토어 참여가 취소되었습니다!', 'success');
          setIsJoined((prev) => !prev);
        } else {
          customToast('유효하지 않은 스토어입니다!', 'error');
          navigate('/events');
        }
      },
    });
  }, [openModal, id, setIsJoined, navigate]);

  // userRole이 셀러이고, 미참여 중이라면
  if (userRole === 'ROLE_SELLER' && !isParticipant) {
    return (
      <Button
        contents={eventData.EVENT_BUTTON_CONTENT.join}
        onClick={handleJoinChange}
      />
    );
    // useRole이 셀러이고, 참여중이며, 글 작성자가 아니라면
  } else if (userRole === 'ROLE_SELLER' && isParticipant && !isOwner) {
    return (
      <Button
        contents={eventData.EVENT_BUTTON_CONTENT.cancel}
        onClick={handleCancelChange}
        secondary
      />
    );

    // 글 작성자라면
  } else if (isOwner) {
    return (
      <div className="flex gap-8 sm:gap-48">
        <Button
          contents={eventData.EVENT_BUTTON_CONTENT.modify}
          onClick={handleModifyChange}
        />
        <Button
          contents={eventData.EVENT_BUTTON_CONTENT.delete}
          onClick={handleDeleteChange}
          secondary
        />
      </div>
    );
    // 셀러 이외의 role을 가졌다면
  } else {
    // 로컬 스토리지에 user 값이 존재하지 않거나 셀러가 아닌 경우
    return;
  }
}
