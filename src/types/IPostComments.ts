export default interface IPostComments {
  content: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  member: IComment;
}

export interface IComments {
  comments: IPostComments[];
  id?: number;
}

export interface IComment {
  email: string;
  id: number;
  inactive: boolean;
  nickname: string;
  profileUrl: string;
}

export interface ICommentState extends IComment {
  content: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  isPosted?: boolean;
}
