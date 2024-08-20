'use client';

import { useEffect, useState } from 'react';

import Modal from '@/_components/modal';
import SelectBox from '@/_components/SelectBox';

import CardApprove from '../CardApprove';
import CardPending from '../CardPending';
import CardRejected from '../CardRejected';
import { useQuery } from '@tanstack/react-query';
import { DateReservations, Schedule } from '@/_types';
import axiosInstance from '@/_libs/axios';
import ModalFooter from '../ModalFooter';

type RegisterStatusModalProps = {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
  activityId?: number;
};

function RegisterStatusModal({ isOpen, onClose, date, activityId }: RegisterStatusModalProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 그냥 date를 가져올 시 이전 날짜를 반환하는 문제 해결
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextApiDate = nextDay.toISOString().split('T')[0];

  const { data: reservedSchedule } = useQuery<Schedule[]>({
    queryKey: ['scheduleId', activityId, formattedDate],
    queryFn: async () => {
      const response = await axiosInstance.get(`/my-Activities/${activityId}/reserved-schedule?date=${nextApiDate}`);
      return response.data;
    },
    enabled: !!activityId,
  });

  // 달력에 chips 가져오기 위해 설정하는 부분. 그런데 현재 날짜를 선택해서 연월을 입력해야지 chips가 보이는 문제. 추후 해결 요망
  const year = date?.getFullYear();
  const month = (date?.getMonth() + 1).toString().padStart(2, '0');

  const { data: reservationDashboard } = useQuery<DateReservations[]>({
    queryKey: ['reservationDashboard', activityId],
    queryFn: async () => {
      if (activityId) {
        const response = await axiosInstance.get(`/my-Activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`);
        return response.data;
      }
    },
    enabled: !!activityId,
  });

  const modalPending = reservedSchedule?.find((schedule) => schedule.scheduleId === selectedScheduleId)?.count.pending || 0;
  const modalConfirmed = reservedSchedule?.find((schedule) => schedule.scheduleId === selectedScheduleId)?.count.confirmed || 0;
  const modalCompleted = reservedSchedule?.find((schedule) => schedule.scheduleId === selectedScheduleId)?.count.completed || 0;
  const modalFooterNum = reservedSchedule?.find((schedule) => schedule.scheduleId === selectedScheduleId)?.count;

  const values =
    reservedSchedule?.map((schedule) => ({
      text: `${schedule.startTime} - ${schedule.endTime}`,
      id: schedule.scheduleId,
    })) || [];

    useEffect(() => {
      if (values.length > 0 && selectedScheduleId === null) {
        setSelectedScheduleId(values[0].id);
      }
    }, [values, selectedScheduleId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <header className="flex justify-between">
          <h2>예약 정보</h2>
          <p className="tex cursor-pointer text-3xl" onClick={onClose}>
            ×
          </p>
        </header>
        <ul className="mt-[27px] flex h-[43px] border-b-2">
          {[`신청 ${modalPending}`, `승인 ${modalConfirmed}`, `거절 ${modalCompleted}`].map((label, index) => (
            <li
              key={index}
              className={`cursor-pointer px-[10px] pb-[13px] text-xl font-semibold ${activeIndex === index ? 'border-b-4 border-green-200 text-green-200' : ''}`}
              onClick={() => handleClick(index)}
            >
              {label}
            </li>
          ))}
        </ul>
        <h3 className="mb-[14px] mt-[25px]">예약 날짜</h3>
        <p className="mb-[10px]">{formattedDate}</p>
        <SelectBox
          keyName='activity-title'
          values={values.map((item) => item.text)}
          value={selectedScheduleId ? values.find(item => item.id === selectedScheduleId)?.text : values.length > 0 ? values[0].text : ''}
          onSelect={(keyname, selectedText) => {
            const stringSelectedText = selectedText.toString();
            const selectedItem = values.find((item) => item.text === stringSelectedText);
            if (selectedItem) {
              setSelectedScheduleId(selectedItem.id);
            }
          }}
        />
        <h3 className="mt-8">예약 내역</h3>
        {activeIndex === 0 && <CardPending />}
        {activeIndex === 1 && (
          <div>
            <CardApprove />
            <ModalFooter />
          </div>
        )}
        {activeIndex === 2 && (
          <div>
            <CardRejected />
            <ModalFooter />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default RegisterStatusModal;
