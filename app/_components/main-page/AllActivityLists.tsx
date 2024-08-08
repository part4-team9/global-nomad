'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useGetActivities from '@/_hooks/activities/useGetActivities';
import useResFetchCount from '@/_hooks/activities/useResFetchCount';

import CategoryLists from './CategoryLists';
import Pagination from './Pagination';

import Spinner from 'public/assets/icons/spinner.svg';

interface AllActivityListsProps {
  searchValue: string;
}

/**
 * 전체 체험 리스트 컴포넌트 입니다.
 * @param {string} searchValue - 부모 컴포넌트로 전달되는 검색 값 입니다.
 */

export default function AllActivityLists({ searchValue }: AllActivityListsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSort, setCurrentSort] = useState<'latest' | 'most_reviewed' | 'price_asc' | 'price_desc'>('latest');
  const [selectedCategories, setSelectedCategories] = useState<string>('전체');
  const router = useRouter();

  const fetchSize = useResFetchCount({ mobileSize: 4, tabletSize: 9, desktopSize: 8 });

  const categoryValue = selectedCategories === '전체' ? undefined : selectedCategories;

  const { data, isLoading, isError } = useGetActivities({
    method: 'offset',
    page: currentPage,
    size: fetchSize,
    sort: currentSort,
    keyword: searchValue || undefined,
    category: searchValue ? undefined : categoryValue,
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(category);
    setCurrentPage(1);
  };

  const handleFilterSelect = (sort: 'latest' | 'most_reviewed' | 'price_asc' | 'price_desc') => {
    setCurrentSort(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (searchValue !== '') {
      setCurrentPage(1);
    }
  }, [searchValue]);

  return (
    <div>
      {searchValue ? (
        <div className="flex flex-col gap-[12px] font-normal">
          <p className="text-xl mobile:text-3xl">
            <span className="font-bold">{searchValue}</span>으로 검색한 결과 입니다.
          </p>
          <p className="text-base">총 {data?.totalCount}개의 결과</p>
        </div>
      ) : (
        <CategoryLists onCategoryClick={handleCategoryClick} onFilterSelect={handleFilterSelect} selectedCategories={selectedCategories} />
      )}
      <div className="relative top-[20px] mx-auto mb-[30px] grid grid-cols-2 grid-rows-2 gap-x-[8px] gap-y-[5px] mobile:mb-[40px] mobile:grid-cols-3 mobile:grid-rows-3 mobile:gap-x-[16px] mobile:gap-y-[32px] tablet:grid-cols-4 tablet:grid-rows-2 tablet:gap-x-[24px]">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Image src={Spinner} width={150} height={150} alt="loading icon" />
          </div>
        )}
        {data?.activities &&
          data.activities.length > 0 &&
          data.activities.map((activity) => (
            <div key={activity.id} className="flex cursor-pointer flex-col gap-[16px]" onClick={() => router.push(`/activities/${activity.id}`)}>
              <div className="overflow-hidden rounded-[24px]">
                <Image
                  src={activity.bannerImageUrl}
                  alt="그림"
                  width={168}
                  height={168}
                  style={{ objectFit: 'cover' }}
                  className="aspect-square h-full w-full transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <div className="text-balance">
                <div className="text-m font-medium">
                  ⭐️ {activity.rating} <span className="text-gray-500">({activity.reviewCount})</span>
                </div>
                <div className="mb-[15px] mt-[10px] text-ml font-semibold mobile:text-xl">{activity.title}</div>
                <div className="text-l font-bold mobile:text-2xl">
                  ₩ {activity.price.toLocaleString()}
                  <span className="text-base font-normal text-gray-700 mobile:text-l"> /인</span>
                </div>
              </div>
            </div>
          ))}
        {isError && (
          <div className="flex h-[384px] w-full items-center justify-center text-l font-bold">
            데이터를 불러오는데 실패하였습니다.
            <br />
            다시 시도해주세요.
          </div>
        )}
      </div>
      {data && data.totalCount !== 0 && (
        <div className="flex justify-center">
          <Pagination totalCount={data.totalCount} itemsInPage={fetchSize} visiblePages={5} onPageChange={handlePageChange} currentPage={currentPage} />
        </div>
      )}
    </div>
  );
}
