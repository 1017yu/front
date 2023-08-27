export default interface IPostComments {
  content: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  member: {
    email: string;
    id: number;
    inactive: boolean;
    nickname: string;
    profileUrl: string;
  };
}
