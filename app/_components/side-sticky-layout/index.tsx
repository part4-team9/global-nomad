'use client';

import type { PropsWithChildren } from 'react';

import useDeviceType from '@/_hooks/useDeviceType';

import SideUserProfileCard from '../side-user-profile-card';

/**
 * 왼쪽 내정보 사이드 메뉴 고정된 레이아웃
 */
function StickyLayout({ children }: PropsWithChildren) {
  const { isDevice: isPC, isLoading } = useDeviceType();

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
        isPC && (
          <section className="sticky top-20 h-fit max-w-[384px] flex-1">
            <SideUserProfileCard />
          </section>
        )
      )}
      <section className="min-w-[430px] flex-1">{children}</section>
    </div>
  );
}

export default StickyLayout;
