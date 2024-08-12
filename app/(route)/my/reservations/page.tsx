/**
 * @TODO SSR로 변경 필요!
 */

'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import getReservations from '@/_apis/my-reservations/getReservations';
import { useQuery } from '@tanstack/react-query';

import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

import FilterDropdown from './_components/FilterDropdown';
import ReservationContainer from './_components/ReservationContainer';

function MyReservations() {
  const router = useRouter();
  const { data, isError, error } = useQuery({
    queryKey: ['reservations'],
    queryFn: getReservations,
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

  return (
    <CommonLayout>
      <StickyLayout>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <h1 className="break-keep text-3xl font-bold leading-[1.3] text-black">예약 내역</h1>
          {data?.totalCount !== 0 && <FilterDropdown />}
        </div>
        {data && <ReservationContainer data={data} />}
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyReservations;
