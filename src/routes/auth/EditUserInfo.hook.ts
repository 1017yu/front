import {
  editPassword,
  editSellerInfo,
  editUserInfo,
  restUserProfile,
} from '@/api/auth/userProfile';
import { useUser } from '@/hooks/useUser';
import customToast from '@/utils/customToast';
import { useEffect, useMemo, useState } from 'react';
import ReactS3Client from 'react-aws-s3-typescript';
import { userConfig } from '@/data/s3configs';
import moment from 'moment';
import {
  ADRESS_SELECT_OPTIONS,
  NICKNAME_REGEX,
  PASSWORD_REGEX,
} from '@/data/constants';
import { verifyEmailOrNickname } from '@/api/auth/signup';
import { ILocalUser } from '@/types/ISignin';
import { useNavigate } from 'react-router-dom';

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
              address: '서울 강남구 강남대로 364', // 안옴
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

export const useProfileImage = (user: ILocalUser | null) => {
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

export const useNickNameDuplicateCheck = (
  editInput: {
    password: string;
    passwordCheck: string;
    nickname: string;
    city: string;
    district: string;
  },
  sellerEditInput: {
    password: string;
    passwordCheck: string;
    address: string;
    bio: string;
    nickname: string;
    shopName: string;
  },
  user: ILocalUser | null,
  isSeller: boolean,
) => {
  const [isNickDuplicationVerified, setIsNickDuplicationVerified] =
    useState(true);
  const [isNicknameDupChecking, setIsNicknameDupChecking] = useState(false);
  const handleVerifyDuplicateNickname = async () => {
    if (
      editInput.nickname === user?.nickname ||
      sellerEditInput.nickname === user?.nickname
    ) {
      setIsNickDuplicationVerified(true);
      return;
    }
    if (!editInput.nickname.trim() || !sellerEditInput.nickname.trim()) {
      customToast('닉네임을 입력해주세요', 'error');
      return;
    }
    if (!NICKNAME_REGEX.test(editInput.nickname)) {
      customToast('영어, 2~10자, 특수기호는 . , _ , - 만 허용합니다', 'error');
      return;
    }
    try {
      setIsNicknameDupChecking(true);
      const response = await verifyEmailOrNickname(
        undefined, //이멜 안보냄
        editInput.nickname,
        isSeller,
      );
      if (response.statusCode === 200) {
        customToast('사용 가능한 닉네임입니다', 'success');
        setIsNickDuplicationVerified(true);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      customToast(error.message, 'error');
    } finally {
      setIsNicknameDupChecking(false);
    }
  };

  return {
    isNickDuplicationVerified,
    isNicknameDupChecking,
    setIsNickDuplicationVerified,
    handleVerifyDuplicateNickname,
  };
};

export const useEditUserInfo = (
  profileImageURL: string,
  editInput: {
    password: string;
    passwordCheck: string;
    nickname: string;
    city: string;
    district: string;
  },
  isNickDuplicationVerified: boolean,
) => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [isEdittingUserInfo, setIsEdittingUserInfo] = useState(false);
  const handleEditUserInfo = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (
      !profileImageURL ||
      !editInput.nickname.trim() ||
      !editInput.city ||
      !editInput.district
    ) {
      customToast('필수항목을 입력해주세요', 'error');
      return;
    }

    if (!isNickDuplicationVerified) {
      customToast('닉네임 중복을 확인하세요', 'error');
      return;
    }

    if (editInput.password && !PASSWORD_REGEX.test(editInput.password)) {
      customToast('비밀번호는 영문 숫자 조합 8자리 이상', 'error');
      return;
    }

    if (editInput.password && editInput.password !== editInput.passwordCheck) {
      customToast('비밀번호를 확인해주세요', 'error');
      return;
    }

    const userEditData = {
      profileImgUrl: profileImageURL,
      nickname: editInput.nickname,
      city: editInput.city,
      district: editInput.district,
    };
    try {
      setIsEdittingUserInfo(true);
      if (editInput.password) {
        try {
          await editPassword(editInput.password);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);
          customToast(error.message, 'error');
        }
      }
      const response = await editUserInfo(userEditData);
      if (response.statusCode === 200) {
        setUser(
          (prev) =>
            ({
              ...prev,
              nickname: editInput.nickname,
              profileImgUrl: profileImageURL,
            } as ILocalUser),
        );
        const localuser = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user') as string)
          : null;
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...localuser,
            nickName: editInput.nickname,
            profileImgUrl: profileImageURL,
          }),
        );
        customToast('회원정보가 수정되었습니다', 'success');
        navigate('/myaccount');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      customToast(error.message, 'error');
      console.error(error);
    } finally {
      setIsEdittingUserInfo(false);
    }
  };

  return { handleEditUserInfo, isEdittingUserInfo };
};

export const useCitySelect = (city: string) => {
  const citySelectOptions = useMemo(
    () =>
      ADRESS_SELECT_OPTIONS.map((option) => ({
        name: option.city,
        value: option.city,
      })),
    [],
  );
  const districtSelectOptions = useMemo(
    () =>
      ADRESS_SELECT_OPTIONS.find(
        (option) => option.city === city,
      )?.district.map((el) => ({
        name: el,
        value: el,
      })),
    [city],
  );
  return { citySelectOptions, districtSelectOptions };
};

export const useEditSellerInfo = (
  profileImageURL: string,
  sellerEditInput: {
    password: string;
    passwordCheck: string;
    address: string;
    bio: string;
    nickname: string;
    shopName: string;
  },
  isNickDuplicationVerified: boolean,
) => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isSellerEditting, setISellerEditing] = useState(false);
  const handleEditSellerInfo = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (
      !profileImageURL ||
      !sellerEditInput.nickname.trim() ||
      !sellerEditInput.bio ||
      !sellerEditInput.address
    ) {
      customToast('필수항목을 입력해주세요', 'error');
      return;
    }

    // 닉네임 중복확인을 하지 않은 경우
    if (!isNickDuplicationVerified) {
      customToast('닉네임 중복을 확인하세요', 'error');
      return;
    }

    try {
      setISellerEditing(true);
      const sellerEditData = {
        address: sellerEditInput.address,
        nickname: sellerEditInput.nickname,
        shopName: sellerEditInput.shopName,
        bio: sellerEditInput.bio,
        profileImgUrl: profileImageURL,
      };
      const response = await editSellerInfo(sellerEditData);
      if (response.statusCode === 200) {
        setUser(
          (prev) =>
            ({
              ...prev,
              nickname: sellerEditData.nickname,
              profileImgUrl: profileImageURL,
            } as ILocalUser),
        );
        const localuser = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user') as string)
          : null;
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...localuser,
            nickName: sellerEditData.nickname,
            profileImgUrl: profileImageURL,
          }),
        );
        customToast(`회원정보가 수정되었습나다`, 'success');
        navigate('/myaccount');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      customToast(error.message, 'error');
    } finally {
      setISellerEditing(false);
    }
  };
  return {
    isSellerEditting,
    handleEditSellerInfo,
  };
};
