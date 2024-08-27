import React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/_utils/classNames';

export interface ProfileButtonListProps {
  href: string;
  icon: React.ReactNode;
  title: string;
}

interface ProfileActionButtonProps extends ProfileButtonListProps {
  isSelected: boolean;
  onClick: () => void;
}

const ProfileButtonVariants = cva('flex h-11 w-full items-center rounded-xl pl-4 text-base/[26px] font-bold', {
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

const IconVariants = cva('size-6', {
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

export default function ProfileButton({ icon, title, isSelected, href, onClick }: ProfileActionButtonProps) {
  return (
    <a href={href} aria-label={title} className={cn(ProfileButtonVariants({ selectedText: isSelected }))} onClick={onClick}>
      <div className="flex gap-[14px]">
        <div className={cn(IconVariants({ selected: isSelected }))}>{icon}</div>
        <p>{title}</p>
      </div>
    </a>
  );
}
