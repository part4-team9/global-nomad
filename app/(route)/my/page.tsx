'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useWindowSize from '@/_hooks/useWindowSize';

import CommonLayout from '@/_components/common-layout';
import SideUserProfileCard from '@/_components/side-user-profile-card';

/**
 * my
 *
 * 태블릿 이하 크기(768px 이하)에서는 사이드 유저 프로필 카드를 렌더링합니다.
 * 화면 크기가 태블릿을 넘어설 경우(768px 초과) 사용자를 '내 정보 수정' 페이지('/my/account/confirm')로 리디렉션합니다.
 */
export default function MyPage() {
  const router = useRouter();
  const windowSize = useWindowSize();
  const isMobile = windowSize <= 768;

  useEffect(() => {
    if (!isMobile) {
      router.push('/my/account');
    }
  }, [router, isMobile]);

  return <CommonLayout>{isMobile && <SideUserProfileCard />}</CommonLayout>;
}
