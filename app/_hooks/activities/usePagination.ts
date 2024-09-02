import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';

interface UsePaginationReturn {
  currentPage: number;
  goToNextSet: () => void;
  goToPage: (page: number) => void;
  goToPreviousSet: () => void;
  pageNumbers: number[];
}

const usePagination = (totalPages: number, currentPage: number, setCurrentPage: Dispatch<SetStateAction<number>>): UsePaginationReturn => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextSet = () => {
    const nextPage = Math.ceil(currentPage / 5) * 5 + 1;
    if (nextPage <= totalPages) {
      goToPage(nextPage);
    } else {
      goToPage(totalPages);
    }
  };

  const goToPreviousSet = () => {
    const previousPage = Math.floor((currentPage - 1) / 5) * 5;
    if (previousPage >= 1) {
      goToPage(previousPage);
    } else {
      goToPage(1);
    }
  };

  // 현재 페이지 그룹 시작 번호 계산
  const startPage = useMemo(() => Math.floor((currentPage - 1) / 5) * 5 + 1, [currentPage]);

  // 현재 페이지 그룹 마지막 번호 계산
  const endPage = useMemo(() => Math.min(startPage + 4, totalPages), [startPage, totalPages]);

  // 페이지 번호 배열 계산
  const pageNumbers = useMemo(() => Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i), [startPage, endPage]);

  return {
    currentPage,
    pageNumbers,
    goToPage,
    goToNextSet,
    goToPreviousSet,
  };
};

export default usePagination;
