import type { AxiosError, AxiosRequestConfig } from 'axios';
import { isAxiosError } from 'axios';
import type { LoginFormValues, Response } from '@/_apis/type';

import { setCookie } from '@/_utils/cookie';

import axiosInstance from './axios';

interface ErrorResponse {
  message: string;
}

type PostLogin = (params: LoginFormValues) => Promise<Response>;

let isRefreshing = false;
let failedQueue: Array<{
  reject: (reason?: unknown) => void;
  resolve: (value: string | PromiseLike<string | undefined> | undefined) => void;
}> = [];

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
}

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || undefined);
    }
  });

  failedQueue = [];
};

export const tokenRefresh = async (): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await axiosInstance.post<Response>('/auth/tokens');
  const { accessToken, refreshToken } = response.data;
  setCookie('accessToken', accessToken);
  setCookie('refreshToken', refreshToken);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return { accessToken, refreshToken };
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest.retry) {
      if (isRefreshing) {
        return new Promise<string | undefined>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest) {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            }
            return Promise.reject(new Error('Original request is undefined'));
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest.retry = true;
      isRefreshing = true;

      return new Promise<string | undefined>((resolve, reject) => {
        tokenRefresh()
          .then(({ accessToken }) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export const postLogin: PostLogin = async ({ email, password }) => {
  try {
    const { data } = await axiosInstance.post<Response>(
      '/auth/login',
      {
        email,
        password,
      },
      {
        authorization: false,
      },
    );
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    setCookie('userId', data.user.id.toString());
    setCookie('profileImageUrl', data.user.profileImageUrl);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data as ErrorResponse;
      const errorMessage = errorData?.message || '로그인 중 오류가 발생했습니다.';
      if (error.response?.status === 404 || error.response?.status === 401) {
        throw new Error(errorMessage);
      }
    }
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
};
