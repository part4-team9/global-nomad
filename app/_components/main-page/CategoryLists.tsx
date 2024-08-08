'use client';

import { useState } from 'react';

import { useScrollable } from '@/_hooks/activities/useScrollable';

import SortLists from './SortLists';

interface CategoryListsProps {
  onCategoryClick: (category: string) => void;
  onFilterSelect: (sort: 'latest' | 'most_reviewed' | 'price_asc' | 'price_desc') => void;
  selectedCategories: string;
}

const categories = ['전체', '문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

const emojis: { [key: string]: string } = {
  '전체': '🛼',
  '문화 · 예술': '🎨',
  '식음료': '🍽️',
  '스포츠': '🏅',
  '투어': '🗺️',
  '관광': '🏖️',
  '웰빙': '💆‍♂️',
};

/**
 * 체험 카테고리 리스트 컴포넌트 입니다.
 * @param {function} onCategoryClick - 카테고리가 클릭될 때 호출되는 함수입니다.
 * @param {(sort: 'latest' | 'most_reviewed' | 'price_asc' | 'price_desc') => void} onFilterSelect - 필터가 선택될 때 호출되는 함수입니다.
 * @param {function} selectedCategories - 현재 선택된 카테고리 상태 값 입니다.
 */

export default function CategoryLists({ onCategoryClick, onFilterSelect, selectedCategories }: CategoryListsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const { scrollRef, isEnd, isScrollable } = useScrollable();

  const onCategoryListClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryClick(category);
  };

  return (
    <div>
      <div className="relative top-[25px] flex h-[41px] justify-between mobile:top-[30px] mobile:h-[58px]">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-[8px] overflow-x-scroll text-base font-medium mobile:gap-[14px] mobile:text-ml tablet:gap-[24px]"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-button min-w-[80px] rounded-[15px] border border-nomad-black mobile:min-w-[120px] tablet:min-w-[127px] ${selectedCategories === category ? 'bg-nomad-black text-white' : 'text-green200 bg-white'}`}
              onClick={() => onCategoryListClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <SortLists onSelect={onFilterSelect} />
        {isScrollable && !isEnd && (
          <div className="pointer-events-none absolute h-[41px] w-full bg-btnGradientMobile mobile:h-[58px] mobile:bg-btnGradientTablet" />
        )}
      </div>
      <div className="mt-[40px] text-ml font-bold mobile:mt-[60px] mobile:text-4xl">
        {emojis[selectedCategory]} {selectedCategory}
      </div>
    </div>
  );
}
