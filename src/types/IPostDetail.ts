import IPostComments from '@/types/IPostComments';

export default interface IPostDetail {
  content: string;
  createdAt: string;
  id: number;
  nickname: number;
  title: string;
  updatedAt: string;
  comments: IPostComments[];
}
