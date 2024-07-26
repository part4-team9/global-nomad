import Image from 'next/image';
import Link from 'next/link';
import { HeaderNotLogin } from './_component/header-not-login';
import HeaderLogin from './_component/header-login';
import logoWithTitle from 'public/assets/icons/logo-with-title.svg';

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 w-full bg-white shadow-sm">
      <section className="mx-auto flex h-[70px] content-center justify-between px-6 py-[21px] lg:max-w-[1200px]">
        <Link href="#" className="relative h-[28px] w-auto">
          <Image src={logoWithTitle} alt="Logo" />
        </Link>
        <nav className="">
          {true ? <HeaderNotLogin /> : <HeaderLogin />}
          {/* 이후 로그인 작업시 상태에 따라 비로그인/로그인 구분 */}
        </nav>
      </section>
    </header>
  );
}
