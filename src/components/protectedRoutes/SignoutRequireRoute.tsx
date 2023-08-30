import { useUser } from '@/hooks/useUser';
import customToast from '@/utils/customToast';
import { Navigate, Outlet } from 'react-router-dom';

export default function SignoutRequireRoute() {
  const { user } = useUser();
  if (!user) {
    return <Outlet />;
  }
  customToast('로그아웃 해주세요', 'error');
  return <Navigate to="/" replace />;
}
