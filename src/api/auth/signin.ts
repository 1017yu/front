import { ISigninRequestBody } from '@/types/ISignin';
import { apiInstance } from '../axios';

export const signin = async (
  signinData: ISigninRequestBody,
  isSeller: boolean,
) => {
  const response = await apiInstance.post(
    `/auth/signin?role=${isSeller ? 'seller' : ''}`,
    signinData,
  );
  return response.data;
};
