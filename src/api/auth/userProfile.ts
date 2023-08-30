import { apiInstance } from '../axios';

export const restUserProfile = async (isSeller: boolean) => {
  const response = await apiInstance(`/profile${isSeller ? '/seller' : ''}`);
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

export const editSellerInfo = async (sellerEditData: {
  profileImgUrl: string;
  shopName: string;
  nickname: string;
  address: string;
  bio: string;
}) => {
  const response = await apiInstance.put('/profile/seller', sellerEditData);
  return response.data;
};

export const editPassword = async (password: string) => {
  const response = await apiInstance.patch('/auth/password', { password });
  return response.data;
};
