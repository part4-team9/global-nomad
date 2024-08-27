'use client';

import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Button from '@/_components/button';

function CallToActionSection() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setStartTyping(true);
      }, 500);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isInView]);

  return (
    <div className="bg-gray-50 py-20">
      <div className="mx-auto max-w-[1248px] px-6 text-center font-bold text-black">
        <div className="grid gap-4">
          <h3
            className="text-2xl tablet:text-3xl"
            style={{
              transform: isInView ? 'none' : 'translateY(10px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.6s ease-in-out',
            }}
          >
            여행에 활력을 더하다,
          </h3>
          {startTyping ? (
            <TypeAnimation
              className="break-all text-5xl leading-none tablet:text-[64px]"
              sequence={['글로벌 노마드', 1500, 'GlobalNomad']}
              speed={20}
              wrapper="h2"
            />
          ) : (
            <div className="break-all text-5xl leading-none text-gray-50 tablet:text-[64px]">글로벌 노마드</div>
          )}
        </div>
        <div className="mb-24 mt-12 flex items-center justify-center">
          <div
            ref={ref}
            onClick={() => router.push('/main')}
            className="w-full max-w-[350px]"
            style={{
              transform: isInView ? 'none' : 'translateY(10px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.6s ease-in-out',
            }}
          >
            <Button variant="white" className="h-12 w-full">
              지금 둘러보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToActionSection;
