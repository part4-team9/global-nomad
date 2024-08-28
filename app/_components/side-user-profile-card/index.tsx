'use client';

import { useState } from 'react';
import IconManageMyActivity from 'public/assets/icons/profile-card/manage-my-activity';
import IconMyInfo from 'public/assets/icons/profile-card/my-info';
import IconReservationHistory from 'public/assets/icons/profile-card/reservation-history';
import IconReservationStatus from 'public/assets/icons/profile-card/reservation-status';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useModal } from '@/_hooks/useModal';

import { generateProfileImageURl, patchUserProfile } from '@/_libs/userService';
import { convertURLtoFile } from '@/_utils/convertURLtoFile';

import AvatarEditBtnWrapper from './_components/AvatarEditBtnWrapper';
import ChangeProfileImageModal from './_components/ChangeProfileImageModal';
import type { ProfileButtonListProps } from './_components/ProfileButton';
import ProfileBtn from './_components/ProfileButton';

const profileActionButtons: ProfileButtonListProps[] = [
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
  avatarSrc: string;
}

export default function SideUserProfileCard({ avatarSrc }: SideUserProfileCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentAvatarSrc, setCurrentAvatarSrc] = useState<string>(avatarSrc);

  const { isOpen, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const DEFAULT_AVATAR = '/assets/images/default-profile.png';

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
  };

  const { mutate: uploadImage } = useMutation<string, Error, File>({
    mutationFn: generateProfileImageURl,
    onSuccess: async (profileImageUrl: string) => {
      setCurrentAvatarSrc(profileImageUrl);
      try {
        // 프로필 이미지 URL로 사용자 프로필 업데이트
        await patchUserProfile({ profileImageUrl });
        await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      } catch (err) {
        console.error('Error updating user profile:', err);
      }
    },
    onError: (error: Error) => {
      console.error('Image upload failed:', error.message);
    },
  } satisfies UseMutationOptions<string, Error, File, unknown>);

  const handleImageUpload = (file: File) => {
    uploadImage(file);
  };

  const handleImageDelete = async () => {
    const file = await convertURLtoFile(DEFAULT_AVATAR);
    uploadImage(file);
  };

  return (
    <>
      <ChangeProfileImageModal
        isOpen={isOpen}
        onClose={closeModal}
        currentProfileImage={currentAvatarSrc}
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
      />
      <div className="flex h-[432px] w-full min-w-[215px] flex-col justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_4px_16px_0_rgba(17,34,17,0.05)]">
        <div className="flex justify-center">
          <AvatarEditBtnWrapper avatarSrc={currentAvatarSrc} onClick={openModal} />
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
    </>
  );
}
