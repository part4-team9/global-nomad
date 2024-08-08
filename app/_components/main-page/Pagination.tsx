'use client';

import usePagination from '@/_hooks/activities/usePagination';

import Button from './Button';

interface PaginationProps {
  currentPage: number;
  itemsInPage: number;
  onPageChange: (value: number) => void;
  totalCount: number;
  visiblePages?: number;
}

/**
 * Pagination 컴포넌트 입니다.
 * @param {number} totalCount - 총 데이터의 갯수 입니다.
 * @param {number} itemsInPage - 페이지당 보여지는 아이템의 갯수 입니다.
 * @param {number} visiblePages - 보여질 페이지네이션 버튼의 갯수, 기본값은 5 입니다.
 * @param {function} onPageChange - 현재 페이지 값을 상위 컴포넌트로 보내는 함수 입니다.
 * @param {number} currentPage - 현재 페이지 값 입니다.
 */

export default function Pagination({ totalCount, itemsInPage, visiblePages = 5, onPageChange, currentPage }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsInPage);
  const { pageNumbers, goToPage, goToNextSet, goToPreviousSet } = usePagination(totalPages, visiblePages, onPageChange);

  const canGoToPreviousSet = currentPage > visiblePages;
  const canGoToNextSet = Math.ceil(currentPage / visiblePages) !== Math.ceil(totalPages / visiblePages);

  return (
    <div className="mx-[24px] flex w-full max-w-[1200px] items-center justify-center gap-[10px]">
      <Button
        disabled={!canGoToPreviousSet}
        onClick={canGoToPreviousSet ? goToPreviousSet : undefined}
        border
        btnColor="white"
        textColor={canGoToPreviousSet ? 'nomadBlack' : 'gray'}
        borderColor={canGoToPreviousSet ? 'nomadBlack' : 'gray'}
        className="h-[40px] w-[40px] rounded-[15px] text-ml font-bold mobile:h-[55px] mobile:w-[55px]"
      >
        {'<'}
      </Button>
      {pageNumbers.map((pageNumber) => {
        const isActivePage = currentPage === pageNumber;
        return (
          <Button
            key={pageNumber}
            btnColor={isActivePage ? 'nomadBlack' : 'white'}
            textColor={isActivePage ? 'white' : 'nomadBlack'}
            border={!isActivePage}
            borderColor={isActivePage ? undefined : 'nomadBlack'}
            onClick={() => goToPage(pageNumber)}
            className="h-[40px] w-[40px] rounded-[15px] text-ml font-normal mobile:h-[55px] mobile:w-[55px]"
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        disabled={!canGoToNextSet}
        onClick={canGoToNextSet ? goToNextSet : undefined}
        btnColor="white"
        textColor={canGoToNextSet ? 'nomadBlack' : 'gray'}
        border
        borderColor={canGoToNextSet ? 'nomadBlack' : 'gray'}
        className="h-[40px] w-[40px] rounded-[15px] text-ml font-bold mobile:h-[55px] mobile:w-[55px]"
      >
        {'>'}
      </Button>
    </div>
  );
}
