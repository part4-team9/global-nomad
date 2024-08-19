import type { GetActivitiesRequest, GetActivitiesResponse } from '@/_types/activities/types';

import axiosInstance from '../axios';

async function getActivities(request: GetActivitiesRequest): Promise<GetActivitiesResponse> {
  const params =
    request.method === 'cursor'
      ? {
          method: request.method,
          cursorId: request.cursorId,
          size: request.size,
        }
      : { method: request.method, page: request.page, size: request.size };

  const response = await axiosInstance.get<GetActivitiesResponse>('/activities', {
    params: {
      ...params,
      category: request.category,
      keyword: request.keyword,
      sort: request.sort,
    },
  });
  return response.data;
}

export default getActivities;
