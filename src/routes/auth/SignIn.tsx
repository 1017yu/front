import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '@/components/ui/Toggle';
import KakoaButton from '@/components/ui/KakoaButton';
import Popple from '@/components/ui/Popple';
import { useUser } from '@/hooks/useUser';
import { ILocalUser, IServerUser } from '@/types/ISignin';
import { signin } from '@/api/auth/signin';
import customToast from '@/utils/customToast';

export default function SignIn() {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });

  const { setUser } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 이메일, 비번 입력안한경우
    if (!loginInput.email.trim() || !loginInput.password.trim()) {
      customToast('이메일과 비밀번호를 입력해주세요', 'error');
      return;
    }

    // 통신 시작
    setIsSending(true);
    try {
      const response = await signin(
        {
          email: loginInput.email,
          password: loginInput.password,
        },
        isSeller,
      );
      if (response.statusCode === 200) {
        const serverUserData = response.data as IServerUser;
        // 로컬 유져데이터 변수 선언
        const localUserData: ILocalUser = {
          email: serverUserData.email,
          nickname: serverUserData.nickname,
          profileImgUrl: serverUserData.profileImgUrl,
          accessToken: serverUserData.accessToken,
          refreshToken: serverUserData.refreshToken,
        };
        // 전역 사용자 지정
        setUser(localUserData);
        // 로컬저장소 저장
        localStorage.setItem('user', JSON.stringify(localUserData));
        // 홈으로 이동
        navigate('/');
        // 성공메세지 토스트
        customToast(`${localUserData.nickname}님 반가워요🖐️🖐️`, 'success');
      }
    } catch (error: any) {
      console.error(error);
      customToast(error.message, 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <form
        className="flex w-5/6 flex-col gap-4 rounded-md bg-white p-5 sm:w-[600px] sm:p-8"
        onSubmit={handleLogin}
      >
        <div className="mx-auto w-32">
          <Popple />
        </div>
        <div className="flex items-center justify-between">
          <Title text="로그인" />
          <div className="flex items-center gap-2">
            <span>판매자</span>
            <Toggle
              enabled={isSeller}
              onToggle={() => setIsSeller((prev) => !prev)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Input
            name="email"
            label="이메일"
            onChange={handleChange}
            placeholder="example@email.com"
            value={loginInput.email}
          />
          <Input
            name="password"
            label="비밀번호"
            onChange={handleChange}
            value={loginInput.password}
            type="password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            contents={isSending ? <LoadingSpinner color="white" /> : '로그인'}
            submit
            disabled={isSending}
          />

          <KakoaButton disabled={isSeller} />
        </div>
        <div>
          <p className="mt-3 text-xs text-subTextAndBorder">
            아직 회원이 아니신가요?{' '}
            <Link to="/signup" className="transition hover:text-black">
              회원가입
            </Link>
          </p>
          <p className="mt-3 text-xs text-subTextAndBorder">
            비밀번호를 잊으셨나요?{' '}
            <Link to="/forgotpassword" className="transition hover:text-black">
              비밀번호 찾기
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
