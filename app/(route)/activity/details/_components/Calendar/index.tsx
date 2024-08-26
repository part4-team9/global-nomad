'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { useModal } from '@/_hooks/useModal';

import axiosInstance from '@/_libs/axios';

import Modal from '@/_components/modal';

import MobileCalendar from './MobileCalendar';
import PCCalendar from './PCCalendar';
import PeopleCounter from './PeopleCounter';
import ReservationSummary from './ReservationSummary';
import TabletCalendar from './TabletCalendar';
import type { ActivityData } from './types';

interface CalendarProps {
  activityId: number;
}

export default function Calendar({ activityId }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const { isOpen, openModal, closeModal } = useModal();
  const [modalMessage, setModalMessage] = useState('');
  const [fetchError, setFetchErrorState] = useState<string | null>(null);

  const renderPriceDisplay = () => {
    if (isMobile) return null;
    return (
      <div className="flex items-center gap-[5px] px-[24px] pb-[16px] pt-[24px] tablet:px-[16px]">
        <span className="text-xl font-bold text-black tablet:text-3xl">₩ {activityData?.price?.toLocaleString() || '0'}</span>
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
        const response = await axiosInstance.get<ActivityData>(`/activities/${activityId}`);
        setActivityData(response.data);
        if (response.data) {
          setTotalPrice(response.data.price * peopleCount);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setFetchErrorState('로그인을 해주세요.');
          } else {
            setFetchErrorState(`오류 발생: ${error.message}`);
          }
        } else {
          setFetchErrorState('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      }
    };

    void fetchActivityData();
  }, [activityId, peopleCount]);

  useEffect(() => {
    if (fetchError) {
      setModalMessage(fetchError);
      openModal();
      setFetchErrorState(null);
    }
  }, [fetchError, openModal]);

  useEffect(() => {
    if (activityData) {
      setTotalPrice(activityData.price * peopleCount);
    }
  }, [activityData, peopleCount]);

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime) {
      setModalMessage('날짜와 시간을 선택해주세요.');
      openModal();
      return;
    }

    try {
      const [startTime] = selectedTime.split('-');

      const response = await axiosInstance.post(`/activities/${activityId}/reservations`, {
        scheduleId: activityData?.schedules.find((s) => s.date === selectedDate && s.startTime === startTime)?.id,
        headCount: peopleCount,
      });

      if (response.status === 201) {
        setModalMessage('예약이 완료되었습니다.');
        openModal();
      } else {
        setModalMessage('예약 중 문제가 발생했습니다. 다시 시도해주세요.');
        openModal();
      }
    } catch (reservationError: unknown) {
      if (reservationError instanceof AxiosError) {
        if (reservationError.response?.status === 401) {
          setFetchErrorState('로그인이 필요합니다.');
        } else {
          setFetchErrorState(`${reservationError.message}`);
        }
      } else {
        setFetchErrorState('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="m-auto px-[90px] pb-[28px] pt-[26px] text-right text-[18px] md:w-[540px] md:px-[33px]">
          <p className="pb-[43px] pt-[53px] text-center">{modalMessage}</p>
          <span className="flex justify-center">
            <button type="button" className="h-[42px] w-[138px] rounded-[8px] bg-black text-white" onClick={closeModal}>
              확인
            </button>
          </span>
        </div>
      </Modal>

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
              <h3 className="border-t border-gray-200 px-[24px] pb-[8px] pt-[16px] text-xl font-bold text-nomad-black tablet:px-0">날짜</h3>
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
    </>
  );
}
