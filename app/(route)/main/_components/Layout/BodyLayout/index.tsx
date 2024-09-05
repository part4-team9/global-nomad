import type { ReactNode } from 'react';

export default function BodyLayout({ children }: { children: ReactNode }) {
  return <div className="relative bottom-[20px] mx-auto w-full px-[16px] lg:max-w-[1200px] mobile:bottom-[20px] mobile:px-[24px]">{children}</div>;
}
