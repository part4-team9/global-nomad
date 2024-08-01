'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import type { Activity, Schedule } from '../../page';

import DeleteIcon from 'public/assets/icons/btn-minus.svg';

interface ScheduleEditorProps {
  schedule: Schedule;
  scheduleArray: Schedule[];
  setFormData: Dispatch<SetStateAction<Activity>>;
}

function ScheduleEditor({ schedule, scheduleArray, setFormData }: ScheduleEditorProps) {
  const deleteSchedule = () => {
    const updatedArray = scheduleArray.filter((s) => JSON.stringify(s) !== JSON.stringify(schedule));
    setFormData((prev) => ({
      ...prev,
      schedules: updatedArray,
    }));
  };

  return (
    <div className="flex items-center gap-5">
      <input readOnly value={schedule.date} className="flex-1 rounded border border-solid border-gray-600 py-[15px] pl-4 pr-3 outline-none" />
      <div className="flex items-center gap-3">
        <input readOnly value={schedule.startTime} className="max-w-[140px] rounded border border-solid border-gray-600 py-[15px] pl-4 pr-3 outline-none" />
        <span className="text-[20px] font-bold leading-[1.3]">~</span>
        <input readOnly value={schedule.endTime} className="max-w-[140px] rounded border border-solid border-gray-600 py-[15px] pl-4 pr-3 outline-none" />
      </div>
      <button type="button" onClick={deleteSchedule}>
        <Image src={DeleteIcon} alt="삭제" />
      </button>
    </div>
  );
}

export default ScheduleEditor;
