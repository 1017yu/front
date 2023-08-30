import { Outlet, useNavigate } from 'react-router-dom';
import AdminNav from '@/components/admin/AdminNav';
import { CommonModal } from '@/components/ui/CommonModal';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import { getRole } from '@/api/admin/adminRequests';
import customToast from '@/utils/customToast';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getRole();
        if (response) {
          if (response.role === 'ROLE_ADMIN') {
            return;
          } else {
            navigate('/');
            throw new Error('관리자만 접근가능합니다');
          }
        }
      } catch (error: any) {
        customToast(error.message, 'error');
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <RecoilRoot>
      <div className="flex flex-col sm:flex-row">
        <AdminNav />
        <Outlet />
        <CommonModal />
      </div>
    </RecoilRoot>
  );
};

export default AdminLayout;
