import { NAV_ITEMS } from '@/data/constants';
import { Link } from 'react-router-dom';
import Popple from './ui/Popple';
import { useUser } from '@/hooks/useUser';
import dummyProfile from '@/assets/dummy-profile.png';
import { Button } from '@mui/material';
import { useState } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';
import { logout } from '@/api/auth/logout';
import customToast from '@/utils/customToast';

export default function Navbar() {
  const { user, setUser } = useUser();

  const [isLoggingout, setIsLoggingout] = useState(false);
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string).refreshToken
      : null;
    try {
      setIsLoggingout(true);
      await logout(refreshToken);
    } catch (error) {
      console.log(error);
    } finally {
      // 통신에 성공하든 실패하든 전역상태 삭제, 로컬저장소 삭제
      customToast('안녕히가세요 🖐️🖐️', 'success');
      setUser(null);
      localStorage.removeItem('user');
      setIsLoggingout(false);
    }
  };

  return (
    <header className="container mx-auto flex h-12 items-center justify-between border-b px-10 py-2 shadow-lg">
      <div className="flex items-center gap-10">
        <Popple />
        <ul className="flex gap-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex items-center gap-2">
          {/* 관리자 메뉴 임시 생성 */}
          <li>
            <Link to="/admin/survey">관리자</Link>
          </li>

          {user ? (
            <>
              <li className="text-subTextAndBorder">
                <Link to="/myaccount">{user.nickname}님</Link>
              </li>
              <li>
                <Link to="/myaccount">
                  <img
                    src={
                      `${user.profileImgUrl}` === 'profileDefaultImageUrl'
                        ? dummyProfile
                        : user.profileImgUrl
                    }
                    alt="profile"
                    className="w-8 rounded-full"
                  />
                </Link>
              </li>
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={handleLogout}
              >
                {isLoggingout ? <LoadingSpinner color="red" /> : '로그아웃'}
              </Button>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
