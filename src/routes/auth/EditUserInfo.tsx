import { verifyEmailOrNickname } from '@/api/auth/signup';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Select from '@/components/ui/Select';
import {
  ADRESS_SELECT_OPTIONS,
  NICKNAME_REGEX,
  PASSWORD_REGEX,
} from '@/data/constants';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customToast from '@/utils/customToast';
import DaumPostcode from 'react-daum-postcode';
import { useUser } from '@/hooks/useUser';
import ProfileImageUpload from '@/components/ui/ProfileImageUpload';

import {
  editPassword,
  editSellerInfo,
  editUserInfo,
} from '@/api/auth/userProfile';
import { ILocalUser } from '@/types/ISignin';
import { useGetUserData, useProfileImage } from './EditUserInfo.hook';

export default function EditUserInfo() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const isSeller = useMemo(() => user?.role === 'ROLE_SELLER', [user?.role]);
  const isKakao = useMemo(() => user?.platform === 'KAKAO', [user?.platform]);
  const { editInput, sellerEditInput, setEditInput, setSellerEditInput } =
    useGetUserData(isSeller);
  const { onChangeFile, profileImageURL } = useProfileImage();

  const [daumPostcodeOpen, setDaumPostcodeOpen] = useState(false);

  // 닉네임 중복체크가 완료되었는지
  const [isNickDuplicationVerified, setIsNickDuplicationVerified] =
    useState(true);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setEditInput({
      ...editInput,
      [name]: value,
    });
    setSellerEditInput({
      ...sellerEditInput,
      [name]: value,
    });
  };

  const [isNicknameDupChecking, setIsNicknameDupChecking] = useState(false);
  const handleVerifyDuplicateNickname = async () => {
    if (editInput.nickname === user?.nickname) {
      setIsNickDuplicationVerified(true);
      return;
    }
    if (!editInput.nickname.trim()) {
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

  const [isEdittingUserInfo, setIsEdittingUserInfo] = useState(false);
  const handleEditUserInfo = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (
      !profileImageURL ||
      !editInput.nickname ||
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
        customToast('사용자 정보가 수정되었습니다', 'success');
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

  // 도시 선택
  const citySelectOptions = useMemo(
    () =>
      ADRESS_SELECT_OPTIONS.map((option) => ({
        name: option.city,
        value: option.city,
      })),
    [],
  );

  // 구선택
  const districtSelectOptions = useMemo(
    () =>
      ADRESS_SELECT_OPTIONS.find(
        (option) => option.city === editInput.city,
      )?.district.map((el) => ({
        name: el,
        value: el,
      })),
    [editInput.city],
  );

  const [isSellerEditting, setISellerEditing] = useState(false);
  const handleEditSellerInfo = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      // !sellerEditInput.password.trim() ||
      !sellerEditInput.nickname.trim() ||
      // !sellerEditInput.passwordCheck ||
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
      if (response.status === 200) {
        customToast(
          `판매자 회원가입이 완료되었습니다! 로그인 화면으로 이동합니다`,
          'success',
        );
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
      return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      customToast(error.message, 'error');
    } finally {
      setISellerEditing(false);
    }
  };

  const [isEditPassword, setIsEditPassword] = useState(false);

  return (
    <div className=" flex flex-col items-center justify-center gap-10 bg-slate-100">
      <form
        className="relative flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-lg sm:w-[600px] sm:gap-4"
        onSubmit={isSeller ? handleEditSellerInfo : handleEditUserInfo}
      >
        <div className="flex items-end gap-4">
          <div className="flex flex-1 flex-col items-center gap-4">
            <ProfileImageUpload
              imageURL={profileImageURL}
              handleChange={onChangeFile}
            />
            <div className="flex w-full items-end gap-2">
              <Input
                label="닉네임* (숫자포함 영어, 2~10자)"
                name="nickname"
                onChange={handleChange}
                value={editInput.nickname || sellerEditInput.nickname}
                disabled={isNickDuplicationVerified}
              />
              <div className="w-32">
                <Button
                  disabled={isNicknameDupChecking}
                  secondary
                  onClick={
                    isNickDuplicationVerified
                      ? () => setIsNickDuplicationVerified(false)
                      : handleVerifyDuplicateNickname
                  }
                  contents={
                    isNicknameDupChecking ? (
                      <LoadingSpinner color="accent" />
                    ) : (
                      <div className="flex items-center justify-center">
                        {isNickDuplicationVerified ? '변경하기' : '중복확인'}
                      </div>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {!isKakao && (
          <div className="flex items-end gap-2">
            <Input
              label="비밀번호* (영문, 숫자 8자리 이상)"
              name="password"
              onChange={handleChange}
              value={editInput.password}
              type="password"
              placeholder=""
            />
            <Input
              label="비밀번호 확인*"
              name="passwordCheck"
              onChange={handleChange}
              value={editInput.passwordCheck}
              type="password"
            />
          </div>
        )}

        {isSeller ? (
          <>
            <Input
              label="상호명*"
              name="shopName"
              onChange={handleChange}
              value={sellerEditInput.shopName}
            />
            <div className="flex items-end gap-2">
              <Input
                label="사업장 주소*"
                name="address"
                onChange={handleChange}
                value={sellerEditInput.address}
                disabled
              />
              <div className="w-32">
                <Button
                  contents={daumPostcodeOpen ? '닫기' : '주소검색'}
                  secondary
                  onClick={() => setDaumPostcodeOpen((prev) => !prev)}
                />
              </div>
              {daumPostcodeOpen ? (
                <div className="absolute right-5 top-[20%] mx-auto w-3/4 rounded-md border-2 border-accent bg-white py-4">
                  <DaumPostcode
                    onComplete={(data) => {
                      setSellerEditInput((prev) => ({
                        ...prev,
                        address: data.address,
                      }));

                      setDaumPostcodeOpen(false);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1">
              <Select
                name="city"
                label="도, 시*"
                onChange={handleChange}
                options={[{ name: '도, 시', value: '' }, ...citySelectOptions]}
                value={editInput.city as string}
              />
            </div>
            <div className="flex-1">
              <Select
                disabled={!editInput.city}
                name="district"
                label="구, 군*"
                onChange={handleChange}
                options={
                  !editInput.city
                    ? [{ name: '구, 군', value: '' }]
                    : [
                        { name: '구, 군', value: '' },
                        ...(districtSelectOptions as {
                          name: string;
                          value: string;
                        }[]),
                      ]
                }
                value={editInput.district as string}
              />
            </div>
          </div>
        )}

        <Button
          contents={
            isEdittingUserInfo ? <LoadingSpinner color="white" /> : '정보 수정'
          }
          submit
        />
      </form>
    </div>
  );
}
