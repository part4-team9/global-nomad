import Image from 'next/image';

import type { ContentsType } from '@/_types/card';

import ContentWrapper from './_components/card-contents-wrapper';

interface CardFrameProps<T extends ContentsType> {
  contents: T;
  img: string;
}

export default function CardFrame<T extends ContentsType>({ contents, img }: CardFrameProps<T>) {
  return (
    <div className="under-tablet:h-[156px] under-mobile:h-[128px] group flex h-[204px] w-full cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)]">
      <div className="under-tablet:max-w-[156px] under-mobile:max-w-[128px] relative size-full max-h-[204px] max-w-[204px] overflow-hidden">
        <Image
          src={img}
          alt={`${contents.title} img`}
          fill
          sizes="max-width:100%"
          style={{ objectFit: 'cover' }}
          className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"
        />
      </div>
      <ContentWrapper contents={contents} />
    </div>
  );
}
