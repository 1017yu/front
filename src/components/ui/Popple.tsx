import { Link } from 'react-router-dom';
import popple from '@/assets/popple.jpg';

export default function Popple() {
  return (
    <Link to="/">
      <img
        src={popple}
        alt="logo"
        className="w-32 transition hover:scale-110"
      />
    </Link>
  );
}
