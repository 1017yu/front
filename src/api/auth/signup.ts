import { ISignupRequestBody } from '@/types/ISignUp';
import { apiInstance } from '../axios';

export async function signup(signupData: ISignupRequestBody) {
  const response = await apiInstance.post('/auth/signup', signupData);
  return response.data;
}

export async function verifyEmailOrNickname(email?: string, nickname?: string) {
  const url = email
    ? `/auth/check-duplication?email=${email}`
    : `/auth/check-duplication?nickname=${nickname}`;
  const response = await apiInstance(url);
  return response.data;
}

export async function verifyEemail(email: string, registerToken: string) {
  const response = await apiInstance.post('/auth/verify-email', {
    email,
    registerToken,
  });
  // reponse.data에 안담아줬음
  return response;
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
