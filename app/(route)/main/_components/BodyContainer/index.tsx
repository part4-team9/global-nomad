import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import getActivities from '@/_libs/activities/activitiesApi';

import AllActivityLists from '../AllActivityLists';
import HotActivityLists from '../HotActivityLists';
import BodyLayout from '../Layout/BodyLayout';
import SearchBox from '../SearchBox';

export default async function BodyContainer() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities', 'offset', 1, 8, null, null, 'latest'],
    queryFn: () =>
      getActivities({
        method: 'offset',
        page: 1,
        size: 8,
        sort: 'latest',
      }),
    retry: 0,
  });

  return (
    <BodyLayout>
      <SearchBox />
      <HotActivityLists />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllActivityLists />
      </HydrationBoundary>
    </BodyLayout>
  );
}
