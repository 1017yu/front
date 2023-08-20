import { apiInstance } from '../axios';

export const forgotpassword = async (email: string) => {
  const response = await apiInstance.post('/auth/forgotpassword', {
    email,
  });
  return response.data;
};
