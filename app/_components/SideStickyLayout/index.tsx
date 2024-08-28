'use client';

import { type PropsWithChildren } from 'react';

import useDeviceType from '@/_hooks/useDeviceType';

import SideUserProfileCard from '../SideUserProfileCard';

/**
 * 왼쪽 내정보 사이드 메뉴 고정된 레이아웃
 */
function StickyLayout({ children }: PropsWithChildren) {
  const { isDevice: isPC, isLoading } = useDeviceType();

  return (
    <div className="flex gap-6">
      {isPC && (
        <section className="sticky top-20 h-fit max-w-[384px] flex-1">
          <SideUserProfileCard isLoading={isLoading} />
        </section>
      )}

      <section className="flex-1 tablet:min-w-[430px]">{children}</section>
    </div>
  );
}

export default StickyLayout;
