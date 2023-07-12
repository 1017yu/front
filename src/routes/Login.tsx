import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Toggle from '@/components/ui/Toggle';
import KakoaButton from '@/components/ui/KakoaButton';
import Popple from '@/components/ui/Popple';
import { EMAIL_REGEX } from '@/data/constants';
import ValidationMessage from '@/components/ui/ValidationMessage';

export default function Login() {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsSeller((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 이전 타임아웃 초기화
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    // 이메일, 비번 입력안한경우
    if (!loginInput.email.trim() || !loginInput.password.trim()) {
      setMessage('이메일과 비밀번호를 입력해주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    // 이메일 형식 옳지 않은 경우
    if (!EMAIL_REGEX.test(loginInput.email)) {
      setMessage('유효한 이메일 형식이 아닙니다');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    // 통신 시작
    setIsSending(true);
    try {
      setTimeout(() => {
        console.log({ loginInput, isSeller });
        setIsSending(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSending(false);
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
            <Toggle enabled={isSeller} onToggle={handleToggle} />
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
        <ValidationMessage message={message} />
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
