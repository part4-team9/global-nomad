import type { PropsWithChildren } from 'react';

interface CommonLayoutProps extends PropsWithChildren {
  className?: string;
}

function CommonLayout({ children, className }: CommonLayoutProps) {
  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto w-full max-w-[1248px] px-4 mobile:px-6">
        <div className={`commonLayoutWrap ${className}`}>{children}</div>
      </div>
    </div>
  );
}

export default CommonLayout;
