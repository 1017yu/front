import { API_BASE_URL } from '@/data/constants';
import { ISigninRequestBody } from '@/types/ISignin';
import axios from 'axios';

export default async function signin(signinData: ISigninRequestBody) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signin`,
      signinData,
    );
    return response;
  } catch (error) {
    console.error('signin failed', error);
    throw error;
  }
}
