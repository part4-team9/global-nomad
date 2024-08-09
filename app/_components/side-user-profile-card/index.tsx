import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { cn } from '@/_utils/classNames';

const profileActionButtons: ProfileActionButtonProps[] = [
  {
    icon: <div />,
    title: '내 정보',
  },
  {
    icon: <div />,
    title: '예약 내역',
  },
  {
    icon: <div />,
    title: '내 체험 관리',
  },
  {
    icon: <div />,
    title: '예약 현황',
  },
];

export default function SideUserProfileCard() {
  return (
    <div className="flex h-[432px] w-full min-w-[215px] max-w-[384px] flex-col justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_4px_16px_0_rgba(17,34,17,0.05)]">
      <div className="flex justify-center">
        <AvatarEditWrapper />
      </div>
      <div className="flex flex-col gap-2">
        {profileActionButtons.map((item, idx) => (
          <ProfileBtn key={idx} icon={item.icon} title={item.title} />
        ))}
      </div>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="h-[160px] w-[160px] overflow-hidden rounded-[50%] bg-slate-200">
      <Image src="" alt="" layout="fill" objectFit="cover" />
    </div>
  );
}

function EditButton() {
  return (
    <button type="button" className="h-11 w-11 rounded-[50%] bg-green-200" aria-label="Edit">
      <Image src="" alt="" />
    </button>
  );
}

function AvatarEditWrapper() {
  return (
    <div className="flex h-[160px] w-[160px] cursor-pointer items-end justify-end">
      <div className="absolute mr-[12.5px]">
        <EditButton />
      </div>
      <UserAvatar />
    </div>
  );
}

interface ProfileActionButtonProps {
  icon: React.ReactNode;
  title: string;
}

const ProfileBtnVariants = cva('flex rounded-xl w-full h-11 pl-4 items-center', {
  variants: {
    selected: {
      false: 'text-gray-500',
      true: 'bg-green-100 text-nomad-black',
    },
  },
  defaultVariants: {
    selected: true,
  },
});

function ProfileBtn({ icon, title }: ProfileActionButtonProps) {
  const isSelected = true;
  return (
    <button type="button" aria-label={title} className={cn(ProfileBtnVariants({ selected: isSelected }))}>
      <div>
        {icon}
        <p>{title}</p>
      </div>
    </button>
  );
}
