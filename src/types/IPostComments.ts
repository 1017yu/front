export default interface IPostComments {
  content: string;
  createdAt: string;
  id: number;
  member: {
    email: string;
    id: number;
    inactive: boolean;
    nickname: string;
    profileUrl: string;
  };
}
