export interface ISigninRequestBody {
  email: string;
  password: string;
}

export interface LocalUser {
  email: string;
  nickname: string;
  profileImgUrl: string;
  accessToken: string;
  refreshToken: string;
}
export interface ServerUser extends LocalUser {
  userId: number;
}
