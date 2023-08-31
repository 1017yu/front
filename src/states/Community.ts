import { ICommentState } from '@/types/IPostComments';
import { atom } from 'recoil';

export const commentState = atom<ICommentState>({
  key: 'commentState',
  default: {
    id: 0,
    email: '',
    nickname: '',
    profileUrl: '',
    inactive: false,
    content: '',
    isEdited: false,
    isDeleted: false,
    isPosted: false,
  },
});
