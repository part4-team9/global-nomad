'use client';

import { useRouter } from 'next/navigation';

import useCarousel from '@/_hooks/activities/useCarousel';
import useInfiniteActivities from '@/_hooks/activities/useInfinitiActivities';
import { useIntersectionObserver } from '@/_hooks/activities/useIntersectionObserver';

import ActivityCard from './ActivityCard/index';
import CarouselControls from './CarouselControls.tsx';
import LoadingError from './LoadingError';

/**
 * 인기 체험 리스트 컴포넌트 입니다.
 */

export default function HotActivityLists() {
  const router = useRouter();

  const { data, fetchNextPage, isLoading, isError, hasNextPage } = useInfiniteActivities({
    method: 'cursor',
    cursorId: null,
    size: 3,
    sort: 'most_reviewed',
  });

  const { setTarget } = useIntersectionObserver({
    threshold: 1,
    hasNextPage,
    fetchNextPage,
  });

  const { activityArray, showButtons, sliderContainerRef, handlePrevClick, handleNextClick, hasPrevious, hasNext } = useCarousel({
    fetchNextPage,
    hasNextPage,
    data,
  });

  return (
    <div className="flex flex-col font-bold">
      <div className="flex items-center justify-between">
        <div className="text-2xl mobile:text-[36px] mobile:leading-[43px]">🔥 인기 체험</div>
        {showButtons && <CarouselControls handlePrevClick={handlePrevClick} handleNextClick={handleNextClick} hasPrevious={hasPrevious} hasNext={hasNext} />}
      </div>
      <div className="relative py-6">
        <div ref={sliderContainerRef} className="scrollbar-hide flex space-x-4 overflow-x-auto scroll-smooth">
          {activityArray.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} onClick={() => router.push(`/activities/${activity.id}`)} />
          ))}
          <LoadingError isLoading={isLoading} isError={isError} />
          <div ref={setTarget} />
        </div>
      </div>
    </div>
  );
}
