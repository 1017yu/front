import { toast } from 'react-toastify';

export default function customToast(
  message: string,
  type: 'success' | 'error',
) {
  return toast[type](message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
}
