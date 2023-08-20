import { Outlet } from 'react-router-dom';
import AdminNav from '@/components/admin/AdminNav';
import { AdminModal } from '@/components/admin/AdminModal';
import { RecoilRoot } from 'recoil';

const AdminLayout = () => {
  return (
    <RecoilRoot>
      <div className="flex flex-col sm:flex-row">
        <AdminNav />
        <Outlet />
        <AdminModal />
      </div>
    </RecoilRoot>
  );
};

export default AdminLayout;
