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
import Events from '@/routes/events/Events';
import Event from '@/routes/events/Event';
import ForgotPassword from './routes/ForgotPassword';
import Community from '@/routes/Community';
import Post from '@/routes/Post';
import NewPost from '@/routes/NewPost';
import Survey from '@/routes/survey/Survey';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<Post />} />
        <Route path="/auth/kakao/callback" element={<Kakao />} />
        <Route path="/survey" element={<Survey />} />
        {/* not found */}
        <Route path="/*" element={<NotFound />} />
      </Route>
      {/* 로그인 회원가입은 Navbar, Footer 없이 */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/community/new" element={<NewPost />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/survey" element={<AdminSurvey />} />
        <Route path="/admin/survey/detail" element={<AdminSurveyDetail />} />
      </Route>
    </Routes>
  );
}
