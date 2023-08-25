import { kakaologin } from '@/api/auth/kakao';
import { useUser } from '@/hooks/useUser';
import { ILocalUser } from '@/types/ISignin';
import customToast from '@/utils/customToast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Kakao() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          `grant_type=authorization_code&client_id=510e09592b1197652bfa854b34a2592d&redirect_uri=http://localhost:5173/auth/kakao/callback&code=${code}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );
        if (response1.status === 200) {
          try {
            const response2 = await kakaologin(response1.data.access_token);
            if (response2.statusCode === 200) {
              const localUserData: ILocalUser = {
                role: response2.data.role,
                email: response2.data.email,
                nickname: response2.data.nickname,
                profileImgUrl: response2.data.profileImgUrl,
                accessToken: response2.data.accessToken,
                refreshToken: response2.data.refreshToken,
                platform: response2.data.platform,
              };

              setUser(localUserData);
              localStorage.setItem('user', JSON.stringify(localUserData));
              navigate('/');
              // 성공메세지 토스트
              customToast(
                `${localUserData.nickname}님 반가워요🖐️🖐️`,
                'success',
              );
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            console.error(error);
            customToast(
              `우리서버에 요청 중 에러 발생 ${error.message}`,
              'error',
            );
          }
        }
      } catch (error: any) {
        console.error(error);
        customToast(`카카오에게 요청 중 에러 발생 ${error.message}`, 'error');
      }
    };

    fetchData();
  }, [code]);
  return <div></div>;
}
