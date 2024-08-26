'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';

interface CategoryCardProps {
  image: string;
  subText: string;
  title: string;
}

function CategoryCard({ image, title, subText }: CategoryCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <li
      ref={ref}
      className="rounded-3xl bg-white p-8 shadow-small"
      style={{
        transform: isInView ? 'none' : 'translateY(15px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Image src={image} alt={`${title} 아이콘`} width={32} height={32} />
      <h3 className="mt-6 text-[14px] font-semibold text-black">{title}</h3>
      <p className="mt-2 text-[14px] text-black">{subText}</p>
    </li>
  );
}

export default CategoryCard;
