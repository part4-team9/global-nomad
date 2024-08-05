import type { AxiosResponse } from 'axios';
import axios from 'axios';

import axiosInstance from '@/_libs/axios';

const postImage = async (body: File) => {
  try {
    const result = await axiosInstance.post('/activities/image', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export default postImage;
