/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useSearchStore from '@/_stores/useSearchStore';
import useGetActivities from '@/_hooks/activities/useGetActivities';

import Rating from '@/_components/Rating';

import usePrevNextButtons, { NextButton, PrevButton } from './HotListsCarouselBtn';

export default function HotListsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const router = useRouter();
  const searchValue = useSearchStore((state) => state.searchValue);

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: null,
    size: 10,
    sort: 'most_reviewed',
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  if (isLoading) {
    return (
      <div className="mb-2 mt-3 flex gap-4 overflow-hidden">
        <div className="skeleton-list-item mb-6 flex min-h-[186px] w-full min-w-[186px] items-center justify-center rounded-3xl bg-gray-100 mobile:min-h-[384px] mobile:min-w-[368px]" />
        <div className="skeleton-list-item mb-6 flex min-h-[186px] w-full min-w-[186px] items-center justify-center rounded-3xl bg-gray-100 mobile:min-h-[384px] mobile:min-w-[368px]" />
        <div className="skeleton-list-item mb-6 flex min-h-[186px] w-full min-w-[186px] items-center justify-center rounded-3xl bg-gray-100 mobile:min-h-[384px] mobile:min-w-[368px]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex h-full items-center justify-center text-base font-bold mobile:text-3xl">문제가 발생했습니다!</div>
      </div>
    );
  }

  if (searchValue === '') {
    return (
      <>
        <div className="absolute right-0 top-[-14px] flex items-center justify-end mobile:top-0">
          <div className="flex items-center">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
        <div className="embla relative mb-6 w-full overflow-hidden pb-2 pt-3" ref={emblaRef}>
          <div className="embla__container flex touch-pan-y touch-pinch-zoom">
            {data?.activities.map((activity, i) => (
              <div
                onClick={() => router.push(`/activity/details/${activity.id}`)}
                className="embla__slide group relative min-w-0 shrink-0 grow-0 basis-[186px] cursor-pointer mobile:basis-[384px]"
                key={i}
              >
                <div className="transform rounded-3xl transition-transform duration-300 hover:translate-y-[-10px] group-hover:shadow-lg group-hover:shadow-gray-400">
                  <div
                    className="absolute bottom-0 h-3/5 w-[186px] rounded-3xl mobile:w-[368px]"
                    style={{ background: 'linear-gradient(to top, rgb(30,30,30), transparent)' }}
                  />
                  <div className="absolute bottom-7 left-10 flex flex-col gap-0 text-white mobile:gap-5">
                    <Rating rating={activity.rating} reviewCount={activity.reviewCount} ratingTarget="hot" />
                    <div className="mr-[20px] max-h-[80px] break-keep text-lg mobile:max-h-[130px] mobile:text-[28px] mobile:leading-[42px]">
                      {activity.title}
                    </div>
                    <div className="text-md mobile:text-2lg">
                      ₩ {activity.price.toLocaleString()}
                      <span className="text-md font-regular"> /인</span>
                    </div>
                  </div>
                  <Image
                    src={activity.bannerImageUrl}
                    alt={activity.title}
                    priority
                    width={384}
                    height={384}
                    className="aspect-square w-[186px] rounded-3xl object-cover mobile:size-[384px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return null;
}
