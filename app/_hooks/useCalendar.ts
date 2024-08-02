'use client';

import { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

interface CalendarDay {
  day: number;
  key: string;
  monthType: 'prev' | 'current' | 'next';
}

const useCalendar = (initialDate: Dayjs = dayjs(), initialWeekStartDay: number = 0) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(initialDate);
  const [weekStartDay, setWeekStartDay] = useState<number>(initialWeekStartDay);
  const [days, setDays] = useState<CalendarDay[][]>([]);

  const chunk = (arr: CalendarDay[], size: number): CalendarDay[][] =>
    arr.reduce<CalendarDay[][]>((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

  useEffect(() => {
    const generateCalendar = () => {
      const startOfMonth = currentDate.startOf('month');
      const endOfMonth = currentDate.endOf('month');
      const startOfWeek = startOfMonth.isoWeekday(weekStartDay).startOf('week');
      const endOfWeek = endOfMonth.isoWeekday(weekStartDay).endOf('week');

      let day = startOfWeek;
      const calendarDays: CalendarDay[] = [];

      while (day <= endOfWeek) {
        const monthType: 'prev' | 'current' | 'next' = day.isBefore(startOfMonth) ? 'prev' : day.isAfter(endOfMonth) ? 'next' : 'current';
        calendarDays.push({
          key: day.format('YYYY-MM-DD'),
          day: day.date(),
          monthType,
        });
        day = day.add(1, 'day');
      }

      setDays(chunk(calendarDays, 7));
    };

    generateCalendar();
  }, [currentDate, weekStartDay]);

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const changeWeekStartDay = (selectedWeekStartDay: number) => {
    setWeekStartDay(selectedWeekStartDay);
  };

  const getToday = () => dayjs().format('YYYY-MM-DD');

  const goToday = () => {
    setCurrentDate(dayjs());
  };

  return {
    currentDate,
    days,
    weekStartDay,
    changeWeekStartDay,
    goToNextMonth,
    goToPreviousMonth,
    getToday,
    goToday,
  };
};

export default useCalendar;
