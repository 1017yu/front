import { atom } from 'recoil';
import { TAdressType } from '@/types/TAdressType';

export const AdressState = atom<TAdressType>({
  key: 'AdressState',
  default: {
    region: '지역',
    state: '시/군/구',
    category: '카테고리',
  },
});
