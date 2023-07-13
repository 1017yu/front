import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Popple from '@/components/ui/Popple';
import Title from '@/components/ui/Title';
import ValidationMessage from '@/components/ui/ValidationMessage';
import { EMAIL_REGEX } from '@/data/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [emailInput, setEmailInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (emailInput.trim()) {
      setMessage('이메일을 입력해주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    if (!EMAIL_REGEX.test(emailInput)) {
      setMessage('올바른 이메일을 입력해주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }
    console.log(emailInput);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <form
        className="flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-sm sm:w-[600px] sm:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-32">
          <Popple />
        </div>
        <Title text="비밀번호를 잊으셨나요?" />
        <p className="text-sm text-subTextAndBorder dark:text-gray-400">
          이메일을 입력해주시면 <br />
          비밀번호를 재설정하는 링크를 보내드릴게요.
        </p>

        <div>
          <Input
            onChange={handleChange}
            value=""
            label="등록한 이메일"
            name="email"
          />
        </div>
        <ValidationMessage message={message} />

        <Button contents={'비밀번호 재설정'} submit />
        <p className="mt-3 text-xs text-subTextAndBorder">
          비밀번호가 생각이 나셨나요?{' '}
          <Link to="/login" className="transition hover:text-black">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
