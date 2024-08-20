/* eslint-disable @typescript-eslint/no-unsafe-call */

'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/_components/button';

import Logo from 'public/assets/icons/green-title-logo.svg';
import MobilePreview from 'public/assets/icons/mockup.svg';

function IntroduceService() {
  const ref1 = useRef<HTMLDivElement>(null);
  const isInView1 = useInView(ref1, { once: true });

  const ref2 = useRef<HTMLDivElement>(null);
  const isInView2 = useInView(ref2, { once: true });

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex max-w-[1248px] items-center justify-between gap-5 px-6">
        <div
          ref={ref1}
          style={{
            transform: isInView1 ? 'none' : 'translateY(20px)',
            opacity: isInView1 ? 1 : 0,
            transition: 'all 0.9s ease-in-out 0.2s',
          }}
        >
          <Image src={MobilePreview} alt="모바일 프리뷰" priority />
        </div>
        <div
          ref={ref2}
          className="grid gap-10"
          style={{
            transform: isInView2 ? 'none' : 'translateX(20px)',
            opacity: isInView2 ? 1 : 0,
            transition: 'all 0.9s ease-in-out 0.4s',
          }}
        >
          <div className="grid gap-4">
            <div>
              <Image src={Logo} alt="GlobalNomad" priority />
              <span className="text-2xl font-bold">는 당신의 여행을 더 특별하게 만들어 드립니다</span>
            </div>
            <p className="grid gap-2">
              <span className="font-semibold">☝🏻 단조로운 일상에서 벗어나 활기찬 모험을 찾는 분</span>
              <span className="font-semibold">✌🏻 자유로운 여행 속에서 예상치 못한 즐거움을 발견하고 싶은 분</span>
            </p>
            <span className="text-xl font-bold">
              아무 계획 없이 떠난 여행에서도
              <br />
              최고의 하루를 보낼 수 있도록
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/main">
              <Button variant="white" className="h-12 w-36 border-none">
                둘러보기
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="white" className="h-12 w-36 border-none">
                가입하러 가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroduceService;
