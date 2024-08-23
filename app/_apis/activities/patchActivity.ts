import axios from 'axios';
import type { ActivityEdit } from '@/(route)/activity/edit/[id]/page';

import axiosInstance from '@/_libs/axios';

interface PatchActivityProps {
  body: ActivityEdit;
  id: string;
}

const patchActivity = async ({ id, body }: PatchActivityProps) => {
  try {
    const result = await axiosInstance.patch(`/my-activities/${id}`, body);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    } else {
      throw error;
    }
  }
};

export default patchActivity;
