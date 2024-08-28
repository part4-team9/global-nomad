import React from 'react';
import { cva } from 'class-variance-authority';
import Link from 'next/link';

import { cn } from '@/_utils/classNames';

export interface ProfileButtonListProps {
  href: string;
  icon: React.ReactNode;
  title: string;
}

interface ProfileActionButtonProps extends ProfileButtonListProps {
  isSelected: boolean;
}

const ProfileButtonVariants = cva('flex h-11 w-full items-center rounded-xl pl-4 text-base/[26px] font-bold', {
  variants: {
    selectedText: {
      false: 'text-gray-500',
      true: 'text-nomad-black bg-green-100',
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

export default function ProfileButton({ icon, title, isSelected, href }: ProfileActionButtonProps) {
  return (
    <Link href={href} aria-label={title} className={cn(ProfileButtonVariants({ selectedText: isSelected }))}>
      <div className="flex gap-[14px]">
        <div className={cn(IconVariants({ selected: isSelected }))}>{icon}</div>
        <p>{title}</p>
      </div>
    </Link>
  );
}
