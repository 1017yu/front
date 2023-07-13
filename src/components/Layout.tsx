import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Flip } from 'react-toastify';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-slate-100">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        transition={Flip}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
