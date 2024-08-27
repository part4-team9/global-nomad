/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React, { useCallback } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import useGetActivities from '@/_hooks/activities/useGetActivities';

import useCarouselDotBtn, { DotButton } from './CarouselDotBtn';

import Btn from 'public/assets/icons/carousel-btn.svg';
import Spinner from 'public/assets/icons/spinner.svg';

const calendarNum = new Date().getMonth() + 1;

/**
 * Carousel 컴포넌트 입니다.
 */

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Fade(), Autoplay({ delay: 3000 })]);

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: null,
    size: 3,
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
    return <Image src={Spinner} fill alt="로딩중" className="size-20 mobile:size-32" />;
  }

  if (isError) {
    return <div className="flex h-full items-center justify-center text-base font-bold mobile:text-3xl">문제가 발생했습니다!</div>;
  }

  return (
    <>
      <div className="group h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {data?.activities.map((activity, i) => (
            <div key={i} className="relative size-full flex-shrink-0" data-id={activity.id}>
              <Image src={activity.bannerImageUrl} alt={activity.title} fill className="flex items-center justify-center object-cover" />
              <div className="relative z-20 flex size-full max-w-[250px] flex-col items-center justify-center break-keep pl-7 text-xl font-bold text-white xl:left-[100px] 2xl:left-[200px] mobile:max-w-[450px] mobile:pl-16 mobile:text-[40px] mobile:leading-[60px] tablet:max-w-[600px] tablet:pl-20 tablet:text-5xl tablet:leading-[60px]">
                <span className="mb-2 w-full text-left leading-7 mobile:mb-5 mobile:leading-[50px] tablet:leading-[60px]">{activity.title}</span>
                <span className="w-full text-left text-sm mobile:text-xl tablet:text-2xl">{`${calendarNum}월의 인기 경험 BEST 🔥`}</span>
              </div>
              <div className="absolute top-0 z-10 size-full bg-bannerGradient" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex justify-between mobile:px-4 tablet:px-8">
          <button type="button" onClick={scrollPrev} className="hidden group-hover:block">
            <Image src={Btn} alt="이전 버튼" width={40} height={40} className="size-8 mobile:size-10" />
          </button>
          <button type="button" onClick={scrollNext} className="hidden group-hover:block">
            <Image src={Btn} alt="다음 버튼" width={40} height={40} className="size-8 rotate-180 mobile:size-10" />
          </button>
        </div>
      </div>
      <div className="dots absolute inset-x-0 top-0 z-50 flex flex-wrap items-center justify-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'dot inline-flex h-10 w-7 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full bg-transparent'.concat(
              index === selectedIndex ? 'dot--selected' : '',
            )}
          />
        ))}
      </div>
    </>
  );
}
