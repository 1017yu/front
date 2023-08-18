export interface ISignupRequestBody {
  email: string;
  password: string;
  nickname: string;
  city: string;
  district: string;
}

export interface ISignupErrorResponse {
  errorCode: number;
  message: string;
}
