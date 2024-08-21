'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import Logo from 'public/assets/icons/landing/logo-big-white.svg';

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section>
      <div className="relative flex h-[calc(100dvh-70px)] w-full items-center justify-center bg-gray-50">
        <video muted autoPlay loop className="absolute size-full object-cover">
          <source src="/assets/video/main-video.mp4" />
        </video>
        <div className="absolute size-full bg-[rgba(0,0,0,0.4)]" />
        <div ref={ref} className="z-[1]">
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
            <motion.p
              style={{
                transform: isInView ? 'scale(0.97)' : 'none',
                opacity: isInView ? 0 : 1,
                transition: 'all 0.4s ease-in-out 0.5s',
              }}
              className="grid gap-2 break-keep px-6 text-center text-3xl font-semibold text-white tablet:text-5xl"
            >
              <span>당신의 여정이</span>
              <span className="leading-[1.2]">매 순간 즐거울 수 있도록</span>
            </motion.p>
          </div>
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center px-12">
            <Image
              src={Logo}
              alt="GlobalNomad"
              priority
              style={{
                transform: isInView ? 'none' : 'scale(0.97)',
                opacity: isInView ? 1 : 0,
                transition: 'all 1s ease-in-out 1.2s',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
