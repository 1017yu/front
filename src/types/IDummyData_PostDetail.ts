import IDummyData_Comments from './IDummyData_PostComments';

export default interface IDummyData_PostDetail {
  nickname: string;
  title: string;
  content: string;
  created_at: number;
  updated_at: number;
  comments: IDummyData_Comments[];
}
