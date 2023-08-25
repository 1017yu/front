import { atom } from 'recoil';
import { TSearchOptions } from '@/types/TSearchOptions';
import { TPostEventType } from '@/types/TPostEventType';

export const postEventState = atom<TPostEventType>({
  key: 'postEventState',
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

export const searchOptionState = atom<TSearchOptions>({
  key: 'searchOptionState',
  default: {
    city: '',
    district: '',
    category: '',
  },
});

export const participateState = atom({
  key: 'participateState',
  default: false,
});

export const numberOfEventState = atom({
  key: 'numberOfEventState',
  default: 0,
});
