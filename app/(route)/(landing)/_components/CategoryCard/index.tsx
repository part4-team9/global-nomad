'use client';

import Image from 'next/image';

interface CategoryCardProps {
  image: string;
  subText: string;
  title: string;
}

function CategoryCard({ image, title, subText }: CategoryCardProps) {
  return (
    <li className="rounded-3xl bg-white p-8 shadow-small">
      <Image src={image} alt={`${title} 아이콘`} width={32} height={32} />
      <h3 className="mt-6 text-[14px] font-semibold text-black">{title}</h3>
      <p className="mt-2 text-[14px] text-black">{subText}</p>
    </li>
  );
}

export default CategoryCard;
