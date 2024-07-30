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
      if (error.response?.status === 409) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        throw new Error(error.response.data.message);
      }
    }
    console.log(error);
    throw new Error('API_ERROR 회원가입 PostSignup');
  }
};
