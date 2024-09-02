'use client';

import Button from '@/_components/ton';

import type { ActivityData } from './types';

interface TimeSelectionProps {
  activityData: ActivityData | null;
  selectedDate: string | null;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}

export default function TimeSelection({ selectedDate, selectedTime, setSelectedTime, activityData }: TimeSelectionProps) {
  const handleTimeSelection = (time: string) => {
    setSelectedTime(selectedTime === time ? null : time);
  };

  if (!selectedDate || !activityData) return null;

  const availableTimes = activityData.schedules
    .filter((schedule) => schedule.date === selectedDate)
    .map((schedule) => `${schedule.startTime}-${schedule.endTime}`);

  return (
    <div className="border-b border-gray-200 py-[16px]">
      <h3 className="mb-[14px] text-2lg font-bold text-black">예약 가능한 시간</h3>
      <div className="flex flex-wrap gap-[8px]">
        {availableTimes.map((time) => (
          <Button
            variant={selectedTime === time ? 'black' : 'white'}
            key={time}
            onClick={() => handleTimeSelection(time)}
            className={`h-[46px] w-[117px] rounded-[8px] font-[500] ${selectedTime === time ? 'text-white' : 'text-black'}`}
            borderRadius="8px"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}
