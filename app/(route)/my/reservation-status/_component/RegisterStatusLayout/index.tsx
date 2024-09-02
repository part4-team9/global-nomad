'use client';

import { useEffect, useMemo, useState } from 'react';
import getMyActivities from '@/_apis/reservation/getMyActivities';
import { useQuery } from '@tanstack/react-query';

import type { ActivitiesResponse, DateReservations } from '@/_types';

import { useModal } from '@/_hooks/useModal';

import axiosInstance from '@/_libs/axios';

import CalendarNotice from '@/_components/CalendarNotice';
import NoReservation from '@/_components/NoReservation';
import SelectBox from '@/_components/SelectBox';

import RegisterStatusModal from '../RegisterStatusModal';

function RegisterStatusLayout() {
  const { isOpen, openModal, closeModal } = useModal();
  const [date, setDate] = useState<Date>();
  const [selectedActivityTitle, setSelectedActivityTitle] = useState<string>('');
  const [selectedActivityId, setSelectedActivityId] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<string>();

  const { data: myActivity } = useQuery<ActivitiesResponse>({
    queryKey: ['reservations'],
    queryFn: getMyActivities,
  });

  const reservations = useMemo(() => myActivity?.activities || [], [myActivity?.activities]);
  const selectBoxValue: string[] = reservations.map((reservation) => reservation.title);

  // 초기 title 및 id 세팅해 주는 useEffect
  useEffect(() => {
    if (!selectedActivityTitle) {
      const initialActivity = reservations.find((reservation) => reservation.title === selectBoxValue[0]);
      setSelectedActivityTitle(selectBoxValue[0]);
      setSelectedActivityId(initialActivity ? initialActivity.id : undefined);
    }
  }, [selectBoxValue, reservations, selectedActivityTitle]);

  // title, id 바꿔주는 핸들러
  const handleActivityTitleChange = (keyName: string, value: string) => {
    setSelectedActivityTitle(value);
    const selectedActivity = reservations.find((reservation) => reservation.title === value);
    setSelectedActivityId(selectedActivity ? selectedActivity.id : undefined);
  };
  // 연 월 초기 세팅하는 useEffect
  useEffect(() => {
    const currentDate = date || new Date();
    if (selectedActivityId) {
      const newYear = currentDate.getFullYear();
      const newMonth = ((currentDate.getMonth() ?? 0) + 1).toString().padStart(2, '0');
      setYear(newYear);
      setMonth(newMonth);
    }
  }, [date, selectedActivityId]);

  const { data: reservationDashboard } = useQuery<DateReservations[]>({
    queryKey: ['reservationDashboard', selectedActivityId, year, month],
    queryFn: async () => {
      const response = await axiosInstance.get<DateReservations[]>(`/my-Activities/${selectedActivityId}/reservation-dashboard?year=${year}&month=${month}`);
      return response.data ?? [];
    },
    enabled: !!selectedActivityId && !!year && !!month,
  });

  const hasReservationsOnDate = (selectedDate: Date): boolean =>
    reservationDashboard?.some((reservation) => new Date(reservation.date).toDateString() === selectedDate.toDateString()) ?? false;

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    if (hasReservationsOnDate(selectedDate)) {
      openModal();
    }
  };

  const handleMonthChange = (newYear: number, newMonth: string) => {
    setYear(newYear);
    setMonth(newMonth);
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
      <CalendarNotice onDateSelect={handleDateSelect} onMonthChange={handleMonthChange} data={reservationDashboard} />
      {date !== undefined && <RegisterStatusModal isOpen={isOpen} onClose={closeModal} date={date} activityId={selectedActivityId} />}
    </>
  );
}

export default RegisterStatusLayout;
