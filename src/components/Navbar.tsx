import { NAV_ITEMS } from '@/constants/constants';
import Container from '@/components/ui/Container';

export default function Navbar() {
  return (
    <Container>
      <header className="flex items-center justify-between py-5">
        <div className="flex items-center gap-10">
          <img src="/sweetspot-logo.svg" alt="main-logo" className="h-8" />
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
    </Container>
  );
}
