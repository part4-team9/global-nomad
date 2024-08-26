'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

import CategoryCard from '../CategoryCard';

const CATEGORY_CARD = [
  {
    image: '/assets/icons/landing/art-icon.svg',
    title: '문화 · 예술',
    subText: '예술과 문화가 살아 숨 쉬는 현장에서 감성을 충전하고, 새로운 시각을 열어보세요.',
  },
  {
    image: '/assets/icons/landing/food-icon.svg',
    title: '식음료',
    subText: '여행 중 만나는 진정한 미식의 세계, 다양한 요리와 음료를 즐겨보세요.',
  },
  {
    image: '/assets/icons/landing/sports-icon.svg',
    title: '스포츠',
    subText: '끝없는 도전과 성취를 경험할 수 있는 액티비티, 활동적인 하루를 보낼 준비가 되셨나요?',
  },
  {
    image: '/assets/icons/landing/tour-icon.svg',
    title: '투어',
    subText: '숨은 이야기와 명소를 따라가며, 그곳의 진정한 매력을 발견하는 투어를 경험하세요.',
  },
  {
    image: '/assets/icons/landing/sightseeing-icon.svg',
    title: '관광',
    subText: '자연의 아름다움을 느끼며 마음의 여유를 찾는 특별한 관광 체험을 즐겨보세요.',
  },
  {
    image: '/assets/icons/landing/wellness-icon.svg',
    title: '웰빙',
    subText: '스트레스를 날리고 몸과 마음을 재충전하는 웰빙 프로그램, 여행의 새로운 의미를 찾으세요.',
  },
];

function CategorySection() {
  const ref1 = useRef<HTMLDivElement>(null);
  const isInView1 = useInView(ref1, { once: true });

  const ref2 = useRef<HTMLUListElement>(null);
  const isInView2 = useInView(ref2, { once: true });

  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-[1248px] px-6">
        <div
          ref={ref1}
          className="grid gap-4 text-center"
          style={{
            transform: isInView1 ? 'none' : 'translateY(10px)',
            opacity: isInView1 ? 1 : 0,
            transition: 'all 0.6s ease-in-out',
          }}
        >
          <h2 className="break-keep text-3xl font-bold leading-[1.2] tablet:text-5xl">취향 따라 떠나는 여정</h2>
          <p className="grid text-gray-600">
            <span>당신의 취향에 맞는 특별한 경험을 선택해 보세요</span>
            <span>여행의 매 순간이 더욱 풍성해질 것입니다</span>
          </p>
        </div>
        <ul
          ref={ref2}
          className="mt-16 grid grid-cols-1 gap-6 mobile:grid-cols-2 tablet:grid-cols-3"
          style={{
            transform: isInView2 ? 'none' : 'translateY(15px)',
            opacity: isInView2 ? 1 : 0,
            transition: 'all 0.6s ease-in-out 0.3s',
          }}
        >
          {CATEGORY_CARD.map((card) => (
            <CategoryCard key={card.title} {...card} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CategorySection;
