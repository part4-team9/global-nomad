import type { ActivitiesResponse } from '@/_types';

import axiosInstance from './axios';

export interface GetActivitiesParams {
  cursorId?: number;
  size?: number;
}

export const getMyActivities = async (params: GetActivitiesParams): Promise<ActivitiesResponse> => {
  const response = await axiosInstance.get<ActivitiesResponse>(`/my-activities`, {
    params,
  });
  return response.data;
};

export const deleteActivity = async (activityId: number): Promise<void> => {
  await axiosInstance.delete(`/my-activities/${activityId}`);
};
