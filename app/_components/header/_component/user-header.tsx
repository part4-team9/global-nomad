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
    <div className="flex items-center text-m">
      <div className="border-r-[1px] border-gray-200 pr-3 md:pr-[25px]">
        <Image src={alarm} alt="alarm" />
      </div>
      <div className="ml-3 flex items-center justify-between gap-[10px] md:ml-[25px]" onClick={toggleDropdown} ref={dropdownRef}>
        <div className="h-8 w-8 overflow-hidden rounded-full cursor-pointer">
          <Image src={user?.user.profileImageUrl || defaultProfileImg} alt="profile image" width={32} height={32}/>
        </div>
        <div className="relative flex items-center gap-1">
          <div className="cursor-pointer">
            {user?.user.nickname || 'user'}
          </div>
          <div className="h-4 w-4 cursor-pointer" >
            <Image src={ArrowDown} alt="dropdown arrow" className={`duration-500 ${showList ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          {showList && <HeaderDropdown />}
        </div>
      </div>
    </div>
  );
}
