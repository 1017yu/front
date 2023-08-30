import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Select from '@/components/ui/Select';
import { useMemo, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useUser } from '@/hooks/useUser';
import ProfileImageUpload from '@/components/auth/ProfileImageUpload';
import {
  useCitySelect,
  useEditSellerInfo,
  useEditUserInfo,
  useGetUserData,
  useNickNameDuplicateCheck,
  useProfileImage,
} from './EditUserInfo.hook';
import BioTextarea from '@/components/auth/BioTextarea';

export default function EditUserInfo() {
  const [daumPostcodeOpen, setDaumPostcodeOpen] = useState(false);
  const { user } = useUser();
  const isSeller = useMemo(() => user?.role === 'ROLE_SELLER', [user?.role]);
  const isKakao = useMemo(() => user?.platform === 'KAKAO', [user?.platform]);
  const { editInput, sellerEditInput, setEditInput, setSellerEditInput } =
    useGetUserData(isSeller);
  const { onChangeFile, profileImageURL } = useProfileImage(user);
  const {
    isNickDuplicationVerified,
    isNicknameDupChecking,
    handleVerifyDuplicateNickname,
    setIsNickDuplicationVerified,
  } = useNickNameDuplicateCheck(editInput, sellerEditInput, user, isSeller);
  const { citySelectOptions, districtSelectOptions } = useCitySelect(
    editInput.city,
  );

  const { handleEditUserInfo, isEdittingUserInfo } = useEditUserInfo(
    profileImageURL,
    editInput,
    isNickDuplicationVerified,
  );

  const { handleEditSellerInfo, isSellerEditting } = useEditSellerInfo(
    profileImageURL,
    sellerEditInput,
    isNickDuplicationVerified,
  );
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

  return (
    <div className=" flex flex-col items-center justify-center gap-10 bg-slate-100">
      <form
        className="relative flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-lg sm:w-[600px] sm:gap-4"
        onSubmit={isSeller ? handleEditSellerInfo : handleEditUserInfo}
      >
        <div className="flex items-end gap-4">
          <div className="flex flex-1 flex-col items-center gap-4">
            <div className="flex h-44 w-full gap-2">
              <ProfileImageUpload
                imageURL={profileImageURL}
                handleChange={onChangeFile}
              />
              {isSeller && (
                <BioTextarea
                  value={sellerEditInput.bio}
                  onChange={handleChange}
                />
              )}
            </div>
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
                <div className="absolute right-5 top-[8%] mx-auto w-3/4 rounded-md border-2 border-accent bg-white py-4">
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
            isEdittingUserInfo || isSellerEditting ? (
              <LoadingSpinner color="white" />
            ) : (
              '정보 수정'
            )
          }
          submit
        />
      </form>
    </div>
  );
}
