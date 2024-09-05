/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useCallback } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useGetActivities from '@/_hooks/activities/useGetActivities';

import useCarouselDotBtn, { DotButton } from './CarouselDotBtn';

import Btn from 'public/assets/icons/carousel-btn.svg';
import Right from 'public/assets/icons/right.svg';

const calendarNum = new Date().getMonth() + 1;

/**
 * Carousel 컴포넌트 입니다.
 */

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Fade(), Autoplay({ delay: 3000 })]);

  const router = useRouter();

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: null,
    size: 5,
    sort: 'most_reviewed',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselDotBtn(emblaApi, onNavButtonClick);

  if (isLoading) {
    return (
      <div className="size-full p-4 mobile:p-8">
        <div className="skeleton-list-item flex h-full items-center justify-center rounded-lg bg-gray-100" />
      </div>
    );
  }

  if (isError) {
    return <div className="flex h-full items-center justify-center text-base font-bold mobile:text-3xl">문제가 발생했습니다!</div>;
  }

  const currentActivity = data?.activities[selectedIndex];

  return (
    <div className="relative h-[240px] w-full mobile:h-[540px]">
      <div className="group h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {data?.activities.map((activity, i) => (
            <div key={i} className="relative size-full flex-shrink-0" data-id={activity.id}>
              <Image src={activity.bannerImageUrl} alt={activity.title} fill className="flex items-center justify-center object-cover" />
              <div className="absolute top-0 z-10 size-full bg-bannerGradient" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 z-20 mx-auto flex max-w-[340px] justify-between mobile:max-w-[740px] mobile:px-4 tablet:max-w-[1500px] tablet:px-8">
          <button type="button" onClick={scrollPrev} className="z-30 hidden group-hover:block">
            <Image src={Btn} alt="이전 버튼" width={40} height={40} className="size-8 mobile:size-10" />
          </button>
          <button type="button" onClick={scrollNext} className="z-30 hidden group-hover:block">
            <Image src={Btn} alt="다음 버튼" width={40} height={40} className="size-8 rotate-180 mobile:size-10" />
          </button>
        </div>
      </div>
      <div className="relative bottom-full mx-auto flex size-full max-w-[1100px] justify-center">
        <div className="absolute bottom-[40px] flex flex-wrap items-center justify-center mobile:bottom-[60px]">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'dot z-30 inline-flex h-10 w-7 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full bg-transparent'.concat(
                index === selectedIndex ? ' dot--selected' : '',
              )}
            />
          ))}
        </div>
        {currentActivity && (
          <div className="absolute bottom-0 mx-auto flex size-full max-w-[1100px] flex-col items-center justify-center break-keep px-6 text-xl font-bold text-white mobile:bottom-4 mobile:text-[40px] mobile:leading-[60px] tablet:bottom-8 tablet:text-5xl tablet:leading-[60px]">
            <span className="mb-1 w-full text-left leading-7 mobile:mb-3 mobile:leading-[50px] tablet:mb-5 tablet:leading-[60px]">{currentActivity.title}</span>
            <span className="w-full text-left text-sm font-medium mobile:text-xl tablet:text-2xl">{`${calendarNum}월의 인기 경험 BEST 🔥`}</span>
            <div className="relative z-30 w-full">
              <button
                type="button"
                onClick={() => currentActivity.id && router.push(`/activity/details/${currentActivity.id}`)}
                className="mt-3 flex w-fit items-center justify-center gap-[2px] rounded-2xl bg-gray-150 px-2 py-[2px] text-xs font-medium text-black hover:bg-gray-200 mobile:px-5 mobile:py-1 mobile:text-base"
              >
                자세히 보기 <Image src={Right} alt="자세히 보기" width={13} height={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
