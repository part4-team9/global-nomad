import type { PropsWithChildren } from 'react';

function CommonLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-[1248px] px-4 mobile:px-6">
      <div className="pb-[136px] pt-6 mobile:pb-[312px] tablet:pb-[344px] tablet:pt-[72px]">{children}</div>
    </div>
  );
}

export default CommonLayout;
