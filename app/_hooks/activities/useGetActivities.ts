import { useQuery } from '@tanstack/react-query';

import type { GetActivitiesRequest } from '@/_types/activities/types';

import getActivities from '@/_libs/activities/activitiesApi';

const useGetActivities = (request: GetActivitiesRequest) =>
  useQuery({
    queryKey: [
      'activities',
      request.method,
      request.method === 'cursor' ? request.cursorId : request.page,
      request.size,
      request.category,
      request.keyword,
      request.sort,
    ],
    queryFn: () => getActivities(request),
  });

export default useGetActivities;
