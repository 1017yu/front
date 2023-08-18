import { Flip, ToastContainer } from 'react-toastify';

export default function MyToast() {
  return (
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
  );
}
