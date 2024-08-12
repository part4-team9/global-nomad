'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { Activity } from '@/_types/activities/types';

import useInfiniteActivities from '@/_hooks/activities/useInfinitiActivities';
import { useIntersectionObserver } from '@/_hooks/activities/useIntersectionObserver';

import Rating from '@/_components/rating';

import Spinner from 'public/assets/icons/spinner.svg';

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
      <div className="scrollbar-hide flex space-x-4 overflow-x-scroll pt-[20px]">
        {activityArray.map((activity, i) => (
          <div
            key={i}
            className="duration-400 relative h-[186px] w-[186px] flex-shrink-0 transform cursor-pointer rounded-[24px] transition-transform hover:-translate-y-2 hover:drop-shadow-xl mobile:h-[384px] mobile:w-[384px]"
            onClick={() => router.push(`/activities/${activity.id}`)}
          >
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="h-[186px] w-[186px]"
              className="rounded-[24px]"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-3/5 rounded-[24px]"
              style={{
                background: 'linear-gradient(to top, #1B1B1B, transparent)',
              }}
            />
            <div className="absolute bottom-[24px] left-[20px] right-0 flex flex-col gap-[6px] text-white mobile:gap-[20px]">
              <Rating rating={activity.rating} reviewCount={activity.reviewCount} use="hot" />
              <div className="mr-[20px] break-keep text-lg mobile:mr-[113px] mobile:text-[28px] mobile:leading-[42px]">{activity.title}</div>
              <div className="text-md mobile:text-2lg">
                ₩ {activity.price.toLocaleString()}
                <span className="text-md font-regular"> /인</span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex h-[384px] w-full items-center justify-center">
            <Image src={Spinner} width={150} height={150} alt="loading icon" />
          </div>
        )}
        {isError && (
          <div className="flex min-h-[186px] w-full items-center justify-center text-xl font-bold mobile:min-h-[384px]">
            데이터를 불러오는데 실패하였습니다.
            <br />
            다시 시도해주세요.
          </div>
        )}
        <div ref={setTarget} />
      </div>
    </div>
  );
}
