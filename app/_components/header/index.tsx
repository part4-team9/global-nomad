'use client';

import Image from 'next/image';
import Link from 'next/link';

import useCheckLoginStatus from '@/_hooks/use-is-login';

import GuestHeader from './_component/guest-header';
import UserHeader from './_component/user-header';

import logoWithTitle from 'public/assets/icons/logo-with-title.svg';

export default function Header() {
  const { isLoggedIn } = useCheckLoginStatus();

  return (
    <header className="fixed left-0 right-0 top-0 z-30 w-full bg-white shadow-sm">
      <section className="mx-auto flex h-[70px] content-center justify-between px-6 py-[21px] lg:max-w-[1200px]">
        <Link href="/main" className="relative h-[28px] w-auto">
          <Image src={logoWithTitle} alt="Logo" />
        </Link>
        <nav className="">
        {isLoggedIn ? <UserHeader /> : <GuestHeader />}
        </nav>
      </section>
    </header>
  );
}
