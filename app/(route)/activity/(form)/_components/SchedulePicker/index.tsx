'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';

import type { Activity, ActivityEdit, EditDetail, Schedule } from '@/_types/activities/form.types';

import useWindowSize from '@/_hooks/useWindowSize';

import { generateTimeArray } from '@/_utils/generateTimeArray';

import SelectBox from '@/_components/SelectBox';

import CalendarWrapper from '../CalendarPicker';

import AddIcon from 'public/assets/icons/btn-plus.svg';
import AddDisabled from 'public/assets/icons/btn-plus-disabled.svg';

interface PickerProps {
  setEditDetail?: Dispatch<SetStateAction<EditDetail>>;
  setEditFormData?: Dispatch<SetStateAction<ActivityEdit>>;
  setRegisterFormData?: Dispatch<SetStateAction<Activity>>;
}

/**
 * 예약 가능한 시간대 선택, 추가 기능 컴포넌트
 * @param setRegisterFormData 체험 등록 form 데이터 업데이트 함수
 * @param setEditFormData 체험 수정 form 데이터 업데이트 함수
 * @param setEditDetail 체험 수정 스케줄 렌더링 업데이트 함수
 */
function SchedulePicker({ setRegisterFormData, setEditFormData, setEditDetail }: PickerProps) {
  const timeArray = generateTimeArray();
  const windowSize = useWindowSize();
  const isPC = windowSize > 1023;
  const [timeError, setTimeError] = useState(false);
  const [buttonDisabled, setButtonDisabed] = useState(true);
  const [scheduleData, setScheduleData] = useState<Schedule>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleScheduleChange = (key: string, value: string | Date) => {
    let formattedValue = value;

    if (key === 'date') {
      formattedValue = dayjs(value).format('YYYY-MM-DD');
    }
    setScheduleData((prev) => ({
      ...prev,
      [key]: formattedValue,
    }));
  };

  const handleAddSchedule = () => {
    if (setEditFormData && setEditDetail) {
      setEditFormData((prev) => ({
        ...prev,
        schedulesToAdd: [...prev.schedulesToAdd, scheduleData],
      }));
      setEditDetail((prev) => ({
        ...prev,
        schedules: [...prev.schedules, scheduleData],
      }));
    } else if (setRegisterFormData) {
      setRegisterFormData((prev) => ({
        ...prev,
        schedules: [...prev.schedules, scheduleData],
      }));
    }
    setScheduleData({
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  useEffect(() => {
    const startTime = Number(scheduleData.startTime.split(':')[0]);
    const endTime = Number(scheduleData.endTime.split(':')[0]);
    const isInvalidTimeRange = scheduleData.startTime !== '' && scheduleData.endTime !== '' && endTime <= startTime;
    setTimeError(isInvalidTimeRange);
  }, [scheduleData.startTime, scheduleData.endTime]);

  useEffect(() => {
    const { date, endTime, startTime } = scheduleData;
    const isDisabled = date === '' || endTime === '' || startTime === '' || timeError;
    setButtonDisabed(isDisabled);
  }, [scheduleData, timeError]);

  return (
    <div className="grid gap-2 tablet:gap-[10px]">
      <div className="flex flex-wrap gap-[5px] tablet:grid tablet:grid-cols-[1fr_109px_101px_56px] pc:grid-cols-[1fr_160px_140px_56px] pc:gap-5">
        <span className="min-w-[130px] flex-1 font-medium leading-[1.6] text-gray-700 tablet:text-xl tablet:leading-[1.3]">날짜</span>
        <span className="w-[79px] font-medium leading-[1.6] text-gray-700 tablet:text-xl tablet:leading-[1.3]">시작 시간</span>
        <span className="w-[79px] font-medium leading-[1.6] text-gray-700 tablet:text-xl tablet:leading-[1.3]">종료 시간</span>
        <div className="w-11 tablet:w-auto" />
      </div>

      <div className="flex flex-wrap items-center gap-[5px] tablet:grid tablet:grid-cols-[1fr_213px_56px] pc:grid-cols-[1fr_318px_56px] pc:gap-5">
        <CalendarWrapper onChange={handleScheduleChange} value={scheduleData.date} />
        <div className="grid w-[163px] grid-cols-2 items-center gap-[5px] tablet:w-auto pc:grid-cols-[1fr_14px_1fr] pc:gap-3">
          <SelectBox value={scheduleData.startTime} keyName="startTime" values={timeArray} placeholder="HH:MM" onSelect={handleScheduleChange} size="small" />
          {isPC && <span className="text-xl font-bold leading-[1.3]">~</span>}
          <SelectBox value={scheduleData.endTime} keyName="endTime" values={timeArray} placeholder="HH:MM" onSelect={handleScheduleChange} size="small" />
        </div>
        <button type="button" disabled={buttonDisabled} onClick={handleAddSchedule} className="w-11 tablet:w-auto">
          {buttonDisabled ? <Image src={AddDisabled} alt="추가 불가" /> : <Image src={AddIcon} alt="추가" />}
        </button>
      </div>
      {timeError && (
        <span className="mt-2 block break-keep pl-2 text-xs leading-[1.3] text-red-500">
          시작 시간은 종료 시간보다 이전이어야 합니다. 올바른 시간을 선택해 주세요.
        </span>
      )}
    </div>
  );
}

export default SchedulePicker;
