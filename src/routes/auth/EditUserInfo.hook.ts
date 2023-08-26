import { restUserProfile } from '@/api/auth/userProfile';
import { useUser } from '@/hooks/useUser';
import customToast from '@/utils/customToast';
import { useEffect, useState } from 'react';
import ReactS3Client from 'react-aws-s3-typescript';
import { userConfig } from '@/data/s3configs';
import moment from 'moment';

export const useGetUserData = (isSeller: boolean) => {
  const [editInput, setEditInput] = useState({
    password: '',
    passwordCheck: '',
    nickname: '',
    city: '',
    district: '',
  });

  const [sellerEditInput, setSellerEditInput] = useState({
    password: '',
    passwordCheck: '',
    address: '',
    bio: '',
    nickname: '',
    shopName: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await restUserProfile(isSeller);
        if (response.statusCode === 200) {
          if (!isSeller) {
            setEditInput((prev) => ({
              ...prev,
              nickname: response.data.nickname,
              city: response.data.city,
              district: response.data.district,
            }));
          } else {
            setSellerEditInput((prev) => ({
              ...prev,
              address: '와야함', // 안옴
              bio: response.data.bio,
              shopName: response.data.shopName,
              nickname: response.data.nickname,
            }));
          }
        }
      } catch (error: any) {
        console.log(error);
        customToast(error.message, 'error');
      }
    };
    getData();
  }, [isSeller]);

  return { setEditInput, setSellerEditInput, editInput, sellerEditInput };
};

export const useProfileImage = () => {
  const { user, setUser } = useUser();

  const [profileImgageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState(
    user?.profileImgUrl as string,
  );
  const uploadImage = async (file: File) => {
    const s3 = new ReactS3Client(userConfig);
    try {
      const fileName = `${moment().format('YYMMDDhh:mm:ss')}_${
        file.name.split('.')[0]
      }`;
      const res = await s3.uploadFile(file, fileName);
      setProfileImageFile(null);
      setProfileImageURL(res.location);
    } catch (error) {
      customToast('이미지 업로드에 실패했습니다.', 'error');
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileImgageFile !== null) {
      uploadImage(profileImgageFile);
    }
  }, [profileImgageFile]);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > 5000000) {
        customToast('사진 용량이 5mb를 초과하였습니다', 'error');
        return;
      }
      setProfileImageFile(file);
    }
  };

  return { profileImageURL, onChangeFile };
};
