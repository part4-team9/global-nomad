import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { EditSchedule } from '@/(route)/activity/edit/[id]/page';
import type { Activity } from '@/(route)/activity/register/page';

import axiosInstance from '@/_libs/axios';

export interface SubImage {
  id?: number;
  imageUrl: string;
}

export interface ActivityDetail extends Activity {
  createdAt: string;
  id: number;
  rating: number;
  reviewCount: number;
  schedules: EditSchedule[];
  subImages: SubImage[];
  updatedAt: string;
  userId: number;
}

const getActivity = async (activityId: string) => {
  try {
    const result: AxiosResponse<ActivityDetail> = await axiosInstance.get(`/activities/${activityId}`);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status } = (error.response as AxiosResponse) ?? 500;
      throw status;
    } else {
      throw error;
    }
  }
};

export default getActivity;
