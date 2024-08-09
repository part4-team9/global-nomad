import Image from 'next/image';

import type { ContentsType } from '@/_types/card';

import ContentWrapper from './_components/card-contents-wrapper';

interface CardFrameProps<T extends ContentsType> {
  contents: T;
  img: string;
}

export default function CardFrame<T extends ContentsType>({ contents, img }: CardFrameProps<T>) {
  return (
    <div className="flex h-[204px] w-full cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:h-[128px] tablet:h-[156px]">
      <div className="relative h-full max-h-[204px] w-full max-w-[204px] mobile:max-w-[128px] tablet:max-w-[156px]">
        <Image src={img} alt={`${contents.title} img`} layout="fill" objectFit="cover" />
      </div>
      <ContentWrapper contents={contents} />
    </div>
  );
}
