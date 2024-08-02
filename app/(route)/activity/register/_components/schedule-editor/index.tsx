'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import useWindowSize from '@/_hooks/useWindowSize';

import type { Activity, Schedule } from '../../page';

import DeleteIcon from 'public/assets/icons/btn-minus.svg';

interface ScheduleEditorProps {
  schedule: Schedule;
  scheduleArray: Schedule[];
  setFormData: Dispatch<SetStateAction<Activity>>;
}

function ScheduleEditor({ schedule, scheduleArray, setFormData }: ScheduleEditorProps) {
  const windowSize = useWindowSize();
  const isPC = windowSize > 1023;

  const deleteSchedule = () => {
    const updatedArray = scheduleArray.filter((s) => JSON.stringify(s) !== JSON.stringify(schedule));
    setFormData((prev) => ({
      ...prev,
      schedules: updatedArray,
    }));
  };

  return (
    <div className="grid grid-cols-[1fr_163px_44px] items-center gap-[5px] tablet:grid-cols-[1fr_213px_56px] lg:grid-cols-[1fr_318px_56px] lg:gap-5">
      <input
        readOnly
        value={schedule.date}
        className="min-w-[-webkit-fill-available] rounded border border-solid border-gray-600 px-[10px] py-2 text-sm leading-[1.8] outline-none tablet:py-[15px] tablet:pl-4 tablet:pr-3 tablet:text-base tablet:leading-[1.6]"
      />
      <div className="grid grid-cols-2 items-center gap-[5px] lg:grid-cols-[1fr_14px_1fr] lg:gap-3">
        <input
          readOnly
          value={schedule.startTime}
          className="max-w-[140px] rounded border border-solid border-gray-600 px-[10px] py-2 text-sm leading-[1.8] outline-none tablet:py-[15px] tablet:pl-4 tablet:pr-3 tablet:text-base tablet:leading-[1.6]"
        />
        {isPC && <span className="text-[20px] font-bold leading-[1.3]">~</span>}
        <input
          readOnly
          value={schedule.endTime}
          className="max-w-[140px] rounded border border-solid border-gray-600 px-[10px] py-2 text-sm leading-[1.8] outline-none tablet:py-[15px] tablet:pl-4 tablet:pr-3 tablet:text-base tablet:leading-[1.6]"
        />
      </div>
      <button type="button" onClick={deleteSchedule}>
        <Image src={DeleteIcon} alt="삭제" />
      </button>
    </div>
  );
}

export default ScheduleEditor;
