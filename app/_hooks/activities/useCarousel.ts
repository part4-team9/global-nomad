'use client';

import { useEffect, useRef, useState } from 'react';
import type { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';

import type { Activity, GetActivitiesResponse } from '@/_types/activities/types';

interface UseCarouselProps {
  data: { pages: { activities: Activity[] }[] } | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<InfiniteData<GetActivitiesResponse, unknown>, Error>>;
  hasNextPage: boolean;
}

function useCarousel({ fetchNextPage, hasNextPage, data }: UseCarouselProps) {
  const [activityArray, setActivityArray] = useState<Activity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      const newActivities = data.pages.flatMap((page) => page.activities);
      setActivityArray((prev) => [...prev, ...newActivities.filter((newActivity) => !prev.some((activity) => activity.id === newActivity.id))]);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => setShowButtons(window.innerWidth >= 767);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.scrollLeft = currentIndex * sliderContainerRef.current.clientWidth;
    }
  }, [currentIndex]);

  const handlePrevClick = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handleNextClick = async () => {
    const endIndex = activityArray.length - 3;

    if (currentIndex >= endIndex && hasNextPage) {
      await fetchNextPage();
    }

    setCurrentIndex((prev) => Math.min(prev + 1, endIndex));
  };

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < activityArray.length - 3 || hasNextPage;

  return {
    activityArray,
    showButtons,
    sliderContainerRef,
    handlePrevClick,
    handleNextClick,
    hasPrevious,
    hasNext,
  };
}

export default useCarousel;
