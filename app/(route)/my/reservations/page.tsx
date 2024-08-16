'use client';

import { Suspense, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import getReservations from '@/_apis/reservations/getReservations';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { ReservationStatus } from '@/_types/myReservations';

import { useIntersectionObserver } from '@/_hooks/activities/useIntersectionObserver';

import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import FilterDropdown from './_components/FilterDropdown';
import ReservationContainer from './_components/ReservationContainer';

export interface ReservationParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}

function MyReservations() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Content />
    </Suspense>
  );
}

function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<ReservationParams>({
    cursorId: undefined,
    size: 10,
    status: (searchParams.get('status') as ReservationStatus) || undefined,
  });

  const { data, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['reservations', params],
    queryFn: ({ pageParam = params.cursorId }) => getReservations({ ...params, cursorId: pageParam }),
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    initialPageParam: params.cursorId,
    retry: 0,
  });

  const showDropdown = searchParams.get('status') || data?.pages?.[0]?.totalCount !== 0;

  const { setTarget } = useIntersectionObserver({
    threshold: 0.1,
    hasNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 401) {
        router.push('/login');
      }
    }
  }, [isError, error, router]);

  useEffect(() => {
    const queryStatus = params.status ? `status=${params.status}` : '';
    const url = `?${queryStatus}`;
    router.replace(url);
  }, [params, router]);

  return (
    <CommonLayout>
      <StickyLayout>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <h1 className="break-keep text-3xl font-bold leading-[1.3] text-black">예약 내역</h1>
          {showDropdown && <FilterDropdown setParams={setParams} />}
        </div>
        {data && (
          <>
            {data.pages.map((page) => (
              <ReservationContainer key={page.cursorId ?? 'lastPage'} data={page} />
            ))}
            <div ref={setTarget} />
          </>
        )}
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyReservations;
