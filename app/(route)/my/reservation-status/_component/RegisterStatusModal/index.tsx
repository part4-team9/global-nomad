'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Schedule } from '@/_types';

import axiosInstance from '@/_libs/axios';

import Modal from '@/_components/modal';
import SelectBox from '@/_components/SelectBox';

import CardSection from '../CardSection';

type RegisterStatusModalProps = {
  activityId?: number;
  date: Date;
  isOpen: boolean;
  onClose: () => void;
};

function RegisterStatusModal({ isOpen, onClose, date, activityId }: RegisterStatusModalProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [modalPending, setModalPending] = useState<number>(0);
  const [modalConfirmed, setModalConfirmed] = useState<number>(0);
  const [modalDeclined, setModalDeclined] = useState<number>(0);

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

  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextApiDate = nextDay.toISOString().split('T')[0];

  const { data: reservedSchedule, refetch } = useQuery<Schedule[]>({
    queryKey: ['scheduleId', activityId, formattedDate],
    queryFn: async () => {
      const response = await axiosInstance.get<Schedule[]>(`/my-Activities/${activityId}/reserved-schedule?date=${nextApiDate}`);
      return response.data;
    },
    enabled: !!activityId,
  });

  const updateModalCounts = useCallback(() => {
    const selectedSchedule = reservedSchedule?.find((schedule) => schedule.scheduleId === selectedScheduleId);
    setModalPending(selectedSchedule?.count.pending || 0);
    setModalConfirmed(selectedSchedule?.count.confirmed || 0);
    setModalDeclined(selectedSchedule?.count.declined || 0);
  }, [reservedSchedule, selectedScheduleId]);

  useEffect(() => {
    updateModalCounts();
  }, [updateModalCounts, reservedSchedule, selectedScheduleId]);
  const values = useMemo(
    () =>
      reservedSchedule?.map((schedule) => ({
        text: `${schedule.startTime} - ${schedule.endTime}`,
        id: schedule.scheduleId,
      })) || [],
    [reservedSchedule],
  );

  useEffect(() => {
    if (values.length > 0 && selectedScheduleId === null) {
      setSelectedScheduleId(values[0].id);
    }
  }, [values, selectedScheduleId]);

  const handleRefetch = useCallback(() => {
    void refetch().then(() => {
      updateModalCounts();
    });
  }, [refetch, updateModalCounts]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <div className="h-dvh w-dvw overflow-hidden p-6 mobile:max-h-[700px] mobile:max-w-[430px]">
        <header className="flex justify-between">
          <h2>예약 정보</h2>
          <p className="cursor-pointer text-3xl" onClick={onClose}>
            ×
          </p>
        </header>
        <ul className="mt-[27px] flex h-[43px] border-b-2">
          {[`신청 ${modalPending}`, `승인 ${modalConfirmed}`, `거절 ${modalDeclined}`].map((label, index) => (
            <li
              key={index}
              className={`cursor-pointer px-[10px] pb-[13px] text-xl font-semibold ${activeIndex === index ? 'border-b-4 border-green-200 text-green-200' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {label}
            </li>
          ))}
        </ul>
        <h3 className="mb-[14px] mt-[25px]">예약 날짜</h3>
        <p className="mb-[10px]">{formattedDate}</p>
        <SelectBox
          keyName="activity-title"
          values={values.map((item) => item.text)}
          value={selectedScheduleId ? values.find((item) => item.id === selectedScheduleId)?.text : values.length > 0 ? values[0].text : ''}
          onSelect={(keyname, selectedText) => {
            const stringSelectedText = selectedText.toString();
            const selectedItem = values.find((item) => item.text === stringSelectedText);
            if (selectedItem) {
              setSelectedScheduleId(selectedItem.id);
            }
          }}
        />
        <CardSection activityId={activityId} selectedScheduleId={selectedScheduleId} activeIndex={activeIndex} onRefetch={handleRefetch} />
      </div>
    </Modal>
  );
}

export default RegisterStatusModal;
