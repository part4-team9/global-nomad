'use client';

import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { useModal } from '@/_hooks/useModal';

import axiosInstance from '@/_libs/axios';

import Button from '@/_components/button';
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

  const router = useRouter();

  const handleLoginRedirect = useCallback(() => {
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }, [router]);

  const renderPriceDisplay = useCallback(() => {
    if (isMobile) return null;
    return (
      <div className="flex items-center gap-[5px] px-[24px] pb-[16px] pt-[24px] tablet:px-[16px]">
        <span className="text-xl font-bold text-black tablet:text-3xl">₩ {activityData?.price?.toLocaleString() || '0'}</span>
        <span className="text-lg text-gray-600 tablet:text-xl"> /인</span>
      </div>
    );
  }, [isMobile, activityData]);

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
    void (async () => {
      try {
        const response = await axiosInstance.get<ActivityData>(`/activities/${activityId}`);
        setActivityData(response.data);
        if (response.data) {
          setTotalPrice(response.data.price * peopleCount);
        }
      } catch (error) {
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
    })();
  }, [activityId, peopleCount]);

  useEffect(() => {
    if (fetchError) {
      setModalMessage(fetchError);
      openModal();
      setFetchErrorState(null);
    }
  }, [fetchError, openModal]);

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime) {
      setFetchErrorState('날짜와 시간을 선택해주세요.');
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split('-')[0]}:00`);

    if (selectedDateTime <= now) {
      setFetchErrorState('이미 지난 시간은 예약할 수 없습니다.');
      return;
    }

    try {
      const [startTime] = selectedTime.split('-');

      const response = await axiosInstance.post(`/activities/${activityId}/reservations`, {
        scheduleId: activityData?.schedules.find((s) => s.date === selectedDate && s.startTime === startTime)?.id,
        headCount: peopleCount,
      });

      if (response.status === 201) {
        setFetchErrorState('예약이 완료되었습니다.');
      } else {
        setFetchErrorState('예약 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            setFetchErrorState('로그인이 필요합니다.');
            handleLoginRedirect();
            return;
          case 400:
            setFetchErrorState('이미 지난 날짜의 체험은 예약할 수 없습니다.');
            break;
          case 403:
            setFetchErrorState('해당 작업을 수행할 권한이 없습니다.');
            break;
          case 404:
            setFetchErrorState('요청한 리소스를 찾을 수 없습니다.');
            break;
          case 500:
            setFetchErrorState('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            break;
          default:
            setFetchErrorState('이미 예약한 체험이거나 중복된 시간에 예약이 있습니다.');
        }
      } else {
        setFetchErrorState('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleModalClose = useCallback(() => {
    closeModal();
    if (modalMessage === '로그인이 필요합니다.') {
      handleLoginRedirect();
    }
  }, [closeModal, modalMessage, handleLoginRedirect]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <div className="m-auto flex h-[200px] w-[300px] flex-col justify-between rounded-lg px-[33px] pb-[28px] pt-[26px] text-2lg font-medium shadow-lg mobile:h-[250px] mobile:w-[540px]">
          <p className="flex flex-grow items-center justify-center text-center">{modalMessage}</p>
          <span className="flex justify-end">
            <Button
              variant="black"
              className="h-[36px] w-[90px] bg-black text-white mobile:h-[48px] mobile:w-[120px]"
              borderRadius="8px"
              onClick={handleModalClose}
            >
              확인
            </Button>
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
