import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Kakao() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          'grant_type=authorization_code&' +
            `client_id=921fbdc50a1c510a40df3bebfcf15573&` +
            `redirect_uri=http://localhost:5173/auth/kakao/callback&` +
            `code=${code}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );
        

        // Handle the response data here
        console.log(response);
        console.log(response.data.access_token);
        // const tokenPayload = jwt_decode(response.data.access_token);
        // console.log(tokenPayload);
        setUser(response.data);
      } catch (error) {
        // Handle errors here
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return <div>{'howoo'}</div>;
}
