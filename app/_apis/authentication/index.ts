import { isAxiosError } from 'axios';

import axiosInstance from '@/_libs/axios';
import { setCookie } from '@/_utils/cookie';

type FormValues = {
  email: string;
  password: string;
};

interface Response {
  accessToken: 'string';
  refreshToken: 'string';
  user: {
    createdAt: 'string';
    email: 'string';
    id: 'number';
    nickname: 'string';
    profileImageUrl: 'string';
    updatedAt: 'string';
  };
}

type PostLogin = (params: FormValues) => Promise<Response>;

export const postLogin: PostLogin = async ({ email, password }) => {
  try {
    const { data } = await axiosInstance.post<Response>(
      '/auth/login',

      // '/auth/login',
      {
        email,
        password,
      },
      {
        // withCredentials: true,
        authorization: false,
      },
    );
    setCookie('accessToken', data.refreshToken);
    setCookie('userId', data.user.id);
    setCookie('profileImageUrl', data.user.profileImageUrl);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        throw new Error(error.response.data.message);
      }
    }
    console.log(error);
    throw new Error('API_ERROR');
    // console.error('서버와 통신 중 오류 발생:', error);
  }
};
