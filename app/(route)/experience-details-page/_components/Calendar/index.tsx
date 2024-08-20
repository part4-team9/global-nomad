import { useEffect, useState } from 'react';

import axiosInstance from '@/_libs/axios';

import MobileCalendar from './MobileCalendar';
import PCCalendar from './PCCalendar';
import PeopleCounter from './PeopleCounter';
import ReservationSummary from './ReservationSummary';
import TabletCalendar from './TabletCalendar';
import type { ActivityData } from './types';

interface CalendarProps {
  activityId: number;
  teamId: string;
}

export default function Calendar({ teamId, activityId }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const renderPriceDisplay = () => {
    if (isMobile) {
      return null;
    }
    return (
      <div className="flex items-center gap-[5px] px-[24px] pb-[16px] pt-[24px] tablet:px-[16px]">
        <span className="text-xl font-bold text-black tablet:text-3xl">₩ {activityData?.price.toLocaleString() || '0'}</span>
        <span className="text-lg text-gray-600 tablet:text-xl"> /인</span>
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 424);
      setIsTablet(window.innerWidth >= 424 && window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await axiosInstance.get<ActivityData>(`/${teamId}/activities/${activityId}`);
        setActivityData(response.data);
        if (response.data) {
          setTotalPrice(response.data.price * peopleCount);
        }
      } catch (error) {
        console.error('데이터 받기 에러:', error);
      }
    };

    void fetchActivityData();
  }, [teamId, activityId, peopleCount]);

  useEffect(() => {
    if (activityData) {
      setTotalPrice(activityData.price * peopleCount);
    }
  }, [activityData, peopleCount]);

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해주세요.');
      return;
    }

    try {
      const [startTime] = selectedTime.split('-');
      const schedule = activityData?.schedules.find((s) => s.date === selectedDate && s.startTime === startTime);

      if (!schedule) {
        alert('유효한 일정을 찾을 수 없습니다.');
        return;
      }

      const response = await axiosInstance.post(`/${teamId}/activities/${activityId}/reservations`, {
        scheduleId: schedule.id,
        headCount: peopleCount,
      });

      if (response.status === 201) {
        alert('예약이 완료되었습니다.');
      } else {
        alert('예약 중 문제가 발생했습니다.');
      }
    } catch (error) {
      alert('체험 예약중 에러가 발생했습니다.');
    }
  };

  return (
    <div
      className={`${isMobile ? 'border-t border-gray-500' : 'mx-auto w-[251px] max-w-[251px] rounded-lg border border-gray-200 p-0 tablet:w-[384px] tablet:max-w-[384px]'}`}
    >
      {renderPriceDisplay()}

      <div className="tablet:px-[24px]">
        {isMobile ? (
          <MobileCalendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            activityData={activityData}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            handleReservation={handleReservation}
            totalPrice={totalPrice}
          />
        ) : (
          <>
            <h3 className="border-t border-gray-200 px-[24px] pb-[8px] pt-[16px] text-xl font-bold text-nomad-black tablet:px-[0]">날짜</h3>
            {isTablet ? (
              <TabletCalendar
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                activityData={activityData}
              />
            ) : (
              <PCCalendar
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                activityData={activityData}
              />
            )}
            <PeopleCounter peopleCount={peopleCount} setPeopleCount={setPeopleCount} />
            {!isMobile && (
              <ReservationSummary
                handleReservation={handleReservation}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                peopleCount={peopleCount}
                totalPrice={totalPrice}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
