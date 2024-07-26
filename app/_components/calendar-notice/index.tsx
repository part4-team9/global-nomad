'use client';

import React from 'react';
import { reservationsExample } from '@/_mocks/notice-calendar-example-reservations';

import type { ReservationDataProps } from '@/_types';

import useCalendar from '@/_hooks/useCalendar';

import CalendarCell from './_components/calendar-cell';
import Header from './_components/calendar-header';
import Weekdays from './_components/calendar-weekdays';

const MemoizedCalendarCell = React.memo(CalendarCell);
const MemoizedWeekdays = React.memo(Weekdays);

/**
 * 예약 현황 데이터를 받아서 달력 형태로 렌더링합니다.
 */
// TODO 추후 API 연동 후 선택적 속성 제거
function NoticeCalender({ data }: { data?: ReservationDataProps[] }) {
  const reservations = data || reservationsExample;

  const { currentDate, days, weekStartDay, goToNextMonth, goToPreviousMonth, goToNextYear, goToPreviousYear, getToday, goToday } = useCalendar();

  const today = getToday();

  return (
    <div className="flex min-w-[345px] max-w-[800px] select-none flex-col">
      <Header
        currentDate={currentDate}
        goToNextMonth={goToNextMonth}
        goToNextYear={goToNextYear}
        goToPreviousMonth={goToPreviousMonth}
        goToPreviousYear={goToPreviousYear}
        goToday={goToday}
      />
      <table className="border-grey-150 w-full table-fixed border-collapse overflow-hidden rounded-lg border bg-white font-Inter text-gray-450">
        <MemoizedWeekdays weekStartDay={weekStartDay} />
        <tbody>
          {days.map((week, weekIndex) => (
            <tr key={weekIndex} className="grid h-[154px] grid-cols-7">
              {week.map(({ key, day, monthType }) => (
                <MemoizedCalendarCell key={key} day={day} monthType={monthType} keyDate={key} reservations={reservations} today={today} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(NoticeCalender);
