import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/AdminLayout';
import AdminSurvey from '@/routes/admin/AdminSurvey';
import AdminSurveyDetail from '@/routes/admin/AdminSurveyDetail';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';
import Signin from './routes/Signin';
import SignUp from './routes/SignUp';
import Kakao from './routes/Kakao';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/auth/kakao/callback" element={<Kakao />} />
        {/* not found */}
        <Route path="/*" element={<NotFound />} />
      </Route>
      {/* 로그인 회원가입은 Navbar, Footer 없이 */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/survey" element={<AdminSurvey />} />
        <Route path="/admin/survey/detail" element={<AdminSurveyDetail />} />
      </Route>
    </Routes>
  );
}
