import axiosInstance from '@/_libs/axios';
import { AxiosResponse } from 'axios';
import { LoginFormValues, Response } from '../type';
import { GetUserType } from '@/_types/user';

export const getUser = async () => {
  try {
    const res: AxiosResponse<GetUserType> = await axiosInstance.get('/users/me');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postLogin = async (body: LoginFormValues) => {
  try {
    const res: AxiosResponse<Response> = await axiosInstance.post('/auth/login', body);
    return res.data;
  } catch (error) {
    throw error;
  }
};
