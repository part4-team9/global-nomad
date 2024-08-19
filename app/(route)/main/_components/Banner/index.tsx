'use client';

import Image from 'next/image';

import useGetActivities from '@/_hooks/activities/useGetActivities';

import Spinner from 'public/assets/icons/spinner.svg';

const calendarNum = new Date().getMonth() + 1;

/**
 * Banner 컴포넌트 입니다.
 */

export default function Banner() {
  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: null,
    size: 1,
    sort: 'most_reviewed',
  });

  return (
    <div className="relative h-[240px] w-full mobile:h-[540px]">
      {isLoading ? (
        <Image src={Spinner} fill alt="loading" />
      ) : (
        data && <Image src={data?.activities[0].bannerImageUrl} alt={data?.activities[0].title} fill style={{ objectFit: 'cover' }} />
      )}
      <div className="size-full bg-bannerGradient" />
      <div className="relative bottom-[170px] mx-auto max-w-[1200px] px-6 font-bold text-white mobile:bottom-[370px]">
        <h4 className="w-[184px] break-keep text-xl tablet:w-[502px] tablet:text-[54px] tablet:leading-[80px] mobile:w-[440px] mobile:text-[40px] mobile:leading-[60px]">
          {isLoading ? '로딩 중입니다..' : data?.activities[0].title}
          {isError && (
            <div>
              데이터를 불러오는데 실패하였습니다.
              다시 시도해주세요.
            </div>
          )}
        </h4>
        <span className="text-md tablet:text-2xl mobile:text-xl">
          {isLoading ? `${calendarNum}월의 인기 경험 로딩 중입니다...` : `${calendarNum}월의 인기 경험 BEST 🔥`}
          {isError && <div>데이터를 불러오는데 실패하였습니다.</div>}
        </span>
      </div>
    </div>
  );
}
