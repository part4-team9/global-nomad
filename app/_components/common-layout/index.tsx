import type { PropsWithChildren } from 'react';

interface CommonLayoutProps extends PropsWithChildren {
  className?: string;
}

function CommonLayout({ children, className }: CommonLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[1248px] px-4 mobile:px-6">
      <div className={`commonLayoutWrap ${className}`}>{children}</div>
    </div>
  );
}

export default CommonLayout;
