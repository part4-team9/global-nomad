import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import getActivities from '@/_libs/activities/activitiesApi';

import Carousel from '@/_components/Carousel';

/**
 * BannerContainer 컴포넌트 입니다.
 */

export default async function BannerContainer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities', 'cursor', null, 5, null, null, 'most_reviewed'],
    queryFn: () =>
      getActivities({
        method: 'cursor',
        cursorId: null,
        size: 5,
        sort: 'most_reviewed',
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Carousel />
    </HydrationBoundary>
  );
}
