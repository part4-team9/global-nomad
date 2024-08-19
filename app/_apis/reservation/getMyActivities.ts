import type { ActivitiesResponse } from '@/_types';

import axiosInstance from '@/_libs/axios';

export default async function getMyActivities(): Promise<ActivitiesResponse> {
  const response = await axiosInstance.get('/my-Activities');
  return response.data;
}
