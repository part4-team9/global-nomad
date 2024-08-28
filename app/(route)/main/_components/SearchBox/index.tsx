'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import Bed from 'public/assets/icons/bed.svg';

interface HotActivitySearchProps {
  onSearch: (searchValue: string) => void;
}

/**
 * Search 컴포넌트 입니다.
 * @param {function} onSearch - 검색어 상위 컴포넌트로 전달하는 함수
 */

export default function SearchBox({ onSearch }: HotActivitySearchProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="relative bottom-[50px] z-10 w-full max-w-[1200px] mobile:bottom-[60px]">
      <div className="mx-[24px] flex flex-col gap-[15px] rounded-[16px] bg-white px-[24px] py-[16px] text-lg font-bold drop-shadow-xl mobile:gap-[32px] mobile:py-[32px]">
        <span className="mobile:text-xl">무엇을 체험하고 싶으신가요?</span>
        <form className="flex h-[56px] items-center justify-between gap-[12px]" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="내가 원하는 체험은"
            className="w-full rounded-[4px] border border-nomad-black py-[15px] pl-[48px] pr-[35px] text-md font-regular outline-none placeholder:text-gray-500 mobile:text-lg"
            onChange={handleInputChange}
          />
          <Image src={Bed} alt="bed" width={48} height={48} className="absolute" />
          <button type="submit" className="h-full w-[96px] rounded-[4px] bg-nomad-black text-white mobile:min-w-[136px]">
            검색하기
          </button>
        </form>
      </div>
    </div>
  );
}
