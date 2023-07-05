import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Kakao from './routes/Kakao';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/auth/kakao/callback" element={<Kakao />} />
        <Route path="/signup" element={<SignUp />} />
        {/* not found */}
        <Route path="/*" element={<NotFound />} />
      </Route>
      {/* 회원가입은 Navbar, Footer 없이 */}
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
