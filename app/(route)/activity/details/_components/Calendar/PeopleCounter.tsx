'use client';

import Image from 'next/image';

interface PeopleCounterProps {
  peopleCount: number;
  setPeopleCount: (count: number) => void;
}

export default function PeopleCounter({ peopleCount, setPeopleCount }: PeopleCounterProps) {
  const handlePeopleCountChange = (change: number) => {
    setPeopleCount(Math.max(1, peopleCount + change));
  };

  return (
    <div className="px-[24px] tablet:px-0">
      <h3 className="pb-[8px] pt-[12px] text-xl font-bold text-black tablet:text-2lg">참여 인원 수</h3>
      <div className="flex w-[120px] items-center justify-between rounded-[6px] border border-gray-200">
        <Image
          src="/assets/icons/minus-button.svg"
          alt="마이너스 버튼"
          width={40}
          height={40}
          onClick={() => handlePeopleCountChange(-1)}
          className="cursor-pointer"
        />
        <div className="text-md text-gray-700">{peopleCount}</div>
        <Image
          src="/assets/icons/plus-button.svg"
          alt="플러스 버튼"
          width={40}
          height={40}
          onClick={() => handlePeopleCountChange(1)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
