'use client';

import { useState } from 'react';
import Image from 'next/image';

import Button from '@/_components/button';

import TimeSelection from './TimeSelection';
import type { ActivityData } from './types';

import CalArrow from 'public/assets/icons/cal-arrow.svg';
import CalNext from 'public/assets/icons/cal-next.svg';
import CalPrev from 'public/assets/icons/cal-prev.svg';

interface TabletCalendarProps {
  activityData: ActivityData | null;
  currentDate: Date;
  selectedDate: string | null;
  selectedTime: string | null;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
}

export default function TabletCalendar({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  activityData,
  selectedTime,
  setSelectedTime,
}: TabletCalendarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleDateSelection = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      setSelectedDate(date);
      setSelectedTime(null);
    }
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
      <div onClick={() => setIsCalendarOpen(true)} className="w-full cursor-pointer rounded-lg px-[24px] py-2 font-semibold text-nomad-black underline">
        {selectedDate && selectedTime ? `${selectedDate} ${selectedTime}` : '날짜 선택하기'}
      </div>

      {isCalendarOpen && (
        <div className="absolute right-[24px] top-0 z-50 w-[400px] rounded-lg bg-white shadow-lg">
          <div className="rounded-[24px] p-[24px]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-2xl font-semibold text-black">날짜</span>
              <Image src={CalArrow} alt="닫기" width={24} height={24} className="cursor-pointer" onClick={() => setIsCalendarOpen(false)} />
            </div>

            <div className="mx-[30px] rounded-[8px] border border-gray-200 px-[27px]">
              <div className="p-[5px]">
                <div className="mb-2 flex justify-between py-[5px]">
                  <Image
                    src={CalPrev}
                    alt="이전 달로 이동"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  />
                  <span className="text-md font-bold text-black">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <Image
                    src={CalNext}
                    alt="다음 달로 이동"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  />
                </div>

                <div className="grid grid-cols-7 gap-px">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
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

            <Button
              variant="black"
              className={`mt-4 h-[50px] w-full py-2 text-white ${
                !selectedDate || !selectedTime ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-black'
              }`}
              onClick={() => {
                if (selectedDate && selectedTime) {
                  setIsCalendarOpen(false);
                }
              }}
              disabled={!selectedDate || !selectedTime}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
