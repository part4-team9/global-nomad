/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import type { ReservationParams } from '@/_types/myReservations';
import type { ReservationFilter } from '@/_constants/reservation-filter';
import { RESERVATION_FILTER } from '@/_constants/reservation-filter';

import useSelectBox from '@/_hooks/useSelectBox';

import { cn } from '@/_utils/classNames';

import ArrowDown from 'public/assets/icons/cost-btn.svg';

interface DropdownProps {
  setParams: Dispatch<SetStateAction<ReservationParams>>;
}

/**
 * FilterDropdown
 *
 * 예약 내역 페이지에서 사용하는 필터 컴포넌트입니다.
 * 사용자는 이 컴포넌트를 통해 예약 상태를 필터링할 수 있습니다.
 *
 * @TODO 메인 페이지 드롭다운과의 공통화 작업 필요
 */
function FilterDropdown({ setParams }: DropdownProps) {
  const searchParams = useSearchParams();
  const { showList, fade, openSelectBox, closeSelectBox } = useSelectBox();

  const initialLabel = RESERVATION_FILTER.find((filter) => filter.status === searchParams.get('status'))?.label || '필터';

  const [selectedFilterLabel, setSelectedFilterLabel] = useState(initialLabel);

  const handleFilterSelect = (filter: ReservationFilter) => {
    setParams((prev) => ({
      ...prev,
      status: filter.status,
    }));
    setSelectedFilterLabel(filter.label);
    closeSelectBox();
  };

  return (
    <>
      {showList && <div onClick={closeSelectBox} className="fixed left-0 top-0 z-0 size-full" />}
      <div className="relative ml-auto">
        <div
          onClick={showList ? closeSelectBox : openSelectBox}
          className="z-[1] flex min-w-[120px] cursor-pointer items-center justify-between gap-[3px] rounded-[15px] border border-solid border-green-200 bg-white px-5 py-[10px] mobile:min-w-40 mobile:gap-2 mobile:py-4"
        >
          <span className="text-sm font-medium leading-none text-green-200 mobile:text-lg mobile:leading-none">{selectedFilterLabel}</span>
          <Image src={ArrowDown} alt="더보기" className={cn(['duration-500', fade ? 'rotate-180' : 'rotate-0'])} />
        </div>
        {showList && (
          <div className={cn(['absolute mt-2 min-w-[120px] shadow-small mobile:min-w-40', fade ? 'animate-fade-in' : 'animate-fade-out'])}>
            <div className="overflow-hidden rounded-md border border-solid border-gray-200">
              {RESERVATION_FILTER.map((filter) => (
                <div
                  key={filter.label}
                  onClick={() => handleFilterSelect(filter)}
                  className={cn([
                    'flex cursor-pointer items-center justify-center border-b border-solid border-gray-200 px-[5px] py-[10px] last-of-type:border-none mobile:px-2 mobile:py-[18px] tablet:px-3',
                    selectedFilterLabel === filter.label ? 'bg-nomad-black text-white' : 'bg-white text-gray-700 hover:bg-green-100',
                  ])}
                >
                  <span className="text-sm font-medium mobile:text-lg">{filter.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterDropdown;
