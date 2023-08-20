import { API_BASE_URL } from '@/data/constants';
import axios, { AxiosError } from 'axios';

export const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async function (req) {
    const accessToken = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string).accessToken
      : null;
    if (!accessToken) {
      return req;
    }
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    // AxiosError에서 서버에서 내려오는 error response만 파싱
    return Promise.reject(error.response?.data);
  },
);
