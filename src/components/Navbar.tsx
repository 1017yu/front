import { Link, useLocation, useNavigate } from 'react-router-dom';
import Popple from './ui/Popple';
import { useUser } from '@/hooks/useUser';
import dummyProfile from '@/assets/dummy-profile.png';
import { Button } from '@mui/material';
import { useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { logout } from '@/api/auth/logout';
import customToast from '@/utils/customToast';
import { NAV_ITEMS } from '@/data/constants/navItems';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Navbar() {
  const navigate = useNavigate();
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
      customToast('안녕히가세요 🖐️', 'success');
      setUser(null);
      localStorage.removeItem('user');
      setIsLoggingout(false);
      setIsMobileMenuOpen(false);
      navigate('/');
    }
  };

  const { pathname } = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className="sm:px10 container mx-auto flex h-12 items-center justify-between px-5 py-2">
      <div className="hidden items-center gap-10 sm:flex">
        <Popple />
        <ul className="flex gap-7">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`transition hover:text-accent ${
                  pathname === item.href ? 'font-bold text-accent' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden sm:block">
        <ul className="flex items-center gap-3">
          {user ? (
            user.role === 'ROLE_ADMIN' ? (
              <>
                <li>
                  <Link to="/admin/survey">관리자</Link>
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
                      className="h-8 w-8 rounded-full object-cover"
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
            )
          ) : (
            <>
              <li>
                <Link to="/signin" className="transition hover:text-accent">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup" className="transition hover:text-accent">
                  회원가입
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* 모바일 헤더 */}
      <div className="flex w-full items-center justify-between sm:hidden">
        <Popple />
        <AiOutlineMenu size={20} onClick={openMobileMenu} />
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80">
          <AiOutlineClose
            size={20}
            className="absolute right-5 top-3 text-white"
            onClick={closeMobileMenu}
          />
          <ul className="flex flex-col gap-10 text-center text-lg font-bold text-white">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`transition hover:text-accent ${
                    pathname === item.href ? 'font-bold text-accent' : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user ? (
              user.role === 'ROLE_ADMIN' ? (
                <>
                  <li>
                    <Link to="/admin/survey" onClick={closeMobileMenu}>
                      관리자
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      handleLogout;
                      closeMobileMenu;
                    }}
                    className="text-rose-400"
                  >
                    로그아웃
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="transition hover:text-accent"
                      to="/myaccount"
                    >
                      개인정보
                    </Link>
                  </li>
                  <li onClick={handleLogout} className="text-rose-400">
                    로그아웃
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <Link to="/signin" className="transition hover:text-accent">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="transition hover:text-accent">
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
