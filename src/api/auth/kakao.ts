import { apiInstance } from '../axios';

export const kakaologin = async (accessToken: string) => {
  [];
  const response = await apiInstance.post('/auth/kakaologin', {
    accessToken,
  });
  return response.data;
};
