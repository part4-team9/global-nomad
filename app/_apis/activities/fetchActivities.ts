import { AxiosError, type AxiosResponse } from 'axios';

import type { GetActivitiesResponse } from '@/_types/activities/types';

import axiosInstance from '@/_libs/axios';

export const fetchActivities = async () => {
  try {
    const res: AxiosResponse<GetActivitiesResponse> = await axiosInstance.get('/activities', {
      params: {
        method: 'offset',
        page: 1,
        size: 10,
        category: null,
        keyword: null,
        sort: 'latest',
        cursorId: null,
      },
    });

    if (!res.data || !Array.isArray(res.data.activities)) {
      throw new Error('Invalid response structure');
    }

    return res.data.activities;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error('Axios Error:', e.response?.data);
    } else {
      console.error('General Error:', e);
    }
  }
  return [];
};
