import { apiInstance } from '../axios';

export const restUserProfile = async () => {
  const response = await apiInstance('/profile');
  return response.data;
};

export const editUserInfo = async (userEditData: {
  profileImgUrl: string;
  nickname: string;
  city: string;
  district: string;
}) => {
  const response = await apiInstance.put('/profile', userEditData);
  return response.data;
};
