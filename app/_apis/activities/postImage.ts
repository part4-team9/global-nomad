import type { AxiosResponse } from 'axios';
import axios from 'axios';

import axiosInstance from '@/_libs/axios';

interface PostImageResponse {
  activityImageUrl: string;
}

const postImage = async (body: FormData): Promise<PostImageResponse> => {
  try {
    const response: AxiosResponse<PostImageResponse> = await axiosInstance.post('/activities/image', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status } = (error.response as AxiosResponse) ?? { status: 500 };
      throw status;
    } else {
      throw error;
    }
  }
};

export default postImage;
