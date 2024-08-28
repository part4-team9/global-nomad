import Image from 'next/image';

import { cn } from '@/_utils/classNames';

function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-spin dark:bg-slate-800', className)} {...props}>
      <Image src="/assets/icons/loader-circle.svg" alt="loader" width={24} height={24} />
    </div>
  );
}

export { Spinner };
