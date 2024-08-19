'use client';

import { useState } from 'react';
import getMyActivities from '@/_apis/reservation/getMyActivities';
import { useQuery } from '@tanstack/react-query';

import type { ActivitiesResponse } from '@/_types';

import { useModal } from '@/_hooks/useModal';

import CalendarNotice from '@/_components/calendar-notice';
import SelectBox from '@/_components/select-box';

import NoReservation from '../NoReservation';
import RegisterStatusModal from '../RegisterStatusModal';

function RegisterStatusLayout() {
  const { isOpen, openModal, closeModal } = useModal();
  const [date, setDate] = useState<Date>();

  const {
    data: myActivity,
  } = useQuery<ActivitiesResponse>({
    queryKey: ['reservations'],
    queryFn: getMyActivities,
  });
  const reservations = myActivity?.activities || [];
  const selectBoxvalue: string[] = reservations.map((reservation) => reservation.title);

  const handleDateSelect = (selectedDate:Date) => {
    setDate(selectedDate);
    openModal();
  };

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
      <CalendarNotice onDateSelect={handleDateSelect} />
      <button type="button" onClick={openModal}>
        모달 오픈
      </button>
      {date !== undefined && <RegisterStatusModal isOpen={isOpen} onClose={closeModal} date={date} />}
    </>
  );
}

export default RegisterStatusLayout;
