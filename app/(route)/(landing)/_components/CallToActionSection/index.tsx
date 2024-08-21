'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';

import Button from '@/_components/button';

function CallToActionSection() {
  const ref = useRef<HTMLAnchorElement>(null);
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
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-[1248px] px-6 text-center font-bold text-black">
        <div className="grid gap-4">
          <h3
            className="text-2xl tablet:text-4xl"
            style={{
              transform: isInView ? 'none' : 'translateY(10px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.6s ease-in-out',
            }}
          >
            여행에 활력을 더하다,
          </h3>
          {startTyping ? (
            <div className="text-5xl leading-none tablet:text-[64px]">
              <TypewriterComponent
                options={{
                  strings: ['글로벌 노마드'],
                  // cursor: '',
                  autoStart: !!isInView,
                  delay: 100,
                  loop: false,
                  deleteSpeed: Infinity,
                }}
              />
            </div>
          ) : (
            <div className="text-5xl leading-none text-gray-50 tablet:text-[64px]">글로벌 노마드</div>
          )}
        </div>
        <div className="mt-12 flex items-center justify-center">
          <Link
            ref={ref}
            href="/main"
            style={{
              transform: isInView ? 'none' : 'translateY(10px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.6s ease-in-out',
            }}
          >
            <Button variant="white" className="h-12 w-[350px]">
              지금 둘러보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CallToActionSection;
