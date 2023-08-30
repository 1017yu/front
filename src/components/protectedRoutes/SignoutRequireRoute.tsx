import { useUser } from '@/hooks/useUser';
import { Navigate, Outlet } from 'react-router-dom';

export default function SignoutRequireRoute() {
  const { user } = useUser();
  if (!user) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}
