import { UserProfileData } from '@/_types/user';
import axiosInstance from './axios';

export const getUserProfile = async (): Promise<UserProfileData> => {
  const response = await axiosInstance.get<UserProfileData>('/users/me');
  return response.data;
};
