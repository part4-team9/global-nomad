import { isAxiosError } from 'axios';

import axiosInstance from '@/_libs/axios';

// 회원가입
type FormValues = {
  email: string;
  nickname: string;
  password: string;
};

interface Response {
  createdAt: 'string';
  email: 'string';
  id: 'number';
  nickname: 'string';
  profileImageUrl: 'string';
  updatedAt: 'string';
}

interface ErrorResponse {
  message: string;
}

type PostSignup = (params: FormValues) => Promise<boolean>;

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
    console.log(error);
    throw new Error('NOT 409 ERROR');
  }
};
