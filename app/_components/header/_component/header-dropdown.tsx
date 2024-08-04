import Link from 'next/link';

import LogoutButton from './logout';

export default function HeaderDropdown() {
  return (
    <div className="absolute right-0 top-[44px] flex h-[80px] w-[120px] flex-col items-center justify-center rounded-lg border bg-white">
      <Link href="/my" className="w-full border-b py-2 text-center">
        마이페이지
      </Link>
      <LogoutButton />
    </div>
  );
}
