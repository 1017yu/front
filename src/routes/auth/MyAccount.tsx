import { Link, useNavigate } from 'react-router-dom';
import profile from '@/assets/dummy-profile.png';
import { useUser } from '@/hooks/useUser';
import {
  AiOutlineShop,
  AiOutlineCloseCircle,
  AiOutlineUserDelete,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import Input from '@/components/ui/Input';
import { useState } from 'react';
import { secession } from '@/api/auth/secession';
import customToast from '@/utils/customToast';

export default function MyAccount() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isSecessionOn, setIsSecesssionOn] = useState(false);

  const { openModal } = useModal();
  const { user, setUser } = useUser();

  const handleSecession = () => {
    if (!password) {
      customToast('비밀번호를 입력해주세요', 'error');
      return;
    }
    openModal({
      title: '정말 탈퇴하시겠습니까?',
      content: (
        <>
          <p>탈퇴 후 재가입은 한달 후 가능합니다</p>
        </>
      ),
      type: 'twoButton',
      okCallback: async () => {
        try {
          const response = await secession(user?.email as string, password);
          if (response.statusCode === 200) {
            customToast('회원정보를 삭제하였습니다. 안녕히가세요', 'success');
            setTimeout(() => {
              setUser(null);
              localStorage.removeItem('user');
              navigate('/');
            }, 2000);
          }
        } catch (error: any) {
          console.log(error);
          customToast(error.message, 'error');
        }
      },
      okButton: '탈퇴',
    });
  };
  return (
    <div className="container mx-auto flex justify-center px-10 py-2">
      <div className="mt-20 w-80">
        <div className="overflow-hidden rounded-md bg-white shadow-lg">
          <div
            className={`relative flex flex-col items-center p-6 ${
              user?.platform === 'KAKAO' ? 'bg-[#ffe812]' : 'bg-accent'
            }`}
          >
            <div className="absolute right-4 top-3 text-xs font-semibold text-gray-100 shadow-2xl">
              {user?.role === 'ROLE_SELLER' ? '판매자' : ''}
            </div>
            <img src={profile} alt="profile" className="w-40 rounded-full" />

            <p
              className={`pt-2 text-lg font-semibold ${
                user?.platform === 'KAKAO' ? '' : 'text-gray-100'
              }`}
            >
              {user?.nickname}
            </p>
            <p
              className={`text-sm ${
                user?.platform === 'KAKAO' ? '' : 'text-gray-100'
              }`}
            >
              {user?.email}
            </p>

            <Link
              to="/myaccount/edit"
              className={`group mt-2 rounded-full border-2 border-gray-800 px-4 py-2 text-xs font-semibold hover:opacity-70 
              ${
                user?.platform === 'KAKAO'
                  ? ''
                  : 'border-gray-100 text-gray-100'
              }
              `}
            >
              <div className="transition group-hover:opacity-60">
                회원 정보 수정
              </div>
            </Link>
          </div>
          <div className="border-b">
            <Link
              to="/myaccount/campaigns"
              className="flex px-4 py-4 hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <AiOutlineShop />
                <p className="text-sm font-medium leading-none text-gray-800">
                  내가 참여한 팝업스토어(기능없음)
                </p>
              </div>
            </Link>
            <Link
              to="/myaccount/campaigns"
              className="flex px-4 py-4 hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <BsBookmark />
                <p className="text-sm font-medium leading-none text-gray-800">
                  내가 북마크한 팝업스토어(기능없음)
                </p>
              </div>
            </Link>
          </div>
          {isSecessionOn ? (
            <div className="relative">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
              <AiOutlineCheckCircle
                size={20}
                className="absolute right-9 top-[14px] z-20 cursor-pointer text-accent transition hover:scale-110"
                onClick={handleSecession}
              />
              <AiOutlineCloseCircle
                size={20}
                className="absolute right-3 top-[14px] z-20 cursor-pointer text-rose-500 transition hover:scale-110"
                onClick={() => {
                  setIsSecesssionOn(false);
                }}
              />
            </div>
          ) : (
            <button
              className="flex w-full px-4 py-4 hover:bg-gray-100"
              onClick={() => {
                setIsSecesssionOn(true);
                setPassword('');
              }}
            >
              <div className="flex items-center gap-2 text-rose-500">
                <AiOutlineUserDelete />
                <p className="text-sm font-medium leading-none">회원탈퇴</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
