import { atom } from 'recoil';
import { TPostEventType } from '@/types/TPostEventType';

export const PostEventState = atom<TPostEventType>({
  key: 'PostEventState',
  default: {
    name: '',
    description: '',
    city: '도, 시',
    district: '구, 군',
    category: '레저',
    thumbnailUrl: '',
    startDate: '',
    endDate: '',
  },
});
