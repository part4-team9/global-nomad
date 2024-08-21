'use client';

import Image from 'next/image';

import Btn from 'public/assets/icons/hot-activity-btn.svg';

interface CarouselControlsProps {
  handleNextClick: () => void;
  handlePrevClick: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function CarouselControls({ handlePrevClick, handleNextClick, hasPrevious, hasNext }: CarouselControlsProps) {
  return (
    <div className="flex gap-7">
      <button type="button" onClick={handlePrevClick} disabled={!hasPrevious} className={`p-2 ${!hasPrevious ? 'cursor-not-allowed opacity-50' : ''}`}>
        <Image sizes='100' src={Btn} alt="이전 버튼" width={15} height={15} className={`rotate-180 ${!hasPrevious ? 'grayscale filter' : ''}`} />
      </button>
      <button type="button" onClick={handleNextClick} disabled={!hasNext} className={`p-2 ${!hasNext ? 'cursor-not-allowed opacity-50' : ''}`}>
        <Image sizes='100' src={Btn} alt="다음 버튼" width={15} height={15} className={`${!hasNext ? 'grayscale filter' : ''}`} />
      </button>
    </div>
  );
}
