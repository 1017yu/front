import { ISigninRequestBody } from '@/types/ISignin';
import { apiInstance } from '../axios';

export const signin = async (signinData: ISigninRequestBody) => {
  const response = await apiInstance.post('/auth/signin', signinData);
  return response.data;
};
