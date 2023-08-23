import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { IEventJoinProps } from '@/types/IEvent';

export default function EventJoinButton({
  isOwner,
  isParticipant,
}: IEventJoinProps) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = localStorage.getItem('user');

    // 로컬 스토리지에 user 값이 존재할 때
    if (getUserRole) {
      const parsedUserRole = JSON.parse(getUserRole).role;
      setUserRole(parsedUserRole);
    }
  }, []);

  // userRole이 셀러이고, 미참여 중이라면
  if (userRole === 'ROLE_SELLER' && isParticipant === false) {
    return <Button contents={'참가하기'} />;
    // useRole이 셀러이고, 참여중이라면
  } else if (userRole === 'ROLE_SELLER' && isParticipant === true) {
    return <Button contents={'참가 취소'} secondary />;
    // 글 작성자라면
  } else if (isParticipant === isOwner) {
    return <Button contents={'행사 삭제'} secondary />;
  }
  // 로컬 스토리지에 user 값이 존재하지 않거나 셀러가 아닌 경우
  return <Button contents={'참가하기'} disabled />;
}
