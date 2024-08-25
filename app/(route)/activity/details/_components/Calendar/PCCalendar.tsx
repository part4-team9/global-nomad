import { useEffect, useState } from 'react';
import Image from 'next/image';

import TimeSelection from './TimeSelection';
import type { ActivityData } from './types';

interface CalendarGridProps {
  activityData: ActivityData | null;
  currentDate: Date;
  selectedDate: string | null;
  selectedTime: string | null;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
}

export default function CalendarGrid({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  activityData,
  selectedTime,
  setSelectedTime,
}: CalendarGridProps) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleDateSelection = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i -= 1) {
      const day = prevMonthDays - i;
      days.push(
        <div key={`prev-${day}`} className="py-[6px] text-center text-[13px] text-gray-300">
          {day}
        </div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasSchedule = activityData?.schedules.some((schedule) => schedule.date === date);
      days.push(
        <div
          key={day}
          className={`cursor-pointer rounded-[8px] py-[6px] text-center ${hasSchedule ? '' : 'text-gray-700'} ${
            selectedDate === date ? 'bg-green-200 text-white' : hasSchedule ? 'bg-green-100 text-green-200' : 'text-gray-700'
          } text-[13px] font-[600]`}
          onClick={() => hasSchedule && handleDateSelection(date)}
        >
          {day}
        </div>,
      );
    }

    let nextMonthDay = 1;
    while (days.length < 35) {
      days.push(
        <div key={`next-${nextMonthDay}`} className="py-[6px] text-center text-[13px] text-gray-300">
          {nextMonthDay}
        </div>,
      );
      nextMonthDay += 1;
    }

    return days;
  };

  return (
    <>
      {/* PC 화면 */}
      <div className="flex justify-center">
        <div className="w-[304.65px] rounded-[8px] border border-gray-100 px-[27px] py-[10px]">
          <div className="flex items-center justify-between">
            <Image
              src="/assets/icons/cal-prev.svg"
              alt="Previous month"
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            />
            <span className="text-sm font-bold text-black">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Image
              src="/assets/icons/cal-next.svg"
              alt="Next month"
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            />
          </div>

          <div className="mt-4 grid grid-cols-7 gap-[1px]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-md font-bold text-gray-700">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      </div>
      {selectedDate && (
        <div className="mt-4">
          <TimeSelection selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} activityData={activityData} />
        </div>
      )}
    </>
  );
}
