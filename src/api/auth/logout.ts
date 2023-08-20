import { apiInstance } from '../axios';

export const logout = async (refreshToken: string) => {
  const response = await apiInstance('/auth/logout', {
    headers: {
      RefreshToken: refreshToken,
    },
  });
  return response.data;
};
