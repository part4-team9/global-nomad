import Image from 'next/image';

import type { ContentsType } from '@/_types/card';

import ContentWrapper from './_components/card-contents-wrapper';

interface CardFrameProps<T extends ContentsType> {
  contents: T;
  img: string;
}

export default function CardFrame<T extends ContentsType>({ contents, img }: CardFrameProps<T>) {
  return (
    <div className="group flex h-[204px] w-full cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] tablet:h-[156px] mobile:h-[128px]">
      <div className="relative size-full max-h-[204px] max-w-[204px] overflow-hidden tablet:max-w-[156px] mobile:max-w-[128px]">
        <Image
          src={img}
          alt={`${contents.title} img`}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"
        />
      </div>
      <ContentWrapper contents={contents} />
    </div>
  );
}
