import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import MyToast from './ui/MyToast';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-slate-100">
        <Outlet />
      </div>
      <Footer />
      <MyToast />
    </div>
  );
}
