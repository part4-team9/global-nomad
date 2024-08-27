'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PhotoCardProps {
  image: string;
  title: string;
}

function PhotoCard({ image, title }: PhotoCardProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative size-[200px] overflow-hidden rounded-[30px] tablet:size-[300px]"
    >
      <Image src={image} alt={title} fill sizes="max-width:100%" priority />
      {isHover && (
        <div className="absolute left-0 top-0 z-[1] flex size-full items-end bg-[rgba(0,0,0,0.3)] p-5 tablet:p-7">
          <span className="z-[2] text-lg font-bold text-white tablet:text-2xl">{title}</span>
        </div>
      )}
    </div>
  );
}

export default PhotoCard;
