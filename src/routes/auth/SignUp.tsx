import {
  checkBusinessNumberDup,
  checkProceed,
  confirmBusinessNumber,
  regenerateRegisterToken,
  sellerSignup,
  signup,
  verifyEmailOrNickname,
} from '@/api/auth/signup';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Popple from '@/components/ui/Popple';
import Select from '@/components/ui/Select';
import { ADRESS_SELECT_OPTIONS } from '@/data/constants';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customToast from '@/utils/customToast';
import Toggle from '@/components/ui/Toggle';
import DaumPostcode from 'react-daum-postcode';
import {
  EMAIL_REGEX,
  NICKNAME_REGEX,
  PASSWORD_REGEX,
} from '@/data/constants/regex';

export default function SignUp() {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const [daumPostcodeOpen, setDaumPostcodeOpen] = useState(false);

  // 중복체크가 완료되었는지
  const [isDuplicationVerified, setIsDuplicationVerified] = useState({
    email: false,
    nickname: false,
  });

  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    city: '',
    district: '',
  });

  const [sellerSignupInput, setSellerSignupInput] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    address: '',
    nickname: '',
    shopName: '',
    businessNumber: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setSignupInput({
      ...signupInput,
      [name]: value,
    });
    setSellerSignupInput({
      ...sellerSignupInput,
      [name]: value,
    });
  };

  const [isCheckingProceedAndDupEmail, setIsCheckingProceedAndDupEmail] =
    useState(false);
  // 중도포기(최종 메일검증 과정을 하지 않은 사용자) 여부 확인 및 이메일 중복검사 함수... 변수명 극혐
  const handleCheckProceedAndVerifyDuplicateEmail = async () => {
    // 이메일을 입력하지 않은 경우
    if (!signupInput.email.trim()) {
      customToast('이메일을 입력해주세요', 'error');
      return;
    }
    // 이메일 형식이 옳지 않은 경우
    if (!EMAIL_REGEX.test(signupInput.email)) {
      customToast('이메일 형식이 올바르지 않습니다', 'error');
      return;
    }
    try {
      setIsCheckingProceedAndDupEmail(true);
      const response1 = await checkProceed(signupInput.email);
      if (response1.statusCode === 200) {
        try {
          // 이메일 중복확인
          const response2 = await verifyEmailOrNickname(
            signupInput.email,
            undefined, //닉넴은 보내지 않음
            isSeller,
          );
          if (response2.statusCode === 200) {
            customToast('사용 가능한 이메일입니다', 'success');
            setIsDuplicationVerified((prev) => ({
              ...prev,
              email: true,
            }));
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // 중복확인 통신 에러
          console.error(error);
          customToast(error.message, 'error');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 중도포기 통신 에러
      console.error(error);
      if (error.errorCode === 409) {
        customToast(error.message, 'error');
        return;
      }
      // 중도 포기를 한 경우
      try {
        // 선이동, 후메일보내기
        navigate('/confirmsignup', {
          state: { email: signupInput.email, isProceeded: true },
        });
        await regenerateRegisterToken(signupInput.email);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        customToast(error.message, 'error');
      }
    } finally {
      setIsCheckingProceedAndDupEmail(false);
    }
  };

  const [isNicknameDupChecking, setIsNicknameDupChecking] = useState(false);
  // 닉네임 중복검사 함수
  const handleVerifyDuplicateNickname = async () => {
    // 닉네임을 입력하지 않은 경우
    if (!signupInput.nickname.trim()) {
      customToast('닉네임을 입력해주세요', 'error');
      return;
    }
    // 닉네임 형식이 옳지 않은 경우
    if (!NICKNAME_REGEX.test(signupInput.nickname)) {
      customToast('영어, 2~10자, 특수기호는 . , _ , - 만 허용합니다', 'error');
      return;
    }
    try {
      setIsNicknameDupChecking(true);
      const response = await verifyEmailOrNickname(
        undefined, //이멜 안보냄
        signupInput.nickname,
        isSeller,
      );
      if (response.statusCode === 200) {
        customToast('사용 가능한 닉네임입니다', 'success');

        setIsDuplicationVerified((prev) => ({
          ...prev,
          nickname: true,
        }));
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

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !signupInput.email.trim() ||
      !signupInput.password.trim() ||
      !signupInput.nickname ||
      !signupInput.password ||
      !signupInput.passwordCheck ||
      !signupInput.city ||
      !signupInput.district
    ) {
      customToast('필수항목을 입력해주세요', 'error');
      return;
    }

    // 이메일 중복확인을 하지 않은 경우
    if (!isDuplicationVerified.email) {
      customToast('이메일 중복을 확인하세요', 'error');
      return;
    }

    // 닉네임 중복확인을 하지 않은 경우
    if (!isDuplicationVerified.nickname) {
      customToast('닉네임 중복을 확인하세요', 'error');
      return;
    }

    // 비밀번호 형식 옳지 않은 경우
    if (!PASSWORD_REGEX.test(signupInput.password)) {
      customToast('비밀번호는 영문 숫자 조합 8자리 이상', 'error');
      return;
    }

    // 비밀번호 2개가 서로 일치하지 않는 경우
    if (signupInput.password !== signupInput.passwordCheck) {
      customToast('비밀번호를 확인해주세요', 'error');
      return;
    }

    // 통신
    const signUpData = {
      email: signupInput.email,
      nickname: signupInput.nickname,
      password: signupInput.password,
      city: signupInput.city,
      district: signupInput.district,
    };
    try {
      // 선 이동, 후 메일 보내기
      navigate('/confirmsignup', {
        state: { email: signupInput.email, isProceeded: false },
      });
      await signup(signUpData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
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
        (option) => option.city === signupInput.city,
      )?.district.map((el) => ({
        name: el,
        value: el,
      })),
    [signupInput.city],
  );

  const [isBusinessNoConfirmed, setIsBusinessNoConfirmed] = useState(false);
  const [isBusinessNoConfirming, setIsBusinessNoConfirming] = useState(false);
  const handleBusinessNumber = async () => {
    try {
      setIsBusinessNoConfirming(true);
      const response = await checkBusinessNumberDup(
        sellerSignupInput.businessNumber,
      );
      if (response.statusCode === 200) {
        try {
          const response = await confirmBusinessNumber(
            sellerSignupInput.businessNumber,
          );
          if (response.statusCode === 200) {
            customToast('사업자 등록번호가 확인되었습니다.', 'success');
            setIsBusinessNoConfirmed(true);
          }
          return;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(error);
          customToast(error.message, 'error');
        }
      }
    } catch (error: any) {
      console.log(error);
      customToast(error.message, 'error');
    } finally {
      setIsBusinessNoConfirming(false);
    }
  };

  const [isSellerSignupSending, setIsSellerSignupSending] = useState(false);
  const handleSellerSignup = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !sellerSignupInput.email.trim() ||
      !sellerSignupInput.password.trim() ||
      !sellerSignupInput.nickname.trim() ||
      !sellerSignupInput.password ||
      !sellerSignupInput.passwordCheck ||
      !sellerSignupInput.address ||
      !sellerSignupInput.businessNumber
    ) {
      customToast('필수항목을 입력해주세요', 'error');
      return;
    }

    // 이메일 중복확인을 하지 않은 경우
    if (!isDuplicationVerified.email) {
      customToast('이메일 중복을 확인하세요', 'error');
      return;
    }

    // 닉네임 중복확인을 하지 않은 경우
    if (!isDuplicationVerified.nickname) {
      customToast('닉네임 중복을 확인하세요', 'error');
      return;
    }

    // 비밀번호 형식 옳지 않은 경우
    if (!PASSWORD_REGEX.test(sellerSignupInput.password)) {
      customToast('비밀번호는 영문 숫자 조합 8자리 이상', 'error');
      return;
    }

    // 비밀번호 2개가 서로 일치하지 않는 경우
    if (sellerSignupInput.password !== sellerSignupInput.passwordCheck) {
      customToast('비밀번호를 확인해주세요', 'error');
      return;
    }
    // 사업자 등록번호 검증을 하지 않은 경우
    if (!isBusinessNoConfirmed) {
      customToast('사업자 등록번호를 검증해주세요', 'error');
      return;
    }

    try {
      setIsSellerSignupSending(true);
      const response = await sellerSignup({
        address: sellerSignupInput.address,
        businessNumber: sellerSignupInput.businessNumber,
        email: sellerSignupInput.email,
        nickname: sellerSignupInput.nickname,
        password: sellerSignupInput.password,
        shopName: sellerSignupInput.shopName,
      });
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
      setIsSellerSignupSending(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-slate-100">
      <form
        className="relative flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-lg sm:w-[600px] sm:gap-4"
        onSubmit={isSeller ? handleSellerSignup : handleSignup}
      >
        <div className="mx-auto w-32">
          <Popple />
        </div>
        <div className="flex items-end gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-end gap-2">
              <span>판매자 회원</span>
              <Toggle
                enabled={isSeller}
                onToggle={() => {
                  setIsSeller((prev) => !prev);
                  setIsDuplicationVerified({
                    email: false,
                    nickname: false,
                  });
                }}
              />
            </div>
            <div className="flex items-end gap-2">
              <Input
                label="이메일*"
                name="email"
                onChange={handleChange}
                value={signupInput.email}
                placeholder="example@popple.com"
                disabled={isDuplicationVerified.email}
              />
              <div className="w-32">
                <Button
                  disabled={isCheckingProceedAndDupEmail}
                  contents={
                    isCheckingProceedAndDupEmail ? (
                      <LoadingSpinner color="accent" />
                    ) : (
                      <div className="flex items-center justify-center">
                        {isDuplicationVerified.email ? '변경하기' : '중복확인'}
                      </div>
                    )
                  }
                  secondary
                  onClick={
                    isDuplicationVerified.email
                      ? () =>
                          setIsDuplicationVerified((prev) => ({
                            ...prev,
                            email: false,
                          }))
                      : handleCheckProceedAndVerifyDuplicateEmail
                  }
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Input
                label="닉네임* (숫자포함 영어, 2~10자)"
                name="nickname"
                onChange={handleChange}
                value={signupInput.nickname}
                disabled={isDuplicationVerified.nickname}
              />
              <div className="w-32">
                <Button
                  disabled={isNicknameDupChecking}
                  secondary
                  onClick={
                    isDuplicationVerified.nickname
                      ? () =>
                          setIsDuplicationVerified((prev) => ({
                            ...prev,
                            nickname: false,
                          }))
                      : handleVerifyDuplicateNickname
                  }
                  contents={
                    isNicknameDupChecking ? (
                      <LoadingSpinner color="accent" />
                    ) : (
                      <div className="flex items-center justify-center">
                        {isDuplicationVerified.nickname
                          ? '변경하기'
                          : '중복확인'}
                      </div>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Input
            label="비밀번호* (영문, 숫자 8자리 이상)"
            name="password"
            onChange={handleChange}
            value={signupInput.password}
            type="password"
          />
          <Input
            label="비밀번호 확인*"
            name="passwordCheck"
            onChange={handleChange}
            value={signupInput.passwordCheck}
            type="password"
          />
        </div>

        {isSeller ? (
          <>
            <Input
              label="상호명*"
              name="shopName"
              onChange={handleChange}
              value={sellerSignupInput.shopName}
            />
            <div className="flex items-end gap-2">
              <Input
                label="사업자 등록번호* ( - 없이)"
                name="businessNumber"
                onChange={handleChange}
                value={sellerSignupInput.businessNumber}
                disabled={isBusinessNoConfirmed}
              />
              <div className="w-32">
                <Button
                  disabled={isBusinessNoConfirming}
                  contents={
                    isBusinessNoConfirming ? (
                      <LoadingSpinner color="accent" />
                    ) : isBusinessNoConfirmed ? (
                      '변경하기'
                    ) : (
                      '확인하기'
                    )
                  }
                  secondary
                  onClick={
                    isBusinessNoConfirmed
                      ? () => setIsBusinessNoConfirmed(false)
                      : handleBusinessNumber
                  }
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Input
                label="사업장 주소*"
                name="address"
                onChange={handleChange}
                value={sellerSignupInput.address}
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
                      setSellerSignupInput((prev) => ({
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
                value={signupInput.city as string}
              />
            </div>
            <div className="flex-1">
              <Select
                disabled={!signupInput.city}
                name="district"
                label="구, 군*"
                onChange={handleChange}
                options={
                  !signupInput.city
                    ? [{ name: '구, 군', value: '' }]
                    : [
                        { name: '구, 군', value: '' },
                        ...(districtSelectOptions as {
                          name: string;
                          value: string;
                        }[]),
                      ]
                }
                value={signupInput.district as string}
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex-1">
          <Button
            contents={
              isSellerSignupSending ? (
                <LoadingSpinner color="white" />
              ) : (
                '회원가입'
              )
            }
            submit
          />
        </div>
        <p className="mt-3 text-xs text-subTextAndBorder">
          이미 POPPLE 회원이시간요?{' '}
          <Link className="transition hover:text-black" to="/signin">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
