'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/_components/button';

import Logo from 'public/assets/icons/banner-logo.svg';

function MainBanner() {
  return (
    <section
      className="relative bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url('/assets/images/main-banner.png')] bg-cover bg-no-repeat pb-20 pt-[120px] tablet:pb-[90px] tablet:pt-[200px]"
      style={{ backgroundPosition: 'center' }}
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 1 }}
        className="z-[1] mx-auto grid max-w-[1248px] gap-10 px-6 tablet:gap-20"
      >
        <div className="mobile:max-w-[80%]">
          <Image src={Logo} alt="GlobalNomad" />
        </div>
        <p className="grid gap-5 break-keep text-white">
          <span className="text-2xl font-medium leading-[1.2] tablet:text-[40px]">당신의 여정이 매 순간 즐거울 수 있도록</span>
          <span className="text-lg font-medium leading-normal tablet:text-[27px]">여행에 활력을 더하다, 글로벌 노마드</span>
        </p>
        <div className="flex flex-wrap gap-5 tablet:mt-[100px]">
          <Link href="/main">
            <Button variant="white" className="h-12 w-36 border-none bg-[rgba(255,255,255,0.8)]">
              둘러보기
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="white" className="h-12 w-36 border-none bg-[rgba(255,255,255,0.8)]">
              가입하러 가기
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default MainBanner;
