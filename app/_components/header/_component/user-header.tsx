import Image from 'next/image';
import defaultProfileImg from 'public/assets/images/default-profile.png';
import useUserStore from '@/store/useUserStore';

import alarm from 'public/assets/icons/alarm.svg';
import ArrowDown from 'public/assets/icons/arrow-down.svg';

export default function UserHeader() {
  const { user } = useUserStore((state) => state);

  return (
      <div className="flex text-m">
        <div className="my-[7px] border-r-[1px] border-gray-200 pr-3 md:pr-[25px]">
          <Image src={alarm} alt="alarm" />
        </div>
        <div className="ml-3 flex items-center justify-between gap-[10px] md:ml-[25px]">
          <div className="h-8 w-8 overflow-hidden rounded-full">
          <Image src={user?.user.profileImageUrl || defaultProfileImg} alt="profile image" width={32} height={32} />
          </div>
          <div>{user?.user.nickname || "user"}</div>
          <div className="h-4 w-4">
            <Image src={ArrowDown} alt="dropdown arrow" />
          </div>
        </div>
      </div>
  );
}
