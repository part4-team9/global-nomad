'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import useSearchStore from '@/_stores/useSearchStore';

import Button from '@/_components/Button';

import Bed from 'public/assets/icons/bed.svg';

/**
 * Search 컴포넌트 입니다.
 */

export default function SearchBox() {
  const [inputValue, setInputValue] = useState('');
  const setSearchValue = useSearchStore((state) => state.setSearchValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchValue(inputValue);
    setInputValue('');
  };

  return (
    <div className="relative bottom-[30px] z-10 w-full max-w-[1200px] mobile:bottom-[40px]">
      <div className="flex flex-col gap-[15px] rounded-[16px] bg-white px-[24px] py-[16px] text-lg font-bold drop-shadow-xl mobile:gap-[32px] mobile:py-[32px]">
        <span className="mobile:text-xl">무엇을 체험하고 싶으신가요?</span>
        <form className="flex h-[56px] items-center justify-between gap-[12px]" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="내가 원하는 체험은"
            value={inputValue}
            className="w-full rounded-[4px] border border-nomad-black py-[15px] pl-[40px] pr-[35px] text-md font-regular outline-none placeholder:text-gray-500 mobile:pl-[48px] mobile:text-lg"
            onChange={handleInputChange}
          />
          <Image src={Bed} alt="bed" width={48} height={48} className="absolute" />
          <Button type="submit" variant="black" className="h-[56px] min-w-24 mobile:h-[58px] mobile:min-w-[136px]">
            검색하기
          </Button>
        </form>
      </div>
    </div>
  );
}
