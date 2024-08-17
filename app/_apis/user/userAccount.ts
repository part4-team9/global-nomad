import axiosInstance from '@/_libs/axios';
import { AxiosResponse } from 'axios';

interface GetUser {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const getUser = async () => {
  try {
    const res: AxiosResponse<GetUser> = await axiosInstance.get('/users/me');
    return res.data;
  } catch (error) {
    throw error;
  }
};
