import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './contexts/UserContext.tsx';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </UserProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
