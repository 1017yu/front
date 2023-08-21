import { Outlet } from 'react-router-dom';
import AdminNav from '@/components/admin/AdminNav';
import { CommonModal } from '@/components/ui/CommonModal';
import { RecoilRoot } from 'recoil';

const AdminLayout = () => {
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
