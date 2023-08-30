import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Flip } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { CommonModal } from '@/components/ui/CommonModal';

export default function Layout() {
  return (
    <RecoilRoot>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col justify-center bg-gray-100">
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
      <CommonModal />
    </RecoilRoot>
  );
}
