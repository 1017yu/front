import { ISignupRequestBody } from '@/types/ISignUp';
import { apiInstance } from '../axios';

export async function signup(signupData: ISignupRequestBody) {
  const response = await apiInstance.post('/auth/signup', signupData);
  return response.data;
}

export async function verifyEmailOrNickname(email?: string, nickname?: string) {
  const response = await apiInstance(
    `/auth/check-duplication/?nickname=${nickname}&email=${email}`,
  );
  return response.data;
}

export async function verifyEemail(email: string, registerToken: string) {
  const response = await apiInstance.post('/auth/verify-email', {
    email,
    registerToken,
  });
  return response.data;
}

export async function checkProceed(email: string) {
  const response = await apiInstance.post('/auth/check-proceed', {
    email,
  });
  return response.data;
}

export async function regenerateRegisterToken(email: string) {
  const response = await apiInstance.post('/auth/regenerate-token', {
    email,
  });
  return response.data;
}
