'use client';

import { useState } from 'react';
import Image from 'next/image';

import useGetActivities from '@/_hooks/activities/useGetActivities';

import Btn from 'public/assets/icons/carousel-btn.svg';
import Spinner from 'public/assets/icons/spinner.svg';

const calendarNum = new Date().getMonth() + 1;

/**
 * Banner 컴포넌트 입니다.
 */

export default function Banner() {
  const [currentImg, setCurrentImg] = useState(0);
  const [transition, setTransition] = useState('opacity-100');

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: null,
    size: 3,
    sort: 'most_reviewed',
  });

  const handlePrevClick = () => {
    if (data) {
      setTransition('opacity-85');
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % data.activities.length);
        setTransition('opacity-100');
      }, 300);
    }
  };

  const handleNextClick = () => {
    if (data) {
      setTransition('opacity-85');
      setTimeout(() => {
        setCurrentImg((prevIndex) => (prevIndex - 1 + data.activities.length) % data.activities.length);
        setTransition('opacity-100');
      }, 300);
    }
  };

  return (
    <div className="relative h-[240px] w-full mobile:h-[540px]">
      {isLoading ? (
        <Image src={Spinner} fill alt="loading" />
      ) : (
        data && (
          <div className="absolute inset-0">
            <Image
              src={data?.activities[currentImg].bannerImageUrl}
              alt={data?.activities[0].title}
              fill
              className={`object-cover transition-opacity duration-300 ${transition}`}
            />
            <div className="absolute inset-0 z-30 flex items-center justify-between mobile:px-2 tablet:px-4">
              <button type="button" onClick={handlePrevClick}>
                <Image src={Btn} alt="이전 버튼" width={40} height={40} className="size-8 mobile:size-16" />
              </button>
              <button type="button" onClick={handleNextClick}>
                <Image src={Btn} alt="이전 버튼" width={40} height={40} className="size-8 rotate-180 mobile:size-16" />
              </button>
            </div>
          </div>
        )
      )}
      <div className="relative z-10 size-full bg-bannerGradient" />
      <div className="relative bottom-[170px] z-20 mx-auto max-w-[1200px] px-8 font-bold text-white mobile:bottom-[360px] mobile:px-20">
        <h4 className="w-[184px] break-keep text-xl mobile:w-[440px] mobile:text-[40px] mobile:leading-[60px] tablet:w-[502px] tablet:text-5xl tablet:leading-[60px]">
          {isLoading ? '로딩 중입니다..' : data?.activities[0].title}
          {isError && <div>데이터를 불러오는데 실패하였습니다. 다시 시도해주세요.</div>}
        </h4>
        <span className="text-md mobile:text-xl tablet:text-2xl">
          {isLoading ? `${calendarNum}월의 인기 경험 로딩 중입니다...` : `${calendarNum}월의 인기 경험 BEST 🔥`}
          {isError && <div>데이터를 불러오는데 실패하였습니다.</div>}
        </span>
      </div>
    </div>
  );
}
