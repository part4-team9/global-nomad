'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MobilePreview2 from 'public/assets/images/service-mockup.png';

import useWindowSize from '@/_hooks/useWindowSize';

import Button from '@/_components/button';

function IntroduceService() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const windowSize = useWindowSize();

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex max-w-[1248px] flex-col-reverse items-center justify-between gap-5 px-6 py-8 tablet:flex-row">
        {windowSize > 768 && (
          <div className="pl-7">
            <Image src={MobilePreview2} alt="모바일 프리뷰" priority />
          </div>
        )}
        <div
          className="flex w-full flex-col justify-between gap-10 py-20 tablet:w-auto"
          style={{
            transform: isInView ? 'none' : 'translateX(10px)',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.9s ease-in-out 0.4s',
          }}
        >
          <div ref={ref} className="grid gap-4">
            <h2 className="break-keep text-3xl font-bold leading-[1.2] tablet:text-5xl">당신의 여행을 더 특별하게</h2>
            <p className="grid gap-2">
              <span className="text-gray-600">· 단조로운 일상에서 벗어나 활기찬 모험을 찾는 분</span>
              <span className="text-gray-600">· 자유로운 여행 속에서 예상치 못한 즐거움을 발견하고 싶은 분</span>
              <span className="text-gray-600">· 새로운 장소에서 색다른 체험을 통해 잊지 못할 추억을 만들고 싶은 분</span>
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3">
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
