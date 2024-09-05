import type { ReactNode } from 'react';

export default function MainPageLayout({ children }: { children: ReactNode }) {
  return <main className="box-border flex w-full min-w-full flex-col content-center items-center">{children}</main>;
}
