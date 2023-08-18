import { apiInstance } from '../axios';

export const signout = async () => {
  const response = await apiInstance.post('/auth/signin');
  return response.data;
};
