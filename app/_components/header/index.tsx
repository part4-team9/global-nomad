'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Response } from '@/_apis/type';
import useUserStore from '@/store/useUserStore';

import GuestHeader from './_component/guest-header';
import UserHeader from './_component/user-header';

import logoWithTitle from 'public/assets/icons/logo-with-title.svg';

export default function Header() {
  const { isLoggedIn, setLoginStatus } = useUserStore((state) => state);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedUser && storedIsLoggedIn) {
      setLoginStatus(true, JSON.parse(storedUser) as Response);
    }
  }, [setLoginStatus]);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 w-full bg-white shadow-sm">
      <section className="mx-auto flex h-[70px] items-center justify-between px-6 py-[21px] lg:max-w-[1200px] lg:px-0">
        <Link href="/main" className="relative h-[28px] w-auto">
          <Image src={logoWithTitle} alt="Logo" />
        </Link>
        <nav className="">{isLoggedIn ? <UserHeader /> : <GuestHeader />}</nav>
      </section>
    </header>
  );
}
