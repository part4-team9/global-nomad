import type { ReactNode } from 'react';

export default function ActivitiyLayout({ children }: { children: ReactNode }) {
  return <main className="box-border flex w-full min-w-full flex-col content-center items-center">{children}</main>;
}
