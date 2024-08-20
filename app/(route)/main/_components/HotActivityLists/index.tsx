'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Activity } from '@/_types/activities/types';

import useInfiniteActivities from '@/_hooks/activities/useInfinitiActivities';
import { useIntersectionObserver } from '@/_hooks/activities/useIntersectionObserver';

import ActivityCard from './ActivityCard/ActivityCard';
import LoadingError from './LoadingError/LoadingError';

/**
 * 인기 체험 리스트 컴포넌트 입니다.
 */

export default function HotActivityLists() {
  const [activityArray, setActivityArray] = useState<Activity[]>([]);
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

  useEffect(() => {
    if (data) {
      const newActivities = data.pages.flatMap((page) => page.activities);
      setActivityArray((prev) => [...prev, ...newActivities.filter((newActivity) => !prev.some((activity) => activity.id === newActivity.id))]);
    }
  }, [data]);

  return (
    <div className="flex flex-col font-bold">
      <div className="text-2xl mobile:text-[36px] mobile:leading-[43px]">🔥 인기 체험</div>
      <div className="scrollbar-hide flex space-x-4 overflow-x-scroll py-[20px]">
        {activityArray.map((activity, i) => (
          <ActivityCard key={i} activity={activity} onClick={() => router.push(`/activities/${activity.id}`)} />
        ))}
        <LoadingError isLoading={isLoading} isError={isError} />
        <div ref={setTarget} />
      </div>
    </div>
  );
}
