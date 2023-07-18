import { Outlet } from 'react-router-dom';

import AdminNav from '@/components/admin/AdminNav';

const AdminLayout = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
