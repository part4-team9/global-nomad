'use client';

import Image from 'next/image';
import Link from 'next/link';

import GuestHeader from './_component/GuestHeader';
import UserHeader from './_component/UserHeader';

import logoWithTitle from 'public/assets/icons/logo-with-title.svg';

export default function Header({ isLogIn }: { isLogIn: boolean }) {

  return (
    <header className="fixed left-0 right-0 top-0 md:px-[24px] z-30 w-full bg-white shadow-sm">
      <section className="mx-auto flex h-[70px] items-center justify-between px-6 py-[21px] lg:max-w-[1200px] lg:px-0">
        <Link href="/" className="relative h-[28px] w-auto">
          <Image src={logoWithTitle} alt="Logo" priority/>
        </Link>
        <nav>{isLogIn ? <UserHeader /> : <GuestHeader />}</nav>
      </section>
    </header>
  );
}
