import Image from 'next/image';
import Link from 'next/link';
import Error from 'public/assets/images/404-error.gif';

import Button from './_components/button';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <Image src={Error} alt="404" priority className="z-0 tablet:max-w-[700px] mobile:max-w-[500px]" />
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="mx-12 text-4xl mobile:text-7xl">Not Found</h2>
        <p className="text-lg font-bold mobile:text-2xl">페이지를 찾을 수 없습니다!</p>
        <Link href="/" className="flex h-[40px] w-full items-center justify-center mobile:h-[50px]">
          <Button variant="black" className="size-full text-2lg tablet:text-2xl mobile:text-xl">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
