import { apiInstance } from '../axios';

export async function secession(email: string, password: string) {
  const response = await apiInstance.post('/auth/secession', {
    email,
    password,
  });
  return response.data;
}
