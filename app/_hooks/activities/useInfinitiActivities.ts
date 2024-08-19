import { useInfiniteQuery } from '@tanstack/react-query';

import type { GetActivitiesResponse, InfinityScrollRequest } from '@/_types/activities/types';

import getActivities from '@/_libs/activities/activitiesApi';

const useInfiniteActivities = (request: InfinityScrollRequest) =>
  useInfiniteQuery<GetActivitiesResponse>({
    queryKey: ['activities', request.method, request.cursorId, request.size, request.sort],
    queryFn: ({ pageParam = request.cursorId }) => getActivities({ ...request, cursorId: pageParam as number | null }),
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    initialPageParam: request.cursorId,
  });

export default useInfiniteActivities;
