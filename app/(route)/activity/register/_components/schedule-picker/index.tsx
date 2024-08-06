'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import type { ActivityEdit, EditDetail } from '@/(route)/activity/edit/[id]/page';

import useWindowSize from '@/_hooks/useWindowSize';

import { generateTimeArray } from '@/_utils/generateTimeArray';

import SelectBox from '@/_components/select-box';

import type { Activity, Schedule } from '../../page';
import CalendarWrapper from '../calendar-picker';

import AddIcon from 'public/assets/icons/btn-plus.svg';

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
    const { date, endTime, startTime } = scheduleData;
    const isDisabled = date === '' || endTime === '' || startTime === '';
    setButtonDisabed(isDisabled);
  }, [scheduleData]);

  return (
    <div className="grid gap-2 tablet:gap-[10px]">
      <div className="grid grid-cols-[1fr_79px_128px] gap-[5px] tablet:grid-cols-[1fr_109px_165px] lg:grid-cols-[1fr_158px_216px] lg:gap-5">
        <span className="font-medium leading-[1.6] text-gray-700 tablet:text-[20px] tablet:leading-[1.3]">날짜</span>
        <span className="font-medium leading-[1.6] text-gray-700 tablet:text-[20px] tablet:leading-[1.3]">시작 시간</span>
        <span className="font-medium leading-[1.6] text-gray-700 tablet:text-[20px] tablet:leading-[1.3]">종료 시간</span>
      </div>
      <div className="grid grid-cols-[1fr_163px_44px] items-center gap-[5px] tablet:grid-cols-[1fr_213px_56px] lg:grid-cols-[1fr_318px_56px] lg:gap-5">
        <CalendarWrapper onChange={handleScheduleChange} value={scheduleData.date} />
        <div className="grid grid-cols-2 items-center gap-[5px] lg:grid-cols-[1fr_14px_1fr] lg:gap-3">
          <SelectBox value={scheduleData.startTime} keyName="startTime" values={timeArray} placeholder="HH:MM" onSelect={handleScheduleChange} size="small" />
          {isPC && <span className="text-[20px] font-bold leading-[1.3]">~</span>}
          <SelectBox value={scheduleData.endTime} keyName="endTime" values={timeArray} placeholder="HH:MM" onSelect={handleScheduleChange} size="small" />
        </div>
        <button type="button" disabled={buttonDisabled} onClick={handleAddSchedule}>
          <Image src={AddIcon} alt="추가" />
        </button>
      </div>
    </div>
  );
}

export default SchedulePicker;
