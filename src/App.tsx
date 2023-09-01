import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import AdminSurvey from '@/routes/admin/AdminSurvey';
import AdminSurveyDetail from '@/routes/admin/AdminSurveyDetail';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';
import SignUp from '@/routes/auth/SignUp';
import Kakao from '@/routes/auth/Kakao';
import Events from '@/routes/events/Events';
import Event from '@/routes/events/Event';
import Community from '@/routes/community/Community';
import Post from '@/routes/community/Post';
import NewPost from '@/routes/community/NewPost';
import ForgotPassword from '@/routes/auth/ForgotPassword';
import SignIn from '@/routes/auth/SignIn';
import ConfirmSignup from '@/routes/auth/ConfirmSignUp';
import MyToast from '@/components/ui/MyToast';
import PostEvent from '@/routes/seller/PostEvent';
import Survey from '@/routes/survey/Survey';
import SurveyResults from '@/routes/survey/SurveyResults';
import SurveyResultDetail from '@/routes/survey/SurveyResultDetail';
import EditUserInfo from '@/routes/auth/EditUserInfo';
import MyAccount from '@/routes/auth/MyAccount';
import ModifyEvent from '@/routes/seller/ModifyEvent';
import SignoutRequireRoute from '@/components/protectedRoutes/SignoutRequireRoute';
import SigninRequireRoute from '@/components/protectedRoutes/SigninRequireRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { s3config } from '@/data/s3configs';

import AWS from 'aws-sdk';

export default function App() {
  AWS.config.update(s3config);

  return (
    <>
      <MyToast />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* 로그인이 필요한 라우트 */}
          <Route element={<SigninRequireRoute />}>
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/myaccount/edit" element={<EditUserInfo />} />
            <Route path="/community/new" element={<NewPost />} />
            <Route path="/survey" element={<Survey />} />
          </Route>

          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<Post />} />
          <Route path="/auth/kakao/callback" element={<Kakao />} />
          <Route path="/seller/new" element={<PostEvent />} />
          <Route path="/seller/modify" element={<ModifyEvent />} />
          <Route path="/survey-results" element={<SurveyResults />} />
          <Route
            path="/survey-results/:surveyId"
            element={<SurveyResultDetail />}
          />

          {/* not found */}
          <Route path="/*" element={<NotFound />} />
        </Route>

        {/* 로그인시 접근 불가능 */}
        <Route element={<SignoutRequireRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/confirmsignup" element={<ConfirmSignup />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/survey" element={<AdminSurvey />} />
          <Route path="/admin/survey/detail" element={<AdminSurveyDetail />} />
        </Route>
      </Routes>
    </>
  );
}
