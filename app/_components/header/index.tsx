import Image from 'next/image';
import Link from 'next/link';
import { HeaderNotLogin } from './_component/header-not-login';
import HeaderLogin from './_component/header-login';
import logoWithTitle from 'public/assets/icons/logo-with-title.svg';

export default async function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 bg-white shadow-sm w-full">
      <section className="flex justify-between h-[70px] px-6 pb-[10px] pt-[15px] lg:max-w-[1200px] mx-auto content-center">
        <Link href="#" className="relative h-[28px] w-auto">
          <Image src={logoWithTitle} alt="Logo"/>
        </Link>
        <nav className="">
          {true ? <HeaderNotLogin /> : <HeaderLogin />}
          {/* 이후 로그인 작업시 상태에 따라 비로그인/로그인 구분 */}
        </nav>
      </section>
    </header>
  );
}
