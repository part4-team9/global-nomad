import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';

import type { ActivityDetail } from '@/_types/activities/formTypes';

import axiosInstance from '@/_libs/axios';

const getActivity = async (activityId: string) => {
  try {
    const result: AxiosResponse<ActivityDetail> = await axiosInstance.get(`/activities/${activityId}`);
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw error;
    }
  }
};

export default getActivity;
