import getReservations from '@/_apis/reservations/getReservations';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import type { ReservationStatus } from '@/_types/myReservations';

import CommonLayout from '@/_components/CommonLayout';
import StickyLayout from '@/_components/SideStickyLayout';

import ReservationClient from './_components/ReservationClient';

export interface ReservationParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}

async function MyReservations() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['reservations', { size: 10 }],
    queryFn: () =>
      getReservations({
        size: 10,
        cursorId: undefined,
        status: undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: undefined,
  });

  return (
    <CommonLayout>
      <StickyLayout>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ReservationClient />
        </HydrationBoundary>
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyReservations;
