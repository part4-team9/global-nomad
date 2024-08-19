import { AxiosError, type AxiosResponse } from 'axios';

import type { GetUserType } from '@/_types/user';

import axiosInstance from '@/_libs/axios';

import type { LoginFormValues, Response } from '../type';

export const getUser = async () => {
  try {
    const res: AxiosResponse<GetUserType> = await axiosInstance.get('/users/me');
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw error;
    }
  }
};

export const postLogin = async (body: LoginFormValues) => {
  try {
    const res: AxiosResponse<Response> = await axiosInstance.post('/auth/login', body);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw error;
    }
  }
};
