import { useMemo, useState } from 'react';

interface UsePaginationReturn {
  currentPage: number;
  goToNextSet: () => void;
  goToPage: (page: number) => void;
  goToPreviousSet: () => void;
  pageNumbers: number[];
}

const usePagination = (totalPages: number, visiblePages: number, onPageChange: (value: number) => void, initialPage: number = 1): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const goToNextSet = () => {
    const nextPage = Math.ceil(currentPage / visiblePages) * visiblePages + 1;
    if (nextPage <= totalPages) {
      goToPage(nextPage);
    } else {
      goToPage(totalPages);
    }
  };

  const goToPreviousSet = () => {
    const previousPage = Math.floor((currentPage - 1) / visiblePages) * visiblePages;
    if (previousPage >= 1) {
      goToPage(previousPage);
    } else {
      goToPage(1);
    }
  };

  // 현재 페이지 그룹 시작 번호 계산
  const startPage = useMemo(() => Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1, [currentPage, visiblePages]);

  // 현재 페이지 그룹 마지막 번호 계산
  const endPage = useMemo(() => Math.min(startPage + visiblePages - 1, totalPages), [startPage, visiblePages, totalPages]);

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
