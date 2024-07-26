/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosInstance from './axios';

export const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/tokens');
  return response.data;
};
