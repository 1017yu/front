import { verifyEemail } from '@/api/auth/signup';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import MyToast from '@/components/ui/MyToast';
import Popple from '@/components/ui/Popple';
import Title from '@/components/ui/Title';
import ValidationMessage from '@/components/ui/ValidationMessage';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ConfirmSignup() {
  const {
    state: { email, isProceeded },
  } = useLocation();
  const [registerCodeInput, setRegisterCodeInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!registerCodeInput.trim()) {
      setMessage('승인코드를 입력해주세요');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }
    setIsSending(true);
    try {
      const response = verifyEemail(email, registerCodeInput);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterCodeInput(event.target.value);
  };

  if (!email) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <MyToast />
      <form
        className="flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-sm sm:w-[600px] sm:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-32">
          <Popple />
        </div>

        <Title
          text={`${
            isProceeded ? '이미 회원가입을 진행하셨습니다.' : ''
          } ${email} 메일함을 확인해주세요`}
        />
        <p className="text-sm text-subTextAndBorder dark:text-gray-400">
          발송해드린 승인코드를 입력해주세요 <br />
        </p>

        <div>
          <Input
            onChange={handleChange}
            value={registerCodeInput}
            label="승인코드"
            name="email"
          />
        </div>
        <ValidationMessage message={message} />

        <Button
          contents={
            isSending ? <LoadingSpinner color="white" /> : '회원가입 완료'
          }
          submit
        />
        <p className="mt-3 text-xs text-subTextAndBorder">
          승인코드가 오지 않았나요?{' '}
        </p>
      </form>
    </div>
  );
}
