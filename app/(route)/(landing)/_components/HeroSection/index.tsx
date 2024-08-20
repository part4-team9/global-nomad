'use client';

import Image from 'next/image';

import TransitionBox from '../TransitionBox';

import Logo from 'public/assets/icons/logo-big-white.svg';

const ELEMENT_ARRAY: React.ReactNode[] = [
  <div key={1} className="px-12">
    <Image src={Logo} alt="GlobalNomad" />
  </div>,
  <p key={2} className="grid break-keep px-6 text-center text-3xl font-semibold text-white tablet:text-5xl">
    <span className="leading-[1.2]">당신의 여정이</span>
    <span className="leading-[1.2]">매 순간 즐거울 수 있도록</span>
  </p>,
  <p key={3} className="grid break-keep px-6 text-center font-semibold text-white">
    <span className="text-2xl leading-[1.2] tablet:text-4xl">여행에 활력을 더하다,</span>
    <span className="text-4xl leading-[1.2] tablet:text-[64px]">글로벌 노마드</span>
  </p>,
];

function HeroSection() {
  return (
    <section>
      <div className="relative flex h-[calc(100dvh-70px)] w-full items-center justify-center bg-gray-50">
        <video muted autoPlay loop className="absolute size-full object-cover">
          <source src="/assets/video/main-video.mp4" />
        </video>
        <div className="absolute size-full bg-[rgba(0,0,0,0.4)]" />
        <div className="relative z-[1]">
          <div key={1} className="px-12">
            <Image src={Logo} alt="GlobalNomad" />
          </div>
        </div>
        {/* <TransitionBox /> */}
      </div>
    </section>
  );
}

export default HeroSection;
