import { isAxiosError } from 'axios';

import type { LoginFormValues, Response } from '@/_types/authentication';

import useUserStore from '@/_stores/useUserStore';

import { setCookie } from '@/_utils/cookie';

import axiosInstance from './axios';

interface ErrorResponse {
  message: string;
}

type PostLogin = (params: LoginFormValues) => Promise<Response>;

export const postLogin: PostLogin = async ({ email, password }) => {
  const { setLoginStatus } = useUserStore.getState();
  try {
    const { data } = await axiosInstance.post<Response>('/auth/login', {
      email,
      password,
    });
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    setLoginStatus(true, data);
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
