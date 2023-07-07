import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Popple from '@/components/ui/Popple';
import ValidationMessage from '@/components/ui/ValidationMessage';
import { PASSWORD_REGEX } from '@/data/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    city: '',
    district: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // 수정해야함
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        setImage(reader.result as string);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupInput({
      ...signupInput,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      setMessage('필수 항목을 입력해주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    // 이메일 형식 옳지 않은 경우
    if (!PASSWORD_REGEX.test(signupInput.password)) {
      setMessage('비밀번호는 영문 숫자 조합 8자리 이상');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    if (signupInput.password !== signupInput.passwordCheck) {
      setMessage('비밀번호를 확인해주세요');
      const id = setTimeout(() => {
        setMessage('');
      }, 2000);
      setTimeoutId(id);
      return;
    }

    console.log(signupInput, image);
    // api통신
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-slate-100">
      <form
        className="flex w-5/6 flex-col gap-1 rounded-md bg-white p-5 shadow-sm sm:w-[600px] sm:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-32">
          <Popple />
        </div>
        <div className="flex items-end gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <Input
              label="이메일*"
              name="email"
              onChange={handleChange}
              value={signupInput.email}
              placeholder="example@popple.com"
            />
            <Input
              label="닉네임*"
              name="nickname"
              onChange={handleChange}
              value={signupInput.nickname}
            />
          </div>
          <div className="hidden sm:block">
            <ImageUpload handleChange={handleImageUpload} image={image} />
          </div>
        </div>
        <Input
          label="비밀번호* (영문 숫자 조합 8자리 이상)"
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
        <div className="flex gap-4">
          <Input
            label="시*"
            name="city"
            onChange={handleChange}
            value={signupInput.city}
            placeholder="서울시"
          />
          <Input
            label="구*"
            name="district"
            onChange={handleChange}
            value={signupInput.district}
            placeholder="강남구"
          />
        </div>
        <ValidationMessage message={message} />
        <div className="mt-5 flex-1">
          <Button
            contents={
              isSending ? <LoadingSpinner color="accent" /> : '회원가입'
            }
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
