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
export interface ISellerSignupRequestBody {
  email: string;
  password: string;
  address: string;
  nickname: string;
  shopName: string;
  businessNumber: string;
  categories: [1, 2, 3]; // 임시
}
