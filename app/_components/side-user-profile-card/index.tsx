'use client';

import { useState } from 'react';
import Image from 'next/image';
import IconManageMyActivity from 'public/assets/icons/profile-card/manage-my-activity';
import IconMyInfo from 'public/assets/icons/profile-card/my-info';
import IconReservationHistory from 'public/assets/icons/profile-card/reservation-history';
import IconReservationStatus from 'public/assets/icons/profile-card/reservation-status';

import AvatarEditWrapper from './_components/avatar-edit-wrapper';
import type { ProfileBtnListProps } from './_components/profile-btn';
import ProfileBtn from './_components/profile-btn';

const profileActionButtons: ProfileBtnListProps[] = [
  {
    icon: <IconMyInfo />,
    title: '내 정보',
    href: '/my/account',
  },
  {
    icon: <IconReservationHistory />,
    title: '예약 내역',
    href: '/my/reservations',
  },
  {
    icon: <IconManageMyActivity />,
    title: '내 체험 관리',
    href: '#',
  },
  {
    icon: <IconReservationStatus />,
    title: '예약 현황',
    href: '/my/reservation-status',
  },
];

interface SideUserProfileCardProps {
  // TODO API 연동 후 avatarSrc 선택자 제거
  avatarSrc?: string;
}

export default function SideUserProfileCard({ avatarSrc = '/assets/images/default-profile.png' }: SideUserProfileCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex h-[432px] w-full min-w-[215px] flex-col justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_4px_16px_0_rgba(17,34,17,0.05)]">
      <div className="flex justify-center">
        <AvatarEditWrapper avatarSrc={avatarSrc} />
      </div>
      <div className="flex flex-col gap-2">
        {profileActionButtons.map((item, idx) => (
          <ProfileBtn
            key={idx}
            icon={item.icon}
            title={item.title}
            href={item.href}
            isSelected={selectedIndex === idx}
            onClick={() => handleButtonClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
