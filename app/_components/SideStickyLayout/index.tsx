'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useUserProfileStore } from '@/_stores/useUserInfoState';
import useDeviceType from '@/_hooks/useDeviceType';

import { getUserProfile } from '@/_libs/userService';

import SideUserProfileCard from '../side-user-profile-card';

/**
 * 왼쪽 내정보 사이드 메뉴 고정된 레이아웃
 */
function StickyLayout({ children }: PropsWithChildren) {
  const { isDevice: isPC, isLoading } = useDeviceType();

  const { userProfile, setUserProfile } = useUserProfileStore();
  const DEFAULT_AVATAR = '/assets/images/default-profile.png';

  const { data: UserProfileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (UserProfileData) {
      setUserProfile(() => UserProfileData);
    }
  }, [UserProfileData, setUserProfile]);

  return (
    <div className="flex gap-6">
      {isLoading ? (
        <section className="sticky top-20 hidden h-fit max-w-[384px] flex-1 rounded-xl bg-slate-300 p-6 tablet:block">
          {/* TODO 스켈레톤 ui 적용 필요 */}
          <div className="animate-pulse">
            <div className="h-6 rounded bg-gray-300" />
          </div>
        </section>
      ) : (
        isPC && (
          <section className="sticky top-20 h-fit max-w-[384px] flex-1">
            <SideUserProfileCard avatarSrc={userProfile?.profileImageUrl ?? DEFAULT_AVATAR} />
          </section>
        )
      )}
      <section className="flex-1 tablet:min-w-[430px]">{children}</section>
    </div>
  );
}

export default StickyLayout;
