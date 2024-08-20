import Image from 'next/image';
import Link from 'next/link';
import Error from 'public/assets/images/404-error.gif';

import Button from './_components/button';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <Image src={Error} alt="404" width={700} height={700} priority className="z-0 mb-8 mobile:max-w-[500px] tablet:max-w-[700px]" />
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="mx-12 text-4xl mobile:text-7xl">Not Found</h1>
        <p className="text-lg font-bold mobile:text-2xl">페이지를 찾을 수 없습니다!</p>
        <Link href="/" className="flex h-[40px] w-full items-center justify-center mobile:h-[50px]">
          <Button variant="black" className="size-full text-2lg mobile:text-xl tablet:text-2xl">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
