import { useUser } from '@/hooks/useUser';
import customToast from '@/utils/customToast';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function SigninRequireRoute() {
  const { user } = useUser();
  const currentLocation = useLocation();
  if (user) {
    return <Outlet />;
  }
  customToast('로그인 해주세요', 'error');
  return (
    <Navigate
      to="/signin"
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  );
}
