import { AxiosError } from 'axios';

import type { Experience } from '@/_types/details/types';

import axiosInstance from '@/_libs/axios';

export const fetchExperienceData = async (activityId: string): Promise<Experience> => {
  try {
    const response = await axiosInstance.get<Experience>(`/activities/${activityId}`);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      throw new Error('요청하신 데이터를 찾을 수 없습니다. URL을 확인해 주세요.');
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
