import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-10 text-6xl font-bold text-red-500">404</h1>
        <p className="mb-6 text-xl text-gray-600">
          해당 페이지를 찾을 수 없습니다!
          <br />
        </p>
        <button
          className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
