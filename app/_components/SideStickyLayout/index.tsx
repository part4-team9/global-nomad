'use client';

import { type PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import useDeviceType from '@/_hooks/useDeviceType';

import SideUserProfileCard from '../SideUserProfileCard';

/**
 * 왼쪽 내정보 사이드 메뉴 고정된 레이아웃
 */
function StickyLayout({ children }: PropsWithChildren) {
  const { isDevice: isPC } = useDeviceType();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex gap-6">
        {isPC && (
          <section className="sticky top-20 h-fit max-w-[384px] flex-1">
            <SideUserProfileCard />
          </section>
        )}

        <section className="flex-1 tablet:min-w-[430px]">{children}</section>
      </div>
    </>
  );
}

export default StickyLayout;
