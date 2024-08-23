import axios from 'axios';

import type { Activity } from '@/_types/activities/form.types';

import axiosInstance from '@/_libs/axios';

const postActivity = async (body: Activity) => {
  try {
    const result = await axiosInstance.post('/activities', body);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    } else {
      throw error;
    }
  }
};

export default postActivity;
