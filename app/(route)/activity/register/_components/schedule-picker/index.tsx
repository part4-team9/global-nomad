'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';

import { generateTimeArray } from '@/_utils/generateTimeArray';

import SelectBox from '@/_components/select-box';

import type { Activity, Schedule } from '../../page';
import CalendarWrapper from '../calendar-picker';

import AddIcon from 'public/assets/icons/btn-plus.svg';

interface PickerProps {
  scheduleArray: Schedule[];
  setFormData: Dispatch<SetStateAction<Activity>>;
}

function SchedulePicker({ scheduleArray, setFormData }: PickerProps) {
  const timeArray = generateTimeArray();
  const [addButtonDisable, setAddButtonDisable] = useState(true);
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
    setScheduleData({
      date: '',
      startTime: '',
      endTime: '',
    });
  };

  useEffect(() => {
    const { date, startTime, endTime } = scheduleData;
    const isDisable = date === '' || startTime === '' || endTime === '';
    const isSame = scheduleArray.some((arr) => JSON.stringify(arr) === JSON.stringify(scheduleData));
    setAddButtonDisable(isDisable || isSame);
  }, [scheduleData, scheduleArray]);

  return (
    <div className="flex items-center gap-5">
      <CalendarWrapper onChange={handleScheduleChange} value={scheduleData.date} />
      <div className="flex items-center gap-3">
        <SelectBox
          value={scheduleData.startTime}
          keyName="startTime"
          values={timeArray}
          placeholder="HH:MM"
          onSelect={handleScheduleChange}
          className="max-w-[140px] py-[15px] pl-4 pr-3"
        />
        <span className="text-[20px] font-bold leading-[1.3]">~</span>
        <SelectBox
          value={scheduleData.endTime}
          keyName="endTime"
          values={timeArray}
          placeholder="HH:MM"
          onSelect={handleScheduleChange}
          className="max-w-[140px] py-[15px] pl-4 pr-3"
        />
      </div>
      <button type="button" disabled={addButtonDisable} onClick={handleAddSchedule}>
        <Image src={AddIcon} alt="추가" />
      </button>
    </div>
  );
}

export default SchedulePicker;
