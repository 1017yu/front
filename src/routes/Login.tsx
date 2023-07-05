import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '@/components/ui/Toggle';
import KakoaButton from '@/components/ui/KakoaButton';

export default function Login() {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });

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
    <Container>
      <div className="flex items-center py-32">
        <div className="login_bg absolute right-0 z-10 h-[500px] w-full opacity-30" />
        <div className="w-3/5">
          <h1 className="text-3xl font-bold text-accent">반가워요!</h1>
          <p className="mt-4 text-xl leading-relaxed">
            포플 피플 퍼플 Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Alias recusandae saepe labore eaque officiis excepturi nobis,
            voluptatum velit fugiat voluptas magnam molestias natus voluptate
            eligendi tenetur ratione vitae error! Voluptas.{' '}
          </p>
        </div>
        <form
          className="z-20 mt-10 flex w-full flex-col gap-4 rounded-lg bg-white p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-2/6"
          onSubmit={handleLogin}
        >
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
              <Link to="/findpassword" className="transition hover:text-black">
                비밀번호 찾기
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
}
