import { NAV_ITEMS } from '@/data/constants';
import { Link } from 'react-router-dom';
import Popple from './ui/Popple';
import { useUser } from '@/hooks/useUser';

export default function Navbar() {
  const { user } = useUser();
  return (
    <header className="container mx-auto flex items-center justify-between px-10 py-5">
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
              <li className="text-subTextAndBorder">{user.email}님</li>
              <li>
                <img
                  src={
                    `${user.profileImgUrl}` === 'profileDefaultImageUrl'
                      ? '/dummy-profile.png'
                      : user.profileImgUrl
                  }
                  alt="profile"
                  className="w-8 rounded-full"
                />
              </li>
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
