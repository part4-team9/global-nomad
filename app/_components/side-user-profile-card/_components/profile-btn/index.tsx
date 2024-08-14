import React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/_utils/classNames';

export interface ProfileBtnListProps {
  href: string;
  icon: React.ReactNode;
  title: string;
}

interface ProfileActionButtonProps extends ProfileBtnListProps {
  isSelected: boolean;
  onClick: () => void;
}

const ProfileBtnVariants = cva('flex rounded-xl w-full h-11 pl-4 items-center text-base/[26px] font-bold', {
  variants: {
    selectedText: {
      false: 'text-gray-500',
      true: 'bg-green-100 text-nomad-black',
    },
  },
  defaultVariants: {
    selectedText: false,
  },
});

const IconVariants = cva('w-6 h-6', {
  variants: {
    selected: {
      false: 'fill-gray-500',
      true: 'fill-nomad-black',
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export default function ProfileBtn({ icon, title, isSelected, href, onClick }: ProfileActionButtonProps) {
  return (
    <a href={href} aria-label={title} className={cn(ProfileBtnVariants({ selectedText: isSelected }))} onClick={onClick}>
      <div className="flex gap-[14px]">
        <div className={cn(IconVariants({ selected: isSelected }))}>{icon}</div>
        <p>{title}</p>
      </div>
    </a>
  );
}
