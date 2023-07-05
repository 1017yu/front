import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    address: '',
    profileImgUrl: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [image, setImage] = useState<string | null>(null);

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
    console.log(signupInput, image);
    // api통신
  };

  return (
    <form
      className="h-100vh flex h-screen flex-col items-center gap-10 bg-slate-100 p-10"
      onSubmit={handleSubmit}
    >
      <Title text="POPPLE 회원가입" />
      <div className="flex h-[calc(100vh-200px)] w-[700px] flex-col gap-4 rounded-md bg-white p-10 shadow-sm">
        <div className="flex items-end gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <Input
              label="이메일"
              name="email"
              onChange={handleChange}
              value={signupInput.email}
            />
            <Input
              label="닉네임"
              name="nickname"
              onChange={handleChange}
              value={signupInput.nickname}
            />
          </div>
          <ImageUpload handleChange={handleImageUpload} image={image} />
        </div>
        <Input
          label="비밀번호"
          name="password"
          onChange={handleChange}
          value={signupInput.password}
          type="password"
        />
        <Input
          label="비밀번호 확인"
          name="passwordCheck"
          onChange={handleChange}
          value={signupInput.passwordCheck}
          type="password"
        />
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Input
              label="주소"
              name="address"
              onChange={handleChange}
              value={signupInput.address}
            />
          </div>
          <div className="w-32">
            <Button contents="주소 검색" secondary />
          </div>
        </div>
        <div className="mt-5 flex-1">
          <Button
            contents={
              isSending ? <LoadingSpinner color="accent" /> : '회원가입'
            }
          />
        </div>
        <p className="text-xs text-subTextAndBorder">
          이미 POPPLE 회원이시간요?{' '}
          <Link className="transition hover:text-black" to="/login">
            로그인 하러가기
          </Link>
        </p>
      </div>
    </form>
  );
}
