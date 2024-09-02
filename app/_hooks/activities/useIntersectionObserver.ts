'use client';

import { useEffect, useState } from 'react';
import type { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface UseIntersectionObserverProps {
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean | undefined;
  threshold?: number;
}

export const useIntersectionObserver = ({ threshold = 0.1, hasNextPage, fetchNextPage }: UseIntersectionObserverProps) => {
  // 관찰할 타겟을 지정합니다. 스크롤 최하단 div요소에 setTarget을 ref속성에 넘겨줍니다.
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          void fetchNextPage();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(target);

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(target);
  }, [threshold, target, hasNextPage, fetchNextPage]);

  return { setTarget };
};
