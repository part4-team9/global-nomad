import type { Metadata } from 'next';
import { getActivity } from '@/_apis/activities/activityForm';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CommonLayout from '@/_components/CommonLayout';
import StickyLayout from '@/_components/SideStickyLayout';

import EditLayout from './_components/EditLayout';

export function generateMetadata(): Metadata {
  return {
    title: 'GlobalNomad | 체험 수정',
  };
}

/**
 * 체험 수정 페이지
 */
export default async function ActivityEdit({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activity', id],
    queryFn: () => getActivity(id),
  });

  return (
    <CommonLayout>
      <StickyLayout>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <EditLayout id={id} />
        </HydrationBoundary>
      </StickyLayout>
    </CommonLayout>
  );
}
