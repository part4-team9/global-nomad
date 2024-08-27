'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import type { ActivityEdit, EditSchedule } from '@/_types/activities/form.types';

import useWindowSize from '@/_hooks/useWindowSize';

import DeleteIcon from 'public/assets/icons/btn-minus.svg';

interface ScheduleEditorProps<T> {
  detailData?: EditSchedule[];
  index: number;
  schedule: EditSchedule;
  scheduleArray: EditSchedule[];
  setEditFormData?: Dispatch<SetStateAction<ActivityEdit>>;
  setFormData: Dispatch<SetStateAction<T>>;
}

function ReadOnlyInput({ value, widthClass }: { value: string; widthClass: string }) {
  return (
    <input
      readOnly
      value={value}
      className={`${widthClass} flex-1 rounded border border-solid border-gray-600 px-[10px] py-2 text-md leading-[1.8] outline-none tablet:py-[15px] tablet:pl-4 tablet:pr-3 tablet:text-base tablet:leading-[1.6]`}
    />
  );
}

/**
 * ScheduleEditor 컴포넌트는 사용자가 추가하거나 수정한 스케줄을 렌더링하고,
 * 스케줄 삭제 기능을 제공하는 컴포넌트입니다.
 *
 * @param {number} index - 현재 스케줄의 배열 내 위치를 나타내는 인덱스.
 * @param {EditSchedule[]} [detailData] - 기존에 등록된 스케줄 데이터, 수정 시 사용됩니다.
 * @param {EditSchedule} schedule - 렌더링되는 스케줄 객체.
 * @param {EditSchedule[]} scheduleArray - 현재 수정 중인 스케줄 배열.
 * @param {Dispatch<SetStateAction<ActivityEdit>>} [setEditFormData] - 체험 수정 폼 데이터를 업데이트하는 함수.
 * @param {Dispatch<SetStateAction<T>>} [setFormData] - 체험 등록 폼, 체험 수정 화면의 상세 데이터를 업데이트하는 함수
 */
function ScheduleEditor<T>({ index, detailData, schedule, scheduleArray, setEditFormData, setFormData }: ScheduleEditorProps<T>) {
  const windowSize = useWindowSize();
  const isPC = windowSize > 1023;

  const deleteSchedule = () => {
    const updatedArray = scheduleArray.filter((s, idx) => index !== idx || JSON.stringify(s) !== JSON.stringify(schedule));
    setFormData((prev) => ({
      ...prev,
      schedules: updatedArray,
    }));

    if (detailData && setEditFormData) {
      const updatedData = detailData.filter((s) => JSON.stringify(s) !== JSON.stringify(schedule));

      if (schedule.id) {
        const { id } = schedule;
        setEditFormData((prev) => ({
          ...prev,
          scheduleIdsToRemove: [...prev.scheduleIdsToRemove, id],
        }));
      } else {
        setEditFormData((prev) => ({
          ...prev,
          schedulesToAdd: updatedData,
        }));
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-[5px] tablet:grid tablet:grid-cols-[1fr_213px_56px] pc:grid-cols-[1fr_318px_56px] pc:gap-5">
      <ReadOnlyInput value={schedule.date} widthClass="min-w-[130px]" />
      <div className="grid w-[163px] grid-cols-2 items-center gap-[5px] tablet:w-auto pc:grid-cols-[1fr_14px_1fr] pc:gap-3">
        <ReadOnlyInput value={schedule.startTime} widthClass="max-w-[140px]" />
        {isPC && <span className="text-xl font-bold leading-[1.3]">~</span>}
        <ReadOnlyInput value={schedule.endTime} widthClass="max-w-[140px]" />
      </div>
      <button type="button" onClick={deleteSchedule} className="w-11 tablet:w-auto">
        <Image src={DeleteIcon} alt="삭제" />
      </button>
    </div>
  );
}

export default ScheduleEditor;
