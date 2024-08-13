import type {ActivitiesResponse } from '@/_types';

import axiosInstance from '@/_libs/axios';

export default async function getMyActivities(): Promise<ActivitiesResponse> {
  const response = await axiosInstance.get('/my-Activities');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
}
