'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import getReservations from '@/_apis/reservations/getReservations';
import { useQuery } from '@tanstack/react-query';

import type { ReservationStatus } from '@/_types/myReservations';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<ReservationParams>({
    cursorId: undefined,
    size: 10,
    status: (searchParams.get('status') as ReservationStatus) || undefined,
  });

  const { data, isError, error } = useQuery({
    queryKey: ['reservations', params],
    queryFn: () => getReservations(params),
    retry: 0,
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
          <FilterDropdown setParams={setParams} />
        </div>
        {data && <ReservationContainer data={data} />}
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyReservations;
