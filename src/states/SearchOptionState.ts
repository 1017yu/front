import { atom } from 'recoil';
import { TSearchOptions } from '@/types/TSearchOptions';

export const SearchOptionState = atom<TSearchOptions>({
  key: 'SearchOptionState',
  default: {
    city: '',
    district: '',
    category: '',
  },
});
