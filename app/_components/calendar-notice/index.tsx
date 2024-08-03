'use client';

import React from 'react';
import { reservationsExample } from '@/_mocks/notice-calendar-example-reservations';

import type { DateReservations } from '@/_types/myActivities';

import useCalendar from '@/_hooks/useCalendar';

import { calcLastColumCellStyles } from '@/_utils/calender';

import CalendarCell from './_components/calendar-cell';
import Header from './_components/calendar-header';
import Weekdays from './_components/calendar-weekdays';
import StatusChip from './_components/status-chips';

const MemoizedCalendarCell = React.memo(CalendarCell);
const MemoizedWeekdays = React.memo(Weekdays);

/**
 * 예약 현황 데이터를 받아서 달력 형태로 렌더링합니다.
 * @param data 예약 현황 데이터 (ReservationDataProps[])
 */
// TODO 추후 API 연동 후 선택적 속성 제거
function NoticeCalender({ data }: { data?: DateReservations[] }) {
  const reservations = data || reservationsExample;

  const { currentDate, days, goToNextMonth, goToPreviousMonth, getToday, goToday } = useCalendar();

  const today = getToday();

  return (
    <div className="flex min-w-[345px] max-w-[800px] select-none flex-col">
      <Header currentDate={currentDate} goToNextMonth={goToNextMonth} goToPreviousMonth={goToPreviousMonth} goToday={goToday} />
      <table className="border-grey-150 w-full table-fixed border-separate border-spacing-0 rounded-lg border bg-white font-Inter text-gray-450">
        <thead>
          <MemoizedWeekdays />
        </thead>
        <tbody>
          {days.map((week, weekIndex) => (
            <tr key={weekIndex} className="grid h-[154px] grid-cols-7">
              {week.map(({ key, day, monthType }, columnIndex) => (
                <MemoizedCalendarCell
                  key={key}
                  day={day}
                  monthType={monthType}
                  keyDate={key}
                  reservations={reservations}
                  today={today}
                  className={calcLastColumCellStyles({ index: columnIndex, length: week.length })}
                >
                  {(chipData) => (
                    <div className="flex flex-wrap gap-0.5">
                      {chipData.map(({ bgColor, count, label, textColor }) => (
                        <StatusChip key={label} bgColor={bgColor} count={count} label={label} textColor={textColor} />
                      ))}
                    </div>
                  )}
                </MemoizedCalendarCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(NoticeCalender);
