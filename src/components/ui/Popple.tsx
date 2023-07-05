import { Link } from 'react-router-dom';

export default function Popple() {
  return (
    <Link to="/">
      <img
        src="/popple.jpg"
        alt="logo"
        className="w-32 transition hover:scale-110"
      />
    </Link>
  );
}
