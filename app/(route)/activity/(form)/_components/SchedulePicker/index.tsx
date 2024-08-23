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

interface PickerProps<T> {
  setEditFormData?: Dispatch<SetStateAction<ActivityEdit>>;
  setFormData: Dispatch<SetStateAction<T>>;
}

/**
 * SchedulePicker 컴포넌트는 사용자가 예약 가능한 시간대를 선택하고 추가할 수 있는 기능을 제공합니다.
 * 이 컴포넌트는 체험 등록과 체험 수정 페이지에서 사용되며, 추가된 스케줄 데이터를 관리합니다.
 *
 * @template T - 이 컴포넌트에서 관리할 데이터 타입으로, Activity 또는 EditDetail 타입을 따릅니다.
 *
 * @param {Dispatch<SetStateAction<T>>} setFormData - 스케줄 데이터를 업데이트하는 함수입니다.
 * @param {Dispatch<SetStateAction<ActivityEdit>>} [setEditFormData] - 체험 수정 데이터를 업데이트하는 함수입니다. 선택적으로 제공됩니다.
 */
function SchedulePicker<T extends Activity | EditDetail>({ setEditFormData, setFormData }: PickerProps<T>) {
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
    setFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, scheduleData],
    }));
    if (setEditFormData) {
      setEditFormData((prev) => ({
        ...prev,
        schedulesToAdd: [...prev.schedulesToAdd, scheduleData],
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
    <div className="my-1 grid gap-2 tablet:mt-3 tablet:gap-[10px] pc:mt-2">
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
