import type { Metadata } from 'next';
import type { SubImage } from '@/_apis/activities/getActivity';
import getActivity from '@/_apis/activities/getActivity';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CommonLayout from '@/_components/CommonLayout';
import StickyLayout from '@/_components/SideStickyLayout';

import EditLayout from './_components/EditLayout';
import type { Schedule } from '../../register/page';

export interface EditSchedule {
  date: string;
  endTime: string;
  id?: number;
  startTime: string;
}

export interface EditDetail {
  schedules: EditSchedule[];
  subImages: SubImage[];
}

export interface ActivityEdit {
  address: string;
  bannerImageUrl: string;
  category: string;
  description: string;
  price: number | '';
  scheduleIdsToRemove: number[];
  schedulesToAdd: Schedule[];
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  title: string;
}

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
