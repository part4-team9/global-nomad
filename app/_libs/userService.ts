import type { UserProfileData } from '@/_types/user';

import axiosInstance from './axios';

export const getUserProfile = async (): Promise<UserProfileData> => {
  const response = await axiosInstance.get<UserProfileData>('/users/me');
  return response.data;
};

export const patchUserProfile = async (data: Partial<UserProfileData>): Promise<UserProfileData> => {
  const response = await axiosInstance.patch<UserProfileData>('/users/me', data);
  return response.data;
};

export const generateProfileImageURl = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await axiosInstance.post<{ profileImageUrl: string }>('/users/me', image);
  return response.data.profileImageUrl;
};
