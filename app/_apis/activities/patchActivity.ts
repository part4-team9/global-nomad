import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { Activity } from '@/(route)/activity/register/page';

import axiosInstance from '@/_libs/axios';

interface PatchActivityProps {
  body: Activity;
  id: number;
}

const patchActivity = async ({ id, body }: PatchActivityProps) => {
  try {
    const result = await axiosInstance.post(`/my-activities/${id}`, body);
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

export default patchActivity;
