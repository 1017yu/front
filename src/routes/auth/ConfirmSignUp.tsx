import { regenerateRegisterToken, verifyEemail } from '@/api/auth/signup';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import MyToast from '@/components/ui/MyToast';
import Popple from '@/components/ui/Popple';
import Title from '@/components/ui/Title';
import customToast from '@/utils/customToast';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ConfirmSignup() {
  const navigate = useNavigate();

  const {
    state: { email, isProceeded },
  } = useLocation();

  const [registerCodeInput, setRegisterCodeInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!registerCodeInput.trim()) {
      customToast('승인코드를 입력해주세요', 'error');
      return;
    }
    try {
      setIsSending(true);
      const response = await verifyEemail(email, registerCodeInput);
      if (response.status === 200) {
        customToast(
          `인증이 완료되었습니다! 로그인 화면으로 이동합니다`,
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
      setIsSending(false);
    }
  };

  const handleRegenerateRegisterToken = async () => {
    if (
      confirm('승인코드를 재전송하시겠습니까? (스팸함에 있을 수도 있어요...)')
    ) {
      try {
        const response = await toast.promise(regenerateRegisterToken(email), {
          pending: '승인코드 재전송 중... 🕊️',
          success: '전송이 완료되었습니다 👌',
          error: '승인코드 전송에 실패하였습니다 🤯',
        });
        if (response.statusCode === 200) {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
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
            onChange={(e) => setRegisterCodeInput(e.target.value)}
            value={registerCodeInput}
            label="승인코드"
            name="email"
          />
        </div>

        <Button
          contents={
            isSending ? <LoadingSpinner color="white" /> : '회원가입 완료'
          }
          submit
        />
        <div className="space-y-1 text-xs text-subTextAndBorder">
          <div>
            승인코드가 오지 않았나요?
            <br />
            조금 더 기다리거나 스팸함을 확인해주세요
            <br />
          </div>
          <span
            className="cursor-pointer transition hover:text-black"
            onClick={handleRegenerateRegisterToken}
          >
            승인코드 재전송
          </span>
        </div>
      </form>
    </div>
  );
}
