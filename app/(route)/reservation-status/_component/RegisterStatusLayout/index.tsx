'use client';

import { useEffect, useState } from 'react';
import getMyActivities from '@/_apis/reservation/getMyActivities';
import { useQuery } from '@tanstack/react-query';

import type { ActivitiesResponse, DateReservations } from '@/_types';

import { useModal } from '@/_hooks/useModal';

import axiosInstance from '@/_libs/axios';

import CalendarNotice from '@/_components/calendar-notice';
import SelectBox from '@/_components/SelectBox';

import NoReservation from '../NoReservation';
import RegisterStatusModal from '../RegisterStatusModal';

function RegisterStatusLayout() {
  const { isOpen, openModal, closeModal } = useModal();
  const [date, setDate] = useState<Date>();
  const [selectedActivityTitle, setSelectedActivityTitle] = useState<string>('');
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<string>();

  const { data: myActivity } = useQuery<ActivitiesResponse>({
    queryKey: ['reservations'],
    queryFn: getMyActivities,
  });
  const reservations = myActivity?.activities || [];
  const selectBoxValue: string[] = reservations.map((reservation) => reservation.title);

  useEffect(() => {
    if (selectBoxValue.length > 0) {
      setSelectedActivityTitle(selectBoxValue[0]);
    }
  }, [selectBoxValue]);

  const selectedActivity = reservations.find((reservation) => reservation.title === selectedActivityTitle);
  const selectedActivityId = selectedActivity ? selectedActivity.id : undefined;

  useEffect(() => {
    const currentDate = date || new Date();

    if (selectedActivityId) {
      setYear(currentDate.getFullYear());
      setMonth(((currentDate.getMonth() ?? 0) + 1).toString().padStart(2, '0'));
    }
  }, [date, selectedActivityId]);

  const { data: reservationDashboard } = useQuery<DateReservations[]>({
    queryKey: ['reservationDashboard', selectedActivityId],
    queryFn: async () => {
      if (selectedActivityId) {
        const response = await axiosInstance.get<DateReservations[]>(`/my-Activities/${selectedActivityId}/reservation-dashboard?year=${year}&month=${month}`);
        return response.data ?? [];
      }
      return [];
    },
    enabled: !!selectedActivityId,
  });

  const handleActivityTitleChange = (keyName: string, value: string) => {
    setSelectedActivityTitle(value);
  };

  const handleDateSelect = (selectedDate: Date) => {
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
        <SelectBox head="체험명" keyName="activity-name" values={selectBoxValue} value={selectBoxValue[0]} onSelect={handleActivityTitleChange} />
      </div>
      <CalendarNotice onDateSelect={handleDateSelect} data={reservationDashboard} />
      {date !== undefined && <RegisterStatusModal isOpen={isOpen} onClose={closeModal} date={date} activityId={selectedActivityId} />}
    </>
  );
}

export default RegisterStatusLayout;
