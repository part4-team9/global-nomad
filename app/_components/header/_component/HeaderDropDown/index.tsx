import { useEffect, useState } from 'react';
import Link from 'next/link';

import LogoutButton from '../LogoutButton';

export default function HeaderDropdown() {
  const [linkPath, setLinkPath] = useState('/my');

  useEffect(() => {
    const updateLinkPath = () => {
      if (window.innerWidth > 768) {
        setLinkPath('/my');
      } else {
        setLinkPath('/my/account');
      }
    };
    updateLinkPath();
    window.addEventListener('resize', updateLinkPath);
    return () => {
      window.removeEventListener('resize', updateLinkPath);
    };
  }, []);

  return (
    <div className="absolute right-0 top-[44px] flex h-[80px] w-[120px] flex-col items-center justify-center rounded-lg border bg-white">
      <Link href={linkPath} className="w-full border-b py-2 text-center">
        마이페이지
      </Link>
      <LogoutButton />
    </div>
  );
}
