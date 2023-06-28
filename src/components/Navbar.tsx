import { NAV_ITEMS } from '@/constants/constants';

export default function Navbar() {
  return (
    <header className="container mx-auto flex items-center justify-between px-10 py-5">
      <div className="flex items-center gap-10">
        <img src="/popple.jpg" alt="main-logo" className="h-8" />
        <ul className="flex gap-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>{item.label}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex gap-2">
          <li className="text-gray-400">회원가입</li>
          <li>로그인</li>
        </ul>
      </div>
    </header>
  );
}
