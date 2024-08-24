import { useRef, useState } from 'react';
import Image from 'next/image';
import defaultProfileImg from 'public/assets/images/default-profile.png';
import useUserStore from '@/store/useUserStore';

import useBackgroundClick from '@/_hooks/useBackgroundClick';

import HeaderDropdown from './header-dropdown';

import alarm from 'public/assets/icons/alarm.svg';
import ArrowDown from 'public/assets/icons/arrow-down.svg';

export default function UserHeader() {
  const { user } = useUserStore((state) => state);
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowList((prev) => !prev);
  };

  useBackgroundClick({
    ref: dropdownRef,
    handler: () => setShowList(false),
  });

  return (
    <div className="flex items-center text-md">
      <div className="border-r border-gray-200 pr-3 md:pr-[25px]">
        <Image src={alarm} alt="alarm" />
      </div>
      <div className="ml-3 flex items-center justify-between gap-[10px] md:ml-[25px]" onClick={toggleDropdown} ref={dropdownRef}>
        <div className="size-8 cursor-pointer overflow-hidden rounded-full">
          <Image src={user?.image || user?.user.profileImageUrl || defaultProfileImg} alt="profile image" width={32} height={32} />
        </div>
        <div className="relative flex items-center gap-1">
          <div className="cursor-pointer">{user?.name || user?.user.nickname || 'user'}</div>
          <div className="size-4 cursor-pointer">
            <Image src={ArrowDown} alt="dropdown arrow" className={`duration-500 ${showList ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          {showList && <HeaderDropdown />}
        </div>
      </div>
    </div>
  );
}
