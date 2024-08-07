'use client';

import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import useWindowSize from '@/_hooks/useWindowSize';

/**
 * 왼쪽 내정보 사이드 메뉴 고정된 레이아웃
 */
function StickyLayout({ children }: PropsWithChildren) {
  const windowSize = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (windowSize !== null) {
      setIsLoading(false);
    }
  }, [windowSize]);

  const isPC = windowSize > 768;

  return (
    <div className="flex gap-6">
      {isLoading ? (
        <section className="sticky top-20 hidden h-fit max-w-[384px] flex-1 rounded-xl bg-slate-300 p-6 tablet:block">
          {/* 스켈레톤 UI */}
          <div className="animate-pulse">
            <div className="h-6 rounded bg-gray-300" />
          </div>
        </section>
      ) : (
        isPC && <section className="sticky top-20 h-fit max-w-[384px] flex-1 rounded-xl bg-slate-300 p-6">사이드 스티키 메뉴</section>
      )}
      <section className="flex-1 tablet:min-w-[430px]">{children}</section>
    </div>
  );
}

export default StickyLayout;
