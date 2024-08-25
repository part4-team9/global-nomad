import { isAxiosError } from 'axios';

import axiosInstance from '@/_libs/axios';

import type { Response, SignupFormValues } from '../type';

// 회원가입
interface ErrorResponse {
  message: string;
}

type PostSignup = (params: SignupFormValues) => Promise<boolean>;

export const postSignup: PostSignup = async ({ email, nickname, password }) => {
  try {
    const response = await axiosInstance.post<Response>(
      '/users',

      {
        email,
        nickname,
        password,
      },
      {
        authorization: false,
      },
    );
    return response.status === 201;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data as ErrorResponse;
      const errorMessage = errorData?.message || '회원가입 중 오류가 발생했습니다.';
      if (error.response?.status === 409) {
        throw new Error(errorMessage);
      }
    }
    throw new Error('NOT 409 ERROR');
  }
};
