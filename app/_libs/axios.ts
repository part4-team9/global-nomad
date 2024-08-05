/* eslint-disable no-param-reassign */
import axios from 'axios';

import { getCookie } from '@/_utils/cookie';

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    authorization?: boolean;
  }
}

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
