'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Rating from '@/_components/Rating';

type Activity = {
  bannerImageUrl: string;
  id: string;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
};

interface ActivityGridProps {
  activities?: Activity[];
  isError: boolean;
  isLoading: boolean;
}

export default function ActivityGrid({ activities, isLoading, isError }: ActivityGridProps) {
  const [skeletonCount, setSkeletonCount] = useState<number>(8);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(min-width: 1200px)').matches) {
        setSkeletonCount(8); // 데스크탑
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setSkeletonCount(9); // 태블릿
      } else {
        setSkeletonCount(4); // 모바일
      }
    };

    handleResize(); // 초기화
    window.addEventListener('resize', handleResize); // 사이즈 변경 시 호출

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    const skeletonItems = Array.from({ length: skeletonCount }, (_, index) => (
      <div key={index} className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
    ));

    return (
      <>
        <div className="mx-auto mb-[20px] mt-4 grid min-h-[700px] grid-cols-2 grid-rows-2 gap-x-[8px] gap-y-[20px] mobile:mb-[40px] mobile:mt-7 mobile:min-h-[1280px] mobile:grid-cols-3 mobile:grid-rows-3 mobile:gap-x-[16px] mobile:gap-y-[32px] tablet:min-h-[920px] tablet:grid-cols-4 tablet:grid-rows-2 tablet:gap-x-[24px]">
          {skeletonItems}
        </div>
        <div className="skeleton-list-item mb-6 flex min-h-[155px] items-center justify-center rounded-3xl bg-gray-100" />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto mb-[20px] mt-4 grid min-h-[700px] grid-cols-2 grid-rows-2 gap-x-[8px] gap-y-[20px] mobile:mb-[40px] mobile:mt-7 mobile:min-h-[1280px] mobile:grid-cols-3 mobile:grid-rows-3 mobile:gap-x-[16px] mobile:gap-y-[32px] tablet:min-h-[920px] tablet:grid-cols-4 tablet:grid-rows-2 tablet:gap-x-[24px]">
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
        <div className="skeleton-list-item mb-6 flex items-center justify-center rounded-3xl bg-gray-100" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[384px] w-full items-center justify-center text-xl font-bold">
        데이터를 불러오는데 실패하였습니다.
        <br />
        다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="mx-auto mb-[20px] mt-4 grid min-h-[700px] grid-cols-2 grid-rows-2 gap-x-[8px] gap-y-[20px] mobile:mb-[40px] mobile:mt-7 mobile:min-h-[1280px] mobile:grid-cols-3 mobile:grid-rows-3 mobile:gap-x-[16px] mobile:gap-y-[32px] tablet:min-h-[920px] tablet:grid-cols-4 tablet:grid-rows-2 tablet:gap-x-[24px]">
      {activities?.map((activity) => (
        <div key={activity.id} className="flex cursor-pointer flex-col gap-[16px]" onClick={() => router.push(`/activity/details/${activity.id}`)}>
          <div className="relative aspect-square overflow-hidden rounded-[24px]">
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              fill
              sizes="w-full"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="text-balance">
            <Rating rating={activity.rating} reviewCount={activity.reviewCount} ratingTarget="all" />
            <div className="my-[10px] break-keep text-lg font-semibold mobile:text-xl">{activity.title}</div>
            <div className="text-2lg font-bold mobile:text-xl">
              ₩ {activity.price.toLocaleString()}
              <span className="text-md font-regular text-gray-700 mobile:text-2lg"> /인</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
