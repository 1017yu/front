import { atom } from 'recoil';
import { IEvent } from '@/types/IEvent';

export const eventState = atom<IEvent>({
  key: 'eventState',
  default: {
    id: '',
    thumbnailUrl: '',
    name: '',
    nickname: '',
    city: '',
    district: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    createdAt: '',
    updatedAt: '',
    status: '', // 진행중/마감
    isOwner: false,
    isParticipant: false,
    participants: [],
  },
});
