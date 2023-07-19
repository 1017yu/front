import { atom } from 'recoil';
import { v1 } from 'uuid';
import { TModalType } from '@/types/TModalType';

export const modalState = atom<TModalType>({
  key: `modalState/${v1()}`,
  default: {
    isOpen: false,
    type: 'basic',
    title: '',
    content: '',
    okButton: '확인',
    cancelButton: '취소',
  },
});
