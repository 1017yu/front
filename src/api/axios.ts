import axios, { AxiosError } from 'axios';

export const apiInstance = axios.create({
  baseURL: 'http://15.164.205.25:8080/api/',
});

apiInstance.interceptors.request.use(
  function (config) {
    return config;
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
    return Promise.reject(error.response?.data);
  },
);
