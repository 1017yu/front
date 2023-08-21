export interface ISigninRequestBody {
  email: string;
  password: string;
}

export interface IServerUser {
  userId: string;
  email: string;
  nickname: string;
  profileImgUrl: string;
  accessToken: string;
  refreshToken: string;
  role: 'ROLE_USER' | 'ROLE_SELLER';
}

export type ILocalUser = Omit<IServerUser, 'userId'>;
