import { forgotpassword } from '@/api/auth/forgotpassword';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Popple from '@/components/ui/Popple';
import Title from '@/components/ui/Title';
import { EMAIL_REGEX } from '@/data/constants/regex';
import customToast from '@/utils/customToast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailInput.trim()) {
      customToast('이메일을 입력해주세요', 'error');
      return;
    }
    if (!EMAIL_REGEX.test(emailInput)) {
      customToast('올바른 이메일을 입력해주세요', 'error');
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await toast.promise(forgotpassword(emailInput), {
        pending: '임시비밀번호 전송 중... 🕊️',
        success: '로그인 후 비밀번호를 변경해주세요 👌',
      });
      if (response.statusCode === 200) {
        navigate('/signin');
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      customToast(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <form
        className="flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-lg sm:w-[600px] sm:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-32">
          <Popple />
        </div>
        <Title text="비밀번호를 잊으셨나요?" />
        <p className="text-sm text-subTextAndBorder dark:text-gray-400">
          이메일을 입력해주시면 <br />
          임시비밀번호를 전달해드리겠습니다
        </p>

        <div>
          <Input
            onChange={(e) => setEmailInput(e.target.value)}
            value={emailInput}
            label="등록한 이메일"
            name="email"
          />
        </div>

        <Button
          contents={
            isSubmitting ? (
              <LoadingSpinner color="white" />
            ) : (
              '임시비밀번호 발급'
            )
          }
          submit
        />
        <p className="mt-3 text-xs text-subTextAndBorder">
          비밀번호가 생각이 나셨나요?{' '}
          <Link to="/signin" className="transition hover:text-black">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
