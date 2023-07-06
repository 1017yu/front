import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-slate-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
