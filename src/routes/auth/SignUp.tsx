import {
  checkProceed,
  regenerateRegisterToken,
  signup,
  verifyEmailOrNickname,
} from '@/api/auth/signup';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Popple from '@/components/ui/Popple';
import Select from '@/components/ui/Seletct';
import ValidationMessage from '@/components/ui/ValidationMessage';
import {
  ADRESS_SELECT_OPTIONS,
  EMAIL_REGEX,
  NICKNAME_REGEX,
  PASSWORD_REGEX,
} from '@/data/constants';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MyToast from '@/components/ui/MyToast';
import customToast from '@/utils/customToast';

export default function SignUp() {
  const navigate = useNavigate();

  // 전송상태 저장 state
  const [isSending, setIsSending] = useState(false);

  // message가 일정시간 후 사라지도록 하기 위한 timeOut
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // 상호작용 메세지
  const [message, setMessage] = useState('');

  // 상호작용 메세지가 긍정인지 부정인지를 저장
  const [messagePositive, setMessagePositive] = useState(false);

  // 시간지나면 사라지는 상호작용 메세지를 세팅하는 함수
  const setMessageTimeout = useCallback(
    (message: string, positive = false) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      if (positive) {
        setMessagePositive(true);
      } else {
        setMessagePositive(false);
      }
      setMessage(message);
      const id = setTimeout(() => {
        setMessage('');
      }, 3000);
      setTimeoutId(id);
    },
    [timeoutId],
  );

  // 중복체크가 완료되었는지
  const [isDuplicationVerified, setIsDuplicationVerified] = useState({
    email: false,
    nickname: false,
  });

  // 이미지 업로드 함수 회원가입단계에서는 하지 않기로 했는데 할 수도 있으니깐 남겨둠
  // const [image, setImage] = useState<string | null>(null);
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === FileReader.DONE) {
  //       setImage(reader.result as string);
  //     }
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  // form에 실시간으로입력되는 값들
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    city: '',
    district: '',
  });

  // form에 입력값을 바꿔주는 함수
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setSignupInput({
      ...signupInput,
      [name]: value,
    });
  };

  // 중도포기 여부 확인 및 이메일 중복검사 함수
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
    // 통신
    try {
      setIsLoading(true);
      const response1 = await checkProceed(signupInput.email);
      if (response1.statusCode === 200) {
        try {
          const response2 = await verifyEmailOrNickname(
            signupInput.email,
            undefined, //닉넴은 안보냄
          );
          if (response2.statusCode === 200) {
            customToast('사용 가능한 이메일입니다', 'success');
            // 중복완료 후 메일 수정못하도록 input disabled로
            setIsDuplicationVerified((prev) => ({
              ...prev,
              email: true,
            }));
          }
        } catch (error) {
          console.log('중복');
          console.log(error);
        }
      }
    } catch (error: any) {
      console.log(error);
      // if (error.errorCode === 400) {
      //   navigate('/confirmsignup', {
      //     state: { email: signupInput.email, isProceeded: true },
      //   });
      //   await regenerateRegisterToken(signupInput.email);
      // }
    } finally {
      setIsLoading(false);
    }
  };

  // 닉네임 중복검사 함수
  const handleVerifyDuplicateNickname = async () => {
    // 닉네임을 입력하지 않은 경우
    if (!signupInput.nickname.trim()) {
      setMessageTimeout('닉네임을 입력해주세요');
      return;
    }
    // 닉네임 형식이 옳지 않은 경우
    if (!NICKNAME_REGEX.test(signupInput.nickname)) {
      setMessageTimeout('영어, 2~10자, 특수기호는 . , _ , - 만 허용합니다');
      return;
    }
    // 통신
    try {
      const response = await verifyEmailOrNickname(
        undefined, //이멜 안보냄
        signupInput.nickname, //닉넴 보냄
      );
      console.log(response);
      if (response.statusCode === 200) {
        //메세지는 초록색으로
        setMessagePositive(true);
        setMessageTimeout('사용 가능한 닉네임입니다', true);
        // 닉네임 중복확인 완료 여부를 true
        setIsDuplicationVerified((prev) => ({
          ...prev,
          nickname: true,
        }));
      } else {
        setMessageTimeout('이미 등록된 닉네임입니다');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 이전 타임아웃 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (
      !signupInput.email.trim() ||
      !signupInput.password.trim() ||
      !signupInput.nickname ||
      !signupInput.password ||
      !signupInput.passwordCheck ||
      !signupInput.city ||
      !signupInput.district
    ) {
      // setMessageTimeout('필수 항목을 입력해주세요');
      toast.error('필수항목을 입력해주세요', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    // 이메일 형식이 옳지 않은 경우
    if (!EMAIL_REGEX.test(signupInput.email)) {
      setMessage('이메일 형식이 올바르지 않습니다');
      const id = setTimeout(() => {
        setMessage('');
      }, 3000);
      setTimeoutId(id);
      return;
    }

    // 이메일 중복확인을 하지 않은 경우
    if (!isDuplicationVerified.email) {
      setMessageTimeout('이메일 중복을 확인하세요');
      return;
    }

    // 닉네임 형식이 옳지 않은 경우
    if (!NICKNAME_REGEX.test(signupInput.nickname)) {
      setMessageTimeout('영어, 2~10자, 특수기호는 . , _ , - 만 허용합니다');
      return;
    }

    // 닉네임 중복확인을 하지 않은 경우
    if (!isDuplicationVerified.nickname) {
      setMessageTimeout('닉네임 중복을 확인하세요');
      return;
    }

    // 비밀번호 형식 옳지 않은 경우
    if (!PASSWORD_REGEX.test(signupInput.password)) {
      setMessageTimeout('비밀번호는 영문 숫자 조합 8자리 이상');
      return;
    }

    // 비밀번호 2개가 서로 일치하지 않는 경우
    if (signupInput.password !== signupInput.passwordCheck) {
      setMessageTimeout('비밀번호를 확인해주세요');
      return;
    }
    // api통신
    const signUpData = {
      email: signupInput.email,
      nickname: signupInput.nickname,
      password: signupInput.password,
      city: signupInput.city,
      district: signupInput.district,
    };
    setIsSending(true);
    try {
      navigate('/confirmsignup', {
        state: { email: signupInput.email, isProceeded: false },
      });
      await signup(signUpData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
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
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-slate-100">
      <MyToast />
      <form
        className="flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-sm sm:w-[600px] sm:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-32">
          <Popple />
        </div>
        <div className="flex items-end gap-4">
          <div className="flex flex-1 flex-col gap-4">
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
                  disabled={isLoading}
                  contents={
                    isLoading ? (
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
                            email: !prev.email,
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
              {/* <ImageUpload handleChange={handleImageUpload} image={image} /> */}
              <div className="w-32">
                <Button
                  secondary
                  onClick={
                    isDuplicationVerified.nickname
                      ? () =>
                          setIsDuplicationVerified((prev) => ({
                            ...prev,
                            nickname: !prev.nickname,
                          }))
                      : handleVerifyDuplicateNickname
                  }
                  contents={
                    <div className="flex items-center justify-center">
                      {isDuplicationVerified.nickname ? '변경하기' : '중복확인'}
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <Input
          label="비밀번호* (영문, 숫자 조합 8자리 이상)"
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
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              name="city"
              label="도, 시*"
              onChange={handleChange}
              options={[{ name: '도, 시', value: '' }, ...citySelectOptions]}
              value={signupInput.city}
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
              value={signupInput.district}
            />
          </div>
        </div>
        <ValidationMessage message={message} positive={messagePositive} />
        <div className="mt-5 flex-1">
          <Button
            contents={isSending ? <LoadingSpinner color="white" /> : '회원가입'}
            submit
          />
        </div>
        <p className="mt-3 text-xs text-subTextAndBorder">
          이미 POPPLE 회원이시간요?{' '}
          <Link className="transition hover:text-black" to="/login">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
