import Image from 'next/image';
import Link from 'next/link';

import logoBig from 'public/assets/icons/logo_big.svg';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 top-3 z-50 w-full bg-white">
      <div className="base-container flex justify-center pb-4">
        <section className="flex w-full max-w-[640px] mt-10 md:mt-[72px] lg:mt-[104px] flex-col items-center px-[1px]">
          <Link href="/" className="mb-6 md:mb-10 w-[270px] md:w-[340px]">
            <Image src={logoBig} alt="GlobalNomad로고" priority />
          </Link>
          {children}
        </section>
      </div>
    </div>
  );
}
