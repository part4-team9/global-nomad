import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

import axiosInstance from '@/_libs/axios';

import Button from '@/_components/button';

interface CalendarProps {
  activityId: number;
  teamId: string;
}

interface Schedule {
  date: string;
  endTime: string;
  id: number;
  startTime: string;
}

interface ActivityData {
  id: number;
  price: number;
  schedules: Schedule[];
  title: string;
}

export default function Calendar({ teamId, activityId }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await axiosInstance.get<ActivityData>(`/${teamId}/activities/${activityId}`);
        setActivityData(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    void fetchActivityData();
  }, [teamId, activityId]);

  useEffect(() => {
    if (activityData) {
      setTotalPrice(activityData.price * peopleCount);
    }
  }, [activityData, peopleCount]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderCalendar = () => {
    const days = [];
    const totalDays = 35;
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
          className={`cursor-pointer rounded-[8px] py-[6px] text-center ${hasSchedule ? '' : 'text-gray-700'} ${selectedDate === date ? 'bg-green-200 text-white' : hasSchedule ? 'bg-green-100 text-green-200' : 'text-gray-700'} text-[13px] font-[600]`}
          onClick={() => hasSchedule && setSelectedDate(date)}
        >
          {day}
        </div>,
      );
    }

    let nextMonthDay = 1;
    while (days.length < totalDays) {
      days.push(
        <div key={`next-${nextMonthDay}`} className="py-[6px] text-center text-[13px] text-gray-300">
          {nextMonthDay}
        </div>,
      );
      nextMonthDay += 1;
    }

    return days;
  };

  const availableTimes =
    activityData?.schedules.filter((schedule) => schedule.date === selectedDate).map((schedule) => `${schedule.startTime}-${schedule.endTime}`) || [];

  const handlePeopleCountChange = (change: number) => {
    setPeopleCount((prev) => Math.max(1, prev + change));
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(selectedTime === time ? null : time);
  };

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해주세요.');
      return;
    }

    console.log('예약 정보:', { selectedDate, selectedTime, peopleCount });

    try {
      const [startTime, endTime] = selectedTime.split('-');
      const schedule = activityData?.schedules.find((s) => s.date === selectedDate && s.startTime === startTime);

      if (!schedule) {
        alert('유효한 일정을 찾을 수 없습니다.');
        return;
      }

      // URL 수정
      const response = await axiosInstance.post(`/${teamId}/activities/${activityId}/reservations`, {
        scheduleId: schedule.id,
        headCount: peopleCount,
      });

      if (response.status === 201) {
        alert('예약이 완료되었습니다.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('예약 중 오류 발생:', error.response?.data || error.message);
        alert('예약 중 오류가 발생했습니다. 다시 시도해주세요.');
      } else {
        console.error('예약 중 오류 발생:', error);
        alert('예약 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (!activityData) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="mx-auto w-[384px] max-w-md rounded-lg border p-[24px]">
      <div className="flex items-center gap-[5px] pb-[16px]">
        <span className="text-3xl font-bold text-black">₩{activityData.price.toLocaleString()}</span>
        <span className="text-l text-gray-600"> /인</span>
      </div>
      <div className="border-t border-gray-200 py-[16px] text-lg font-bold text-black">날짜</div>

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
              <div key={day} className="text-center text-m font-bold text-gray-700">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="pt-[16px]">
          <h3 className="mb-[14px] font-bold text-black">예약 가능한 시간</h3>
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
      )}
      <div className="pt-[16px]">
        <h3 className="border-t border-gray-200 pt-[12px] font-bold text-black">참여 인원 수</h3>
        <div className="border-#CDD0DC flex w-[120px] items-center justify-between rounded-[6px] border">
          <Image
            src="/assets/icons/minus-button.svg"
            alt="마이너스 버튼"
            width={40}
            height={40}
            onClick={() => handlePeopleCountChange(-1)}
            className="cursor-pointer"
          />
          <div className="font-400 text-m text-gray-700">{peopleCount}</div>
          <Image
            src="/assets/icons/plus-button.svg"
            alt="플러스 버튼"
            width={40}
            height={40}
            onClick={() => handlePeopleCountChange(1)}
            className="cursor-pointer"
          />
        </div>
      </div>

      <Button variant="black" className="my-[24px] h-[56px] w-full rounded font-bold" onClick={handleReservation}>
        예약하기
      </Button>

      <div className="flex items-center justify-between border-t border-gray-200 pt-[16px]">
        <h3 className="text-l font-bold text-black">총 합계</h3>
        <p className="text-xl font-bold">₩{totalPrice.toLocaleString()}</p>
      </div>
    </div>
  );
}
