import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { Activity } from '@/(route)/activity/register/page';

import axiosInstance from './axios';

export const postActivity = async (body: Activity) => {
  try {
    const result = await axiosInstance.post('/activities', body);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status } = (error.response as AxiosResponse) ?? 500;
      throw status;
    } else {
      throw error;
    }
  }
};
