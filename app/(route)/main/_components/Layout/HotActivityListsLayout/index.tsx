import type { ReactNode } from 'react';

export default function HotActivityListsLayout({ children }: { children: ReactNode }) {
  return <div className="relative flex flex-col py-0 font-bold mobile:py-2">{children}</div>;
}
