import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import getActivities from '@/_libs/activities/activitiesApi';

import HotListsCarousel from './HotListsCarousel';
import HotActivityListsLayout from '../Layout/HotActivityListsLayout';

/**
 * 인기 체험 리스트 컴포넌트 입니다.
 */

export default async function HotActivityLists() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities', 'cursor', null, 10, null, null, 'most_reviewed'],
    queryFn: () =>
      getActivities({
        method: 'cursor',
        cursorId: null,
        size: 10,
        sort: 'most_reviewed',
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HotActivityListsLayout>
        <div className="mb-2 max-w-fit text-2xl mobile:mb-4 mobile:text-[36px] mobile:leading-[43px]">🔥 인기 체험</div>
        <HotListsCarousel />
      </HotActivityListsLayout>
    </HydrationBoundary>
  );
}
