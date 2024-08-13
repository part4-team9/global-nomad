'use client'

import getMyActivities from '@/_apis/reservation/getMyActivities';
import { useQuery } from '@tanstack/react-query';

import type { ActivitiesResponse } from '@/_types';

import CalendarNotice from '@/_components/calendar-notice';
import SelectBox from '@/_components/select-box';

import NoReservation from '../NoReservation';

function RegisterStatusLayout() {
  const {
    data: myActivity,
    isLoading,
    error,
  } = useQuery<ActivitiesResponse>({
    queryKey: ['reservations'],
    queryFn: getMyActivities,
  });
  const reservations = myActivity?.activities || [];
  const selectBoxvalue: string[] = reservations.map((reservation) => reservation.title);

  return reservations?.length === 0 ? (
    <>
      <h1 className="mb-6">예약 현황</h1>
      <NoReservation />
    </>
  ) : (
    <>
      <h1 className="mb-6">예약 현황</h1>
      <div className="mb-[30px]">
        <SelectBox head="체험명" values={selectBoxvalue} />
      </div>
      <CalendarNotice />
    </>
  );
}

export default RegisterStatusLayout;
